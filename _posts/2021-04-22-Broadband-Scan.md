---
title: I scanned all my broadband peers
date: 2021-04-22
layout: post
medium: https://ritikk.medium.com/i-scanned-all-my-broadband-peers-17febead6797
time: 4
---
My internet broadband provider is one of the popular Internet service providers in this region. I have been their customer for quite some time now. Though comments and reviews may point otherwise, I am satisfied by their service in my region with close to promised speeds mostly.

They use NAT and provide static IPs under the `10.0.0.0/8` private block, and if I am not wrong, this same subdomain is used in West Bengal's operational area. As of this moment, they don’t block any cross-customer communication. This makes it possible to scan the entire network. And as I have mentioned later, this may be a security concern.

The [masscan](https://github.com/robertdavidgraham/masscan) configuration used for the scan was:
<!--break-->

> masscan 10.0.0.0/8 -p80,23,443,21,22,25,3389,110,445,139,143,53,135,3306,8080,1723,111,995,993,5900,1025,587,8888,199,1720,465,548,113,81,6001,10000,514 -Pn -n - rate=1000 -oL 10.masscan

This ensures the following:

- Masscan helps find open IP:Port pairs faster
- Scan the top few TCP ports (32 in this case)
- Keep the scan slow, so it doesn’t cause any network issues, and I don’t wake up anyone at the ISP.

Below, I have mentioned some interesting facts on this scan and related work.

- Out of the ports mentioned, the distribution of count vs port number was

```
Port count
80   194
443  138
22   75
23   59
8888 15
8080 10
135  9
81   3
5900 2
3389 1
```

(excluding port 25 & 53)

- A lot of routers

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*lKVNJkZxGziy0kPfhkMNng.png)

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*Ms1sFu-Cvq6tJlXWs6CyvQ.png)

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*LTUOPojn-0IroqReEznkvQ.png)

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*2oUvMp38wmzO175WujqEJQ.png)

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*bwoSMYwcE5bJOkrLAaJ4Ng.png)

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*b1mwuyprHkGgbbXQHSuONw.png)

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*8nngEOsTFppYSK-JGO2N8w.png)

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*KYOrNvFj7IPeFxi7tkvyCQ.png)

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*_dXFmJh3aPgSuBCBWP2PJA.png)

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*WRO1tMWPDn2S38j8WIQq4Q.png)

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*MW67GKdyGqVjqad2ZglpGg.png)

- Quite fewer Ip cameras
![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*00OA_Dfp9_kYxnHNXzePfA.png)

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*JtSha8HpXoWq5vl41thDew.png)

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*cBv18EJdKZG7fyhqOYX6aQ.png)

- And other login pages of things I don’t know about
![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*GOwkn579V57y9izL_kBpZg.png)

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*6LIcMNYknV_uL07ST94idA.png)

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*FION4T1p8quaaTO58qIRuA.png)

## Takeaways
Vendors providing these routers & IP cameras should prompt the users to change the default password upon 1st login. A good number of people never care to change the default passwords of these devices after working installation. At the same time, default settings for these devices should restrict access to a select few IPs to prevent unauthorized access over the WAN.

IP cameras should particularly actively provide patches to discovered vulnerabilities and prompt users to update their devices for the same. These vulnerabilities are regularly detected and patched, but it does take time for these consumer devices to get patched.

Network operators should actively block cross-customer communication because consumers usually don’t care or don’t have the knowledge to be safe against it. Therefore some responsibility should be borned by the ISPs.

## Actions
I have raised a service ticket and mailed them explaining the issue. The support representative has promised to forward this to the senior authority.

## Inspiration
The following blog by [captnemo](https://captnemo.in/) was the inspiration for this blog:

[I scanned all of ACT Bangalore customers, and the results aren’t surprising](https://medium.com/@captn3m0/i-scanned-all-of-act-bangalore-customers-and-the-results-arent-surprising-fecf9d7fe775?source=post_page-----17febead6797--------------------------------)
> I scanned all of ACT Bangalore customers, and the results aren’t surprising
