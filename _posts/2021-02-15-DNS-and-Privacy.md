---
title: DNS and Privacy
date: 2021-02-15
layout: post
medium: https://ritikk.medium.com/dns-and-privacy-d50c59428cb2
time: 11
---
As you surf the internet, you visit a lot of websites. When you visit a particular website anonymously (without logging in), that website will know your public IP address. At the same time, your ISP (and other devices on-path) will easily be able to know what websites your visit and when you do so. As such, this provides a great place for spying on a user and change the routing behaviour to prevent access to certain networks or websites. DNS is the simplest service to do so. In this blog, I will try to explain how you can use the latest developments in technologies to hide your browsing habits from the ISPs, focusing on DNS.

### Domain Name System
DNS is the phonebook of the Internet. It’s a global database of information about domain names. In simple terms, it helps convert <code class="markup--code markup--p-code">medium.com</code> into <code class="markup--code markup--p-code">104.17.31.52</code> which computer networks actually understands and can route your request to.
