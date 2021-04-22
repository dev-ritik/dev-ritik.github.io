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
