---
title: HTTP & WebSockets
date: 2020-05-17
layout: post
medium: https://medium.com/mobile-development-group/http-websockets-9c6704e44a2a
time: 11
---

In the last blog, [Simple Servers](https://medium.com/mobile-development-group/simple-servers-cc465f340658), I covered `sockets based communication`, which is very low implementation. Thus these are not the things you would be interacting with directly while writing servers today. _They probably would be `HTTP & HTTPS`!_.

Today, the world works on HTTP. The entire consumer internet infrastructure, with terabytes of data, moved across networks every second to these devices in our hands, is constituted mostly by HTTP & WebSocket.

> OK! so how are they related to sockets? How is HTTP evolving? Is `WebSockets` the same as `Sockets`?

> I will explain the key concepts with examples related to them, while avoiding as much technical jargon as possible.
