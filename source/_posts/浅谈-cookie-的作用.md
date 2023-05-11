---
title: 浅谈 cookie 的作用
date: 2020-05-05 15:39:05
updated:
tags:
categories:
hide:
comment:
---

# cookie 是什么？

# cookie 怎么用？

# cookie 和 网站登录状态的关系？

## 先记录一次探索经历

先从**浏览器这个角度**看 cookie 值变化 当第一次进入网站页面时，会获取一次 cookie ，并记录在开发者工具中，注意此时是未登录状态：

![8VXHUE](https://cdn.jsdelivr.net/gh/dolphinchng/MyPic@master/uPic/8VXHUE.png)

当登录成功时，登录状态为真时，此时发现 cookie 没有变化，即使退出登录状态并且关掉当前窗口（浏览器并没有关闭）重新打开页面 cookie 值也没有变化。

![Lztxqp](https://cdn.jsdelivr.net/gh/dolphinchng/MyPic@master/uPic/Lztxqp.png)

当把浏览器关闭掉，重新打开网站时，可以发现此时 cookie 值已经变了！

![ooNEx0](https://cdn.jsdelivr.net/gh/dolphinchng/MyPic@master/uPic/ooNEx0.png)

从网站服务器的角度出发：//TODO

## 总结

从上面的步骤发现，从浏览器角度出发时，**当第一次访问网站到完全退出前 cookie 值 和 登录状态没有关系，并且 cookie 值一直保持不变**。**当浏览器完全退出，重新访问网站时，cookie 值才会发生变化**。这个现象刚好印证 **cookies 的属性 session 的特点**。

从网站服务器的角度出发总结：//TODO
