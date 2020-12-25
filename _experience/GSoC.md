---
layout: page
permalink: /experience/GSoC
title: Google Summer of Code - Named Data Network
github: https://github.com/named-data-mobile/ndn-photo-app
tech: Java, XML, C++
reading_order: 30
company_url: https://named-data.net/
---

`NpChat`(ndn-photo-app) is a photo and file-sharing application built on Android and is inspired by Snapchat. The
project's goals are to develop a completely decentralised application that runs over the `Named Data Network (NDN)`,
utilize a partial sync protocol, and use a `Web-Of-Trust` like model instead of the traditional NDN hierarchical model.

As a part of my `GSoC` project, some of the relevant things I worked on are:

- Added an `additive-increase/multiplicative-decrease` (AIMD) congestion control pipelined Segment-Fetcher for the Java client library and came up with appropriate profiling.
- Updated the user identity management application for NpChat to support NpChat.
- Refactor the code with latest `MVVM` guidelines.

A detailed report can be found [here](https://gist.github.com/dev-ritik/ca88748b1e0868773288bdf0e531a327).
