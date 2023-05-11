---
title: WinToGo - 可以随身携带的系统U盘
date: 2020-02-28 14:32:49
tags: [mac, windows]
categories: 操作系统
comments: false
sticky: 35
---
## 折腾原因

最近几年一直使用 macOS，调试一些页面需要在 Windows 系统上操作（实际上是为了在 Win 打游戏：：））对了，就是 Java 期末考试需要用的软件只在 win 平台。。。

## 兼容性

我的mbp已经算是比较老的14年中装载4代i5的设备，对照以下这个图是支持制作USB系统盘启动Windows的。
![1649086686847](https://cdn.jsdelivr.net/gh/dolphinchng/MyPic@master/uPic/1649086686847.jpg)

## 挑选适合做系统的U盘
从[萝卜头网](https://bbs.luobotou.org/)上了解到WTG对U盘性能有着一定的要求，这个网站有推荐购买的U盘（对于我来说太贵），这里特别得亏有大佬在上面分享了一些可供选择的比较特殊的U盘。这里对比一下我现有的普通闪迪U盘和以手机硬盘为颗粒的UFS盘之间的4k读写速度，特别是4k写入小文件的速度，可以明显的看到差距。
普通U盘：

![闪迪普通U'盘](https://cdn.jsdelivr.net/gh/dolphinchng/MyPic@master/uPic/闪迪普通U'盘.png)

适合做WTG的U盘：

![sm3833_ufs_U盘_4k写入测试](https://cdn.jsdelivr.net/gh/dolphinchng/MyPic@master/uPic/sm3833_ufs_U盘_4k写入测试.png)

## 使用工具制作启动U盘

### mac（inter芯片）启动方式

开机长按`option`键，然后选中**EFI Boot**这个磁盘，直接按`Enter`键

![ogTdkD](https://cdn.jsdelivr.net/gh/dolphinchng/MyPic@master/uPic/ogTdkD.png)

### Windows 启动方式

开机按画面提示按`U盘启动选择快捷键`选择**EFI Boot**这个磁盘，然后按`Enter`



