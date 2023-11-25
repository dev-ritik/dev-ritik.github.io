---
title: Network Access Control
date: 2020-12-13
layout: post
medium: https://ritikk.medium.com/network-access-control-6e3b27b00830
time: 12
---

_This work is a part of my presentation for the course `CSN-502 Advanced Operating System`. The presentation was delivered on 31.10.2020, and the topic for the same was `Network Access Control — EAP framework`. To my interest, I added focus to Wireless protocols as well. Most of the content can be found easily by Google search; hence if interested, I would recommend following the sources added in the references section. Take this one only as an introduction to the topic. The ppt is attached below._

## Network Access Control
You must have heard that open and coffee shop wifis are insecure, and one must proceed with cautions. Now think about large corporates or campus networks. There’s a ton of stuff involved here which are private within the network and must be protected via access control and prevented from eavesdropping. Remember, a network is not just used for connecting to the internet. A single malicious device or some malicious programs in some innocent device can bring massive troubles to the network providers. All other stuff related to secure access management applies here as well.

So broadly, it is the job of the Network Access Control System to proactively detect and authorize the devices and put certain access control in place. It should also provide a mechanism to deal with malicious programs and actors acting with bad faith from within or outside the network.
<!--break-->

[Network Access Control ppt](https://1drv.ms/p/s!AnYk3B0CuVyGlg23VpXu-qX6eWtG?e=BtjrAL&source=post_page-----6e3b27b00830--------------------------------)

Broadly any general NAC system should have at least these **functionalities**:
![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*pzUn_9OvCGXoyjvgrR4pmg.png)

- **Node Detection**: This indeed is the first step to find out if there’s a new device connected to the network. The system can detect the traffic from protocols like ARP, which are essential when registering in a network or from explicit NAC register messages.
- **Authentication**: Authenticating the device or the user trying to access the network.
- **Assessment**: A secure network must assess a device before giving it access to the system’s resources for potential threats.
- **Authorization**: NAC must use some policy to provide the user with access to the network’s resources based on the user’s/device’s identification and assessment.
- **Quarantine**: NAC can isolate non-compliant devices into a separate network where it doesn’t possess a threat to the network and can still access specific safe resources.
- **Remediation**: Quarantined devices should be allowed to join or get access to system resources upon undergoing remedies like downloading security patches or firewall setup.
- **Monitor**: The devices admitted to the network should be continuously monitored for some policy violation upon which it can be Quarantined, or the access can be dropped and actions can be taken.

An NAC sysem generally has these components:

- **Client**: These are the devices trying to access the network. These are of 2 types: **Agent-based Client**, where an agent (a software) is already installed on the client. This client then communicates with the policy servers to make the client compliant with network security parameters like installing anti-virus software. **Agent-less Clients** are made to install an agent for joining the network. If it cannot, its traffic is monitored for threat management.
- **Enforcement Points**: These are points in the network where action can be taken for a device. These are generally the points with which the client communicates to access the network. Example: Switches, Routers, VPN.
- **Policy Servers**: As the name suggests, these servers are responsible for policy enforcements like Access, Authorization, and Accounting. These servers are responsible for collecting assessment data and ensuring compliance.
- **Quarantine Network**: This is a network (as defined earlier) for the non-compliant devices. They are allowed limited or no access to network resources and remediation servers.
- **Remediation Servers**: These servers are responsible for checking Quarantined devices for their compliances with network standards. These can provide with required security software to those devices for the purpose.

## Extensible Authentication Protocol
EAP (RFC [3748](https://tools.ietf.org/html/rfc3748), [5247](https://tools.ietf.org/html/rfc5247)) is an authentication framework, not a specific authentication mechanism, used in network and internet connection for providing the transport and negotiation of authentication methods via **EAP methods**. EAP typically runs directly over data link layers without requiring IP. EAP is not a wire protocol; instead, it only defines the information from the interface and the formats. Each protocol that uses EAP defines a way to encapsulate by the user EAP messages within that protocol’s messages. It has been applied to a wide variety of networks and protocols like wired networks [IEEE-802.1X](https://tools.ietf.org/html/rfc5247#ref-IEEE-802.1X), Internet Key Exchange Protocol version 2 (IKEv2) [RFC4306](https://tools.ietf.org/html/rfc4306), and wireless networks such as [IEEE-802.11] and [IEEE-802.16e](https://tools.ietf.org/html/rfc5247#ref-IEEE-802.16e).

EAP defines 4 (generally 3) entities for authenticating a device. Some of these entities can be and are usually handled by the same device in a setup. These are:

- **Supplicant**: This refers to the device seeking admission into the network.
- **Authenticator**: The entity which relays and initiates EAP authentication. It may not know specifics of the actual wire protocol used.
- **Authentication Server**: This is the place where the actual authentication takes place.
- **EAP server**: Its job is to exchange EAP messages with the supplicant via authenticator. The authentication server then uses these messages. It is often handled by other entities.

## EAP Authentication Process
![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*743swMTQM7eY9fQIR8qAPA.png)
> This image describes EAP over LAN (802.1X)

1. The **authenticator** sends a Request to authenticate the peer (code 1). The Request has a **Type field** to indicate what is being requested.
2. The peer sends a Response packet (code 2) in reply to a valid Request. As with the Request packet, the Response packet contains a Type field, which corresponds to the Type field of the Request.
3. The authenticator sends an additional Request packet, and the peer replies with a Response. The sequence of Requests and Responses continues as long as needed.
4. The conversation continues until the authenticator cannot authenticate the peer in which case the authenticator implementation MUST transmit an **EAP Failure** (Code 4). Alternatively, the authentication conversation can continue until the authenticator determines that successful authentication has occurred, in which case the authenticator MUST transmit an **EAP Success** (Code 3).

## Security Claims
EAP is used in wireless and wired LANs. In these situations, an attacker can gain access to links over which EAP packets are transmitted. As an example, one can easily detect all the traffic going in a wireless network without even authenticating into the network. As such, there are several security concerns which EAP defines and the EAP methods should take care of. These can be found [here](https://tools.ietf.org/html/rfc3748#section-7.2.1).

## EAP Methods Example
- **EAP-MD5**: Here, the server sends a random challenge to the client. The client forms an MD5 hash of the user’s password and the challenge and sends the result back to the server. The server then validates the MD5 hash using the known correct plaintext password from the user database. Hence, It offers minimal security, is vulnerable to dictionary attacks, it only provides authentication of the EAP peer to the EAP server but not mutual authentication, hence is vulnerable to MITM.
- **EAP-TLS**: Transport Layer Security (TLS) provides for mutual authentication, integrity-protected cipher suite negotiation, and key exchange between two endpoints. EAP-TLS is still considered one of the most secure EAP standards available. This has also been used in NoAuth cases where only server authentication is done. This would allow for situations, much like HTTPS, where a wireless hotspot allows free access and does not authenticate clients. Still, clients wish to use encryption and potentially authenticate the wireless hotspot. With a client-side certificate, however, a compromised password is not enough to break into EAP-TLS enabled systems because the intruder still needs to have the client-side certificate.
- **EAP-PSK**: EAP method for mutual authentication and session key derivation using a **Pre-Shared Key** (PSK). The Pre-Shared Key refers to a key or secret that needs to be derived and shared by the parties by some mechanism before the EAP-PSK conversation takes place (Take this as a simple passphrase). EAP-PSK is designed for authentication over insecure networks such as **IEEE 802.11**(standards for Wireless LAN (WLAN) & Mesh (Wi-Fi certification)). EAP-PSK is distinct from the Pre-shared Key authentication mode used in **Wi-Fi Protected Access**(WPA) and should not be confused with it.

# Implementations
## Wi-Fi (Wireless Fidelity) History
**Wired Equivalent Privacy** (WEP) is a security algorithm for IEEE 802.11 wireless networks. Introduced as part of the original 802.11 standard ratified in 1997, its intention was to provide data **confidentiality comparable** to that of a traditional **wired** network.

Later, to address WEP security issues, the **802.11 working group** adopted the **802.1X** standard for **authentication, authorization and key management. IEEE 802.1X** is an IEEE Standard for port-based Network Access Control (PNAC). It provides an authentication mechanism to devices wishing to attach to a LAN or WLAN. At the same time, IEEE formed a Task Group “I” to develop **802.11i** standard, with a purpose to produce a detailed specification to enhance the security features for wireless LANs dramatically.

In 2003 the **Wi-Fi Alliance** announced that WEP had been superseded by **Wi-Fi Protected Access** (WPA). They extracted the key features from 802.11i to establish WPA to satisfy the immediate needs of the wireless industry. WPA became available in 2003 based on a subset of a **draft** of **802.11i**. IEEE 802.11i describes EAP for wireless LANs.

However, WPA has shown significant vulnerabilities and was later superseded by **WPA2**, which is based on IEEE 802.11i standard ratified in June 2004.

In January 2018, Wi-Fi Alliance announced the release of **WPA3** with several security improvements over WPA2.

## WEP
WEP was ratified as a Wi-Fi security standard in September of 1999. WEP uses the [stream cipher](https://en.wikipedia.org/wiki/Stream_cipher) [RC4](https://en.wikipedia.org/wiki/RC4) for **confidentiality** and the [CRC-32](https://en.wikipedia.org/wiki/CRC-32) checksum for **integrity**. WEP generally uses Pre-Shared Key (PSK); however, it uses rudimentary variations of the same key to encrypt all packets . These weak encryption keys are based on the underlying RC4 crypto algorithm. This is not very safe, a large sample of encrypted packets using the same key tends to create an easy key recovery target for hackers. Furthermore, to change a WEP key requires an IT administrator to update each client machine manually. As a result, changing pre-shared keys regularly to safeguard against key recovery is a highly unfeasible task to scale for large deployments.

Systems that rely on WEP should be upgraded or, if security upgrades are not an option, replaced.

## WPA
As discussed above, WiFi Protected Access was formally adopted in 2003, a year before WEP was officially retired.

WPA keys use 256-bit keys. Its most common configuration is called the **WPA-PSK** or **WiFi Protected Access Pre-Shared Key**. WPA included **message integrity checks** (to determine if an attacker had captured or altered packets passed between the access point and client) and the **Temporal Key Integrity Protocol** (TKIP). TKIP employs a per-packet key system that was radically more secure than the fixed key system used by WEP. Although TKIP uses the same base encryption algorithm, RC4 as WEP, the way it selects and changes keys resolves many of the issues surrounding WEP.

The primary improvement in WPA is the per-session encryption key. Every time a station associates, a new encryption key is generated based on some per-session random numbers and the media access control (MAC) addresses of the station and the access point. WPA sounds like a major improvement, and it is — if it’s used correctly.

WPA with pre-shared keys can be cracked if IT management unwisely uses straightforward passwords. However, this is not a weakness in WPA security, but rather a potential result of poor password management. An attacker grabs a few packets at the time a legitimate station joins the wireless network and then can take those packets and recover the PSK used.

WPA used with 802.1X authentication (**WPA-Enterprise**) offers a secure, per-session encryption key that is not vulnerable to any casual attack. This security comes with a cost because 802.1X authentication requires a significant infrastructure including 802.1X-compliant **RADIUS** server with a digital certificate, and client software for every user that supports 802.1X and whichever authentication mode they use.

## WPA2
WiFi Protected Access II, as discussed above, was ratified in 2004, and replaced WPA. WPA2 implements the mandatory elements of IEEE 802.11i. In particular, it includes mandatory support for [CCMP](https://en.wikipedia.org/wiki/CCMP_(cryptography))(**Counter Cipher Mode with Block Chaining Message Authentication Code Protocol**), an [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) based encryption mode as a replacement for TKIP.

### Working
![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*C1hd3PqmkFO-YdgoJGdrnw.png)
> four-way handshake

The **four-way handshake** is the process of exchanging 4 messages between an Access Point (AP) (**authenticator**) and the client device (**supplicant**) to generate some encryption keys which can be used to encrypt actual data sent over Wireless medium.

While Enterprise version use 802.1x exchanges (as discussed above) before handshake, personal directly begins handshake using **Pairwise Master key** (PMK) (generated from PSK).

The **Master Session Key** (MSK) is the first key which is generated either from 802.1X/EAP (Enterprise) or derived from PSK authentication (Personal). Pairwise master is key generated from this master session key. In case of WPA2/PSK when device authenticates with access point the PMK is simply derived from PSK.

Here, with the four way handshake, the client is able to generate a **Pairwise Transit Key** (PTK) and **Group Temporal Key** (GTK). All unicast traffic will be encrypted with PTK and all multicast and broadcast traffic will be encrypted via GTK.

`PTK = PRF (PMK + Anonce + SNonce + Mac (AA)+ Mac (SA))`

For PTK, **PRF** is a pseudo-random function, **Anonce** is supplied by the AP in the 1st message. **SNonce** is generated by the client. Mac address of the AP and supplicant is known already. Hence PTK can be generated. GTK is generated by the AP and shared with the client in the 3rd message of the handshake.

For detailed explaination, follow this [post](https://www.wifi-professionals.com/2019/01/4-way-handshake).

### Issues

The ability to crack the WPA2-Personal passphrase with brute-force attacks: basically guessing the password over and over until a match is found, is a critical vulnerability of WPA2. Making the problem worse, once hackers captured the right data from the airwaves, they could perform these password-guessing attempts off-site, making it more practical for them. Four-way handshake is susceptible to **offline** dictionary-based attacks, especially when short passwords under 16 characters are employed. Once cracked, they could then decrypt any data they captured before or after the cracking.

Another major vulnerability of WPA2-Personal, particularly on business networks, is that a user with the passphrase could snoop on another user’s network traffic and perform attacks. This is more evident in open networks. Although the enterprise mode of WPA/WPA2 protects against user-to-user snooping, it requires a RADIUS server or cloud service to deploy the enterprise mode.

### KRACK attack

The **[Key Reinstallation Attack](https://www.krackattacks.com/?_ga=2.182670950.1957743772.1508163997-2044333671.1507156536)** (KRACK) is a direct attack on the WPA2 protocol and not in individual products or implementations.

Essentially, KRACK undermines the four-way handshake, allowing a hacker to intercept and manipulate the creation of new encryption keys within the secure connection process. The adversary tricks a victim into reinstalling an already-in-use key. When the victim reinstalls the key, associated parameters such as nonce and receive packet number (i.e. replay counter) are reset to their initial value.

During the four way handshake, if the 3rd message is received again, the client will reinstall the same encryption key, and thereby reset the incremental transmit packet number (nonce) and receive replay counter used by the encryption protocol. By forcing nonce reuse in this manner, the encryption protocol can be attacked, e.g., packets can be replayed, decrypted, and/or forged. Adversaries can use this attack to decrypt packets sent by clients. As a result, **the same encryption key is used with nonce values that have already been used in the past**. In turn, this causes all encryption protocols of WPA2 to reuse [keystream](https://en.wikipedia.org/wiki/Keystream) when encrypting packets. In case a message that reuses keystream has known content, it becomes trivial to derive the used keystream. This keystream can then be used to decrypt messages with the same nonce. When there is no known content, it is harder to decrypt packets, although still possible in several cases. In practice, finding packets with known content is not a problem, so it should be assumed that any packet can be decrypted.

## WPA 3
In 2018, the Wi-Fi Alliance announced the next iteration called WPA3 to replace the WPA2, adding several security enhancements and features while overcoming the security vulnerabilities of the WPA2. It takes security to the next level by making wireless networks future ready. It uses the more powerful and robust encryption by AES with the GCMP (**Galois/Counter Mode Protocol**) and replaces the PSK with the more reliable and secure handshake mechanism called **Simultaneous Authentication of Equals** (SAE). SAE, also known as the **Dragonfly Key Exchange Protocol**, is a more secure method of key exchange that addresses the KRACK vulnerability. Specifically, it is resistant to offline decryption attacks through the provision of “**forward secrecy.**” Forward secrecy stops an attacker decrypting a previously recorded internet connection, even if they know the WPA3 password.

Have a look at this [post](https://medium.com/asecuritysite-when-bob-met-alice/hello-to-wpa-3-ae8b9c365b95) for details.

# References
- [https://www.diva-portal.org/smash/get/diva2:23688/FULLTEXT01.pdf](https://www.diva-portal.org/smash/get/diva2:23688/FULLTEXT01.pdf)
- [https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.615.3578&rep=rep1&type=pdf](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.615.3578&rep=rep1&type=pdf)
- [https://www.computerworld.com/article/2544215/don-t-use-wep-for-wi-fi-security--researchers-say.html](https://www.computerworld.com/article/2544215/don-t-use-wep-for-wi-fi-security--researchers-say.html)
- [https://www.networkworld.com/article/2329740/how-can-wpa-be-more-secure-than-wep-.html](https://www.networkworld.com/article/2329740/how-can-wpa-be-more-secure-than-wep-.html)
- [https://www.networkworld.com/article/2325729/wpa---an-accident-waiting-to-happen.html](https://www.networkworld.com/article/2325729/wpa---an-accident-waiting-to-happen.html)
- [https://www.howtogeek.com/167783/htg-explains-the-difference-between-wep-wpa-and-wpa2-wireless-encryption-and-why-it-matters/](https://www.howtogeek.com/167783/htg-explains-the-difference-between-wep-wpa-and-wpa2-wireless-encryption-and-why-it-matters/)
- [https://www.krackattacks.com/?_ga=2.182670950.1957743772.1508163997-2044333671.1507156536](https://www.krackattacks.com/?_ga=2.182670950.1957743772.1508163997-2044333671.1507156536)
- [http://www.differencebetween.net/technology/difference-between-wpa2-and-wpa3/](http://www.differencebetween.net/technology/difference-between-wpa2-and-wpa3/)
- [https://www.makeuseof.com/tag/wep-wpa-wpa2-wpa3-explained/](https://www.makeuseof.com/tag/wep-wpa-wpa2-wpa3-explained/)
- [https://www.networkworld.com/article/3316567/what-is-wpa3-wi-fi-security-protocol-strengthens-connections.html](https://www.networkworld.com/article/3316567/what-is-wpa3-wi-fi-security-protocol-strengthens-connections.html)
