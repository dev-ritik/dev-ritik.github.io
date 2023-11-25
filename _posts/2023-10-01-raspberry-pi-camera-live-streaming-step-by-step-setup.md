---
title: "Raspberry Pi Camera Live Streaming: Step-by-Step Setup"
date: 2023-10-01
layout: post
medium: https://ritikk.medium.com/raspberry-pi-camera-live-streaming-step-by-step-setup-4476f5185847
time: 5
---
> Are you ready for some weekend tech fun? Buckle up because we're about to embark on an exciting journey! Our mission? To create a cutting-edge Raspberry Pi-based image streaming service that brings real-time images right to your phone, no matter where you are. And the best part? It's all about keeping things locked down tight — your feed, your privacy, and your excitement!

🔧 What You'll Need for this Awesome Project 🔧

Gather up your tools because we're about to embark on a tech adventure that's as exciting as it is educational! Here's your checklist:

- 🍇[Raspberry Pi](https://amzn.to/3RGIlPn): The tiny computer with mighty capabilities, perfect for running small computing tasks right from the comfort of your home or lab.
- 📷[Raspberry Pi Camera](https://amzn.to/3tcUAsX): A budget-friendly 5MP camera that captures surprisingly sharp and clear images.
- ☁️AWS EC2, Azure VM, or a Cloud VM Hosting Service of Your Choice: We'll harness the power of the cloud to set up our very own Nginx server with mutual certificate authentication.

---

# Setting up Raspberry Pi
Having any OS on Pi should be fine. We shall be using Python in this project. However, I recommend popular Linux distros like Debian or any OS based on Debian.

You can skip this step if you already have a working Pi. Or follow resources like [this](https://raspberrytips.com/install-debian-on-raspberry-pi/) to flash your SD card and boot and set up Debian on the PI.

# Connecting the Pi Camera
With the Pi setup complete and the Pi up and running, let's get the PI camera on the Pi. Many resources are available on the internet to help us with this. You may follow this [one](https://raspberrytips.com/install-camera-raspberry-pi/).

# Pipeline
In this project, we shall be creating this pipeline. A brief overview of the steps:
- Python program uses the `picamera2` module to periodically capture images
- Encode and send the picture as an HTML file using SCP
- Create an Nginx config file to serve the file
- Create and install a key certificate to authenticate the client

![](https://miro.medium.com/v2/resize:fit:1100/format:webp/1*mhHbZVLoaL4oJraUVR1sbg.jpeg)
> Pipeline image
<!--break-->

# The Code
We are using Python 3 here, and `picamera` Module. However, picamera doesn't work with python3. To fix that, there is this _Picamera2_ replacement (still in beta); we shall use that instead.

```python
try:
    from picamera2 import Picamera2, Preview

    picam2 = Picamera2()
    preview_config = picam2.create_preview_configuration()

    picam2.configure(preview_config)

    picam2.start()
    while True:
          print("Clicking picture")
          metadata = picam2.capture_file(IMAGE_PATH)
          # Image to Base 64 string
          image_b64 = get_b64_string(IMAGE_PATH)
          # Format a boiler html with this string
          html = get_html(image_b64, datetime.now())
          # scp the file to the server
          export_html_file(html)
          sleep(SLEEP_DURATION)

except Exception as e:
    logger.exception('Failed: ' + str(e))
else:
    if picam2:
        picam2.close()
```
When Creating a valid HTML string from the base 64 encoded image, add `<meta http-equiv=”refresh” content=”{refresh}”>` to the `head` tag to auto-refresh the image in the browser.

## Running the script in daemon mode
Once the code is up and running and sending images to the remote server, we need to ensure that it gets up and running automatically when the PI restarts.

To achieve this, let's use `systemctl`. Create and paste the following code into `/etc/systemd/system/picam.service` file:

```toml
[Unit]
Description=PiCam process.

[Service]
Type=simple
User=<user>
Group=<user>
ExecStart=/bin/bash -c '/usr/bin/python /<project main file path>'

[Install]
WantedBy=multi-user.target
```

This will create a basic systemd service to run the program. To set it to auto-start on reboot, run `sudo systemctl enable picam` to enable it. Check `sudo systemctl status picam` to see if there were any errors.

# On the Server
We all want our private feeds to be secure, but who wants the hassle of entering IDs and passwords every time? Not us! That's why we've got a game-changer in store: SSL Mutual Authentication.

## Authenticating via certificates: SSL mutual authentication setup
By default, HTTPS is a one-way authorization where the client checks if the server is indeed who he claims to be. However, it also supports mutual authentication, where not only does the server verify the client's identity, but the client can also verify the server's identity.

To set it up, we need to generate some certificates and keys

```shell
# Generate an RSA private key
openssl genrsa -out client.key 4096
# Generate self-signed certificate
openssl req -new -x509 -days 365 -key client.key -out client.crt
```

## Nginx setup
Added this in the server block to enable client validation

```
location /<image_feed_url_slug>.html {
if ($ssl_client_verify != "SUCCESS") { return 403; }
alias /<image_path>.html;
}

# our self signed certificate
ssl_client_certificate /<path>/client.crt;
```

## On the client machine (browsers)
Run the following to get a PKCS12 file

```shell
# Export the private key and certificate to PKCS12 file. Remember the password
openssl pkcs12 -export -inkey ./client.key -in ./client.crt -out ./client.p12
```

You can install this PKCS12 file in the browser's user cert section of the certificate settings page. (Use the password when prompted)

For Android devices, if the above doesn't work, you need to do the following additional steps (based on the answers [here](https://stackoverflow.com/questions/71872900/installing-pcks12-certificate-in-android-wrong-password-bug)) to get a legacy PKCS12 file:
```shell
# Converts the PKCS12 file to a PEM file without password
openssl pkcs12 -noenc -in client.p12 -out temp_client.pem
# Converts the PEM file to legacy PKCS12 file. The -legacy option tells OpenSSL to use the legacy PKCS12 format, which is compatible with older devices.
# Add a password
openssl pkcs12 -export -legacy -in temp_client.pem > client_legacy.p12 # Add new password for android
```

Install this legacy PKCS12 on the Android device with the new password. Set it in `VPN and app user certificate`

---

> If all went well, you must be able to see the live image feed from the camera on you browser

# What Lies Ahead
## Taking Your Project to the Next Level:
As you wrap up this fantastic journey of setting up your Raspberry Pi-based image streaming service, it's time to look to the future. Here are some exciting possibilities to explore:
- **Enhanced Performance**: Take your streaming to the next level by implementing optimizations like sending only the difference in images or transmitting images when motion is detected. These tweaks can make your service even more efficient and responsive.
- **Dynamic Live Feeds**: You can expand your project to support video-based live feeds. Imagine having real-time video streaming from your Raspberry Pi straight to your phone. The possibilities are endless!

> _By delving into these further steps, you can continue to elevate your project, making it even more powerful and versatile. The world of DIY tech is yours to explore, so keep innovating, experimenting, and enjoying every moment of your tech journey. 🚀🔍📹_
