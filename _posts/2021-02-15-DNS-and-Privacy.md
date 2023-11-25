---
title: DNS and Privacy
date: 2021-02-15
layout: post
medium: https://ritikk.medium.com/dns-and-privacy-d50c59428cb2
time: 11
---
> Ever felt like your internet journey is a little too exposed? As you surf anonymously, websites slyly snatch your public IP address, and your ISP lurks, peering into your every click. It’s the perfect stage for unwanted surveillance, with the potential to tweak your routing behaviour and block access to your favourite sites. Enter the unsung hero: DNS.

In this blog, we’re delving into the world of online invisibility. I’ll spill the beans on the latest tech tricks that can cloak your browsing habits from the prying eyes of ISPs, with a special focus on the wizardry of DNS. Ready to discover the secrets to a more private online experience? Let’s dive in!🚀🔍

## Domain Name System
DNS is the phonebook of the Internet. It’s a global database of information about domain names. In simple terms, it helps convert <code class="markup--code markup--p-code">medium.com</code> into <code class="markup--code markup--p-code">104.17.31.52</code> which computer networks actually understands and can route your request to.
<!--break-->

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*9JgtMCfm7996JW0Plqo8kg.png)
> [Source](https://hacks.mozilla.org/2018/05/a-cartoon-intro-to-dns-over-https/)

A simple [fully qualified domain name](https://en.wikipedia.org/wiki/Fully_qualified_domain_name) looks like _`en.wikipedia.org.`_. DNS follows a hierarchical structure. A dot separates each level. At the top of this structure is the root servers which specifies details about these top-level domains (TLDs) for example, `org` or `com`. These also act as the trust anchors (as explained later) and the first level while querying DNS records. More on querying can be found [here](https://www.cloudflare.com/learning/dns/what-is-dns/).

![](https://miro.medium.com/v2/resize:fit:520/format:webp/1*xtH12w1ZbWTuwU9zmSbQrw.png)
> Dig: DNS lookup tool in Linux

`A` is the most basic type of DNS record which contains IP addresses to which this domain should point to. There are a few other records too for other purposes. These records have a Time to Live `TTL` field associated with them describing how long to cache them before requesting a new one. Caching would improve response time for the subsequent queries and reduce load over DNS servers.

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*1OP-hXfBbRXWTEjIVyKH8g.png)

For the uncached plain text query to `8.8.8.8` for `medium.com`, Wireshark recorded round trip time (RTT) of `62.43 ms` and chrome recorded `62.72 ms`. That's 4.8% of basic page load time. Subsequent queries were cached by chrome itself to reduce load time.

DNS generally works on UDP over port 53. TCP over the same port can also be used, but UDP is the prime choice. UDP, if you know, is unreliable but it is fast. For a simple query, where TCP establishes a connection using `3-way handshake` before the actual query, UDP could complete it in a single round trip. (DNS query is the first thing your browser does when visiting a website). Use of TCP also needs more resources on both sides and more header data compared to UDP.

DNS clients generally switch to TCP when the DNS payload is more than 512 bytes. It may continue on UDP if the devices and the network supports larger DNS packets over UDP. The 512-byte UDP payload size is a dependency on IPv4. From [RFC](https://tools.ietf.org/html/rfc791#section-3.1),

> _All hosts must be prepared to accept datagrams of up to 576 octets (whether they arrive whole or in fragments). It is recommended that hosts only send datagrams larger than 576 octets if they have assurance that the destination is prepared to accept the larger datagrams._
>
> _The number 576 is selected to allow a reasonable sized data block to be transmitted in addition to the required header information. For example, this size allows a data block of 512 octets plus 64 header octets to fit in a datagram. The maximal internet header is 60 octets, and a typical internet header is 20 octets, allowing a margin for headers of higher level protocols._

This is why there are precisely 13 DNS root servers originally: 13 domain names and 13 IPv4 addresses fit nicely into a single UDP packet.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*dij5N9aw_iEAo9Jd3SJgkA.png)
> A plaintext UDP DNS response for medium.com

The original DNS did not include any security details; instead, it was designed to be a scalable distributed key-value system. As you know, DNS query and response are transferred as plain text UDP packets and are susceptible to be forged and manipulated while on the wire. There were no checks on the authenticity of the data in the original implementation. Users could be easily redirected to a fake website using DNS spoofing.

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*Nnw-IBHEwSty7HWdaTnJLw.jpeg)
> DNS Spoofing [Source](https://www.imperva.com/learn/application-security/dnssec/)

Keeping in mind how easy it is to manipulate and spy on DNS data, certain extensions and improvements have been specified and used. Some of them are:

## DNS Security Extensions (DNSSEC)
The **DNS Security Extensions** (DNSSEC) is specifications for securing the DNS data. It provides data integrity and authentication to security-aware resolvers and applications through cryptographic digital signatures while ensuring backward compatibility with insecure DNS. These digital signatures are included in those resource records. DNSSEC _does not_ provide data confidentiality; in particular, all DNSSEC responses are authenticated but not encrypted.

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*6Rmb0oyGVV9YWH-hDRhC7w.jpeg)
> DNS Validation [Source](https://www.imperva.com/learn/application-security/dnssec/)

DNSSEC creates a parent-child train of trust that travels all the way up to the root server. The root keeps the hash of DNSKEY for the authoritative top-level domain (e.g., `.com`) nameservers (in the DS record). These (e.g., `.com`) TLDs keep hash for DNSKEY for their subdomains (e.g., example.com). All the record sets are signed by their own DNSKEY and stored as a new record at each level. This is a lot like the chain of trust used to validate TLS/SSL certificates, except that, rather than many trusted root certificates; there is one trusted root key managed by the DNS root maintainer IANA.

Formally published in 2005, it is still far from mainstream adoption - one of the reasons is network operators who prefer stability to complexity (for a good reason).

## DNS over TLS (DoT)
![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*KelkcD1CPEFp_6afwwaOWA.png)
> [Source](https://www.cloudflare.com/learning/dns/dns-over-tls/)

DNS over TLS, or DoT, is described in [RFC 7858](https://tools.ietf.org/html/rfc7858). The protocol uses port 853 (though port can depend on the implementation). It is based on TLS (also known as SSL). This is a standard to encrypt the communication between the user’s device and the DNS resolver. To an external device, only the targetted resolver will be known. This prevents spoofing and tracking of the DNS messages.

DNS over TLS incurs additional latency at session startup. It also requires an additional state (memory) and increased processing (CPU). Compared to UDP, it requires an extra RTT of latency to establish a TCP connection. The TLS handshake adds another two RTTs of latency. Clients and servers should support connection `keepalive` (reuse) and out-of-order processing to amortize connection setup costs.

## DNS over HTTPS (DoH)
DNS over HTTPS, or DoH, is described in [RFC 8484](https://tools.ietf.org/html/rfc8484). The protocol uses the standard HTTPS port 443, thus making DNS traffic have the same semantics with regular Web HTTPS traffic from web browsers, for the external world. It is also based on TLS (as it is based on HTTPS), thus making things similar to DoT.

Based on HTTP, the DNS request-response is replaced with HTTP request-response messages over `GET` or `POST` method. Templates can be defined for making these requests and responses, and the standard status codes can have similar meanings.

[HTTP/2](https://medium.com/mobile-development-group/http-websockets-9c6704e44a2a) is the minimum recommended version of HTTP for use with DoH. The messages in classic UDP-based DNS are inherently unordered and have low overhead. A competitive HTTP transport needs to support reordering, parallelism, priority, and header compression to achieve similar performance. Those features were introduced to HTTP in HTTP/2. Earlier versions of HTTP can convey the semantic requirements of DoH but may result in inferior performance. Even other HTTP/2 features like Server push is supported.

DoT and DoH are very similar. But there a debate on what is better.

From a network security standpoint, DoT is arguably better. It gives network administrators the ability to monitor and block DNS queries, based on port, which is important for identifying and stopping malicious traffic.

[DoH](https://www.dnsfilter.com/blog/dns-over-tls/) is applied at the application layer. In contrast, DoT is applied directly at the transport layer. As such, DoH wrt DoT has.

- More coding required
- More libraries required
- Packet sizes are more extensive than DoT.
- Ever-so-slightly higher latency

Neither DoT nor DoH is perfect DNS encryption solutions at this moment. More work still needs to be done, like enabling 0-RTT for all DNS-over-TLS and DNS-over-HTTPS implementations.

There have been more number of DoT deployments than DoH. Support for DoT has been added to Android since Android Pie. `systemd-resolved` in Linux already has an option to [turn this on](https://fedoramagazine.org/use-dns-over-tls/). Recently, Firefox has added an option to use DoH with its browser. Chrome has been catching up too. For browsers, it is easier to use DoH as they are already handling HTTPS traffic. Google and Cloudflare have provided their open DoH resolvers.

Below is a beautiful and detailed explanation of encrypted DNS:

> [A cartoon intro to DNS over HTTPS - Mozilla Hacks - the Web developer blog](hacks.mozilla.org)

## DNS sinkhole and Pi-hole
A sinkhole is a DNS provider that can provide a false result for particular DNS queries. This may be because of a compromised server or server being configured to block access to specific domains (for parental control, advertisement filtering, or preventing botnet attacks).

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*V4fPgKcewp6sOVCjLIe1AQ.png)
> Pi-hole logo

[Pi-Hole](https://pi-hole.net/) is an excellent, free, and open-sourced DNS-Sinkhole with support on major platforms (from Pi as in _raspberry pi_ and hole in _DNS-Sinkhole_). It comes with a standard list of websites (_including google analytics!_) to block, to prevent DNS queries to harmful and unwanted domains, and block 3rd party advertisements, all together saving bandwidth. It has a pretty web interface for configuration. Domains can easily be added or removed from the blocklist. It provided faster DNS queries by optimizing DNS caching with respect to native DNS implementations. It comes with a configurable DHCP server to automatically allocate DNS servers to the clients. It can easily be installed on a home or corporate network.

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*9rfjj7LDlseoQ7zbWWTMJQ.png)
> Pi-hole admin panel

As evident from this image, 21.5% of all my traffic was blocked (primarily advertisements).

Check out my image for a container for Pi-hole based DNS Sinkhole with `Cloudflared` DoH setup. It has a handy bash function too.

[dev-ritik/Pihole-Docker](https://github.com/dev-ritik/Pihole-Docker?source=post_page-----d50c59428cb2--------------------------------)
> This repo has the Docker environment for Pihole (DNS sinkhole and DHCP Server) + Cloudflared (DNS over HTTPS proxy). I…

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*J1FXVQX3c1seSLCdAk7OTQ.png)

For a locally uncached DNS request for `medium.com` in this setup, Wireshark recorded RTT of `91.47 ms` and Chrome recorded `91.85 ms`. That’s 9.1% of basic page load time and a 46.4% increase in DNS query time in DNS over HTTPS with Pi-hole (as expected).

At the same time, when the results were cached by Pi-hole locally (and not by Chrome),

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*pwfxRqjux2zXJmaZRCHIHw.png)

it had an RTT of `0.145 ms` in Wireshark and `0.39 ms` on Chrome. This makes sense for having a DNS resolver on the local network.

### Plain Text Server Name Indication
With the setup above, one can be sure that no on-path device can detect what website someone is visiting based on the DNS traffic. There are still few other exploitable methods to find that out. The easiest of them will be the **Server Name Indication (SNI)**.

A web server can host multiple ‘virtual’ servers on a single IP. These servers may belong to different DNS domains. Reverse proxy technologies like `Nginx` may be used to distribute incoming traffic to an appropriate server based on the domain it contains. This would be easy in the case of HTTP traffic (as it contains the requested domain in the URL), but for encrypted HTTPS traffic, things are quite different.

TLS Handshake is performed before the actual HTTP(S) communication. For this, the client needs to validate the server’s certificate to establish trust (explained [here](https://medium.com/mobile-development-group/trust-tls-ssl-and-https-b925ac9d59)). In a TLS handshake, the server can send a common certificate of all the virtual hosted domains to the client, generating the session key if the requested domain was within the certificate. But this is not a scalable approach. The more widely used technique is where the client will specify what virtual domain it wants to talk to, with the request.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*rVS5rU_zP20In8DrwyAxpQ.png)
> Client Hello (for example.com)

This is sent in the [Server Name Indication](https://tools.ietf.org/html/rfc3546#section-3.1) field in the `Client Hello`. As you can see, the server name is sent in plain text and can easily be used to spy on a device. Anyone between you and the server can see this field. This is the first message of the TLS Handshake; hence, no key has been agreed upon yet to encrypt this field.

One approach to encrypt this field is by encrypting Client Hello. **Encrypted Server Name Indication**(ESNI) works by adding a Public Key to the DNS records. A client can easily fetch this key (while querying for the IP address) and use this to encrypt the SNI field. Since only the server will have the corresponding private key, only it can get the original field and no one else.

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*Usrzr67aRRa3BNkQJik5dA.png)
> Certificate as plaintext in TLS v1.1 Server Hello

This is added as an extension to TLS v1.3. _Older versions of TLS even expose the server's certificates, so set the minimum acceptable version to v1.3_. Details of this can be found [here](https://datatracker.ietf.org/doc/draft-ietf-tls-esni/?include_text=1). As of now, there are very few deployments of ESNI. You can enable this feature in the configs (`about:config`) in Firefox. Check out this website and find out how secure are you against anyone spying on your online activity.

[Cloudflare ESNI Checker | Cloudflare](www.cloudflare.com)
> When you browse websites, there are several points where your privacy could be compromised, such as by your ISP or the…


Firefox v85 has recently stopped supporting ESNI towards an improved **Encrypted Client Hello** (ECH) TLS extension. The basic idea is to encrypt the entire client rather than just the SNI field (Client Hello does contain other sensitive information). This would still be supported using DNS by adding keys and other metadata to DNS records. The draft RFC explains its working as

> When a client wants to establish a TLS session with the backend server, it constructs its ClientHello as usual (we will refer to this as the ClientHelloInner message) and then encrypts this message using the public key of the ECH configuration.  It then constructs a new ClientHello (ClientHelloOuter) with innocuous values for sensitive extensions, e.g., SNI, ALPN, etc., and with an "encrypted_client_hello" extension, which this document defines. The extension's payload carries the encrypted ClientHelloInner and specifies the ECH configuration used for encryption. Finally, it sends ClientHelloOuter to the server.

The backend server (for example, Cloudflare) could be serving multiple domains. It acts as a relay decrypting the Client Hello and forwarding that to the original server. Cloudflare has put up a really nice [blog post](https://blog.cloudflare.com/encrypted-client-hello/) on this.

As Firefox explains [here](https://blog.mozilla.org/security/2021/01/07/encrypted-client-hello-the-future-of-esni-in-firefox/), they have dropped the support for ESNI, and the support for ECH is under active development. As such, for now, downgrading Firefox to [Extended Support Release](https://www.mozilla.org/en-US/firefox/enterprise/) v78.7.1esr seems to be a good option.

Even now, anyone can guess what website you are visiting based on the IP address of the server you are visiting. In most cases, results would be quite accurate as well. Fortunately, as more and more websites are hosted on services like Cloudflare, they share common IP addresses. This will then become more difficult to find out. For any other cases, it's best to route your traffic through some other servers by using a VPN or using a Tor browser.

