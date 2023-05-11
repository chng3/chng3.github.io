---
title: JS 之区分相似的数组方法
date: 2020-04-02 15:58:45
updated:
tags:
categories:
hide:
comment:
---

> 摘自V2EX某篇帖子中的回复

```js
// 单纯地遍历
Array.prototype.forEach

// 检测数组中是否有元素符合条件
Array.prototype.some

// 检测数组中是否所有元素符合条件
Array.prototype.every

// 用来将一个列表转换成另一个等长的列表
Array.prototype.map

// 用来将一个列表转换成一个值
Array.prototype.reduce

// 从列表中找出符合条件的一个元素
Array.prototype.find

// 从列表中找出符合条件的若干元素
Array.prototype.filter

// 拍平列表
Array.prototype.flat

// map 和 flat 的结合，适合用来将一个列表转换成另一个不等长的列表
Array.prototype.flatMap
```
