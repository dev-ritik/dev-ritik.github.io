---
title: Realtime Results Livestream
date: 2021-06-19
layout: post
medium: https://ritikk.medium.com/realtime-results-livestream-e6d29add5e3d
time: 5
---
![](https://miro.medium.com/max/800/1*zZ1YTl0oQSK5ZGgOIB51Mw.png)
_Last month, we did a small project aiming for the `West Bengal state election results`. This was to be a time-constrained hard deadline project. The data was to be fetched in real-time for a Livestream on YouTube while rendering the data in a visually appealing design. This blog is about the technical efforts that went behind the 5 hrs+ Livestream._

> Before we begin, we want to make it clear that we have no experience with a programmatically defined dynamic live stream. So this is the approach we came up with.

## The Stream Design
I already had the idea to add a dynamically generated state map based on the party's colour with a lead on the constituency. This is what we (I and [Karthik](https://github.com/KarthikRIyer)) envisioned our final design to be:
![](https://miro.medium.com/max/800/1*TaownoHSsOKDnYcU9JKxEQ.png)
