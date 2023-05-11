---
title: HTML5 之SVG
date: 2020-04-20 10:54:15
updated: 
tags:
categories:
hide:
comment:
---

# SVG是什么？

- SVG 指的是可伸缩矢量的图形（Scalable Vector Graphics）

# SVG可以用来做什么？

- 可以绘制多种路径、框、圆、文本、和图形图像（所有的用于网络的基于矢量的图形）

# SVG有多好？

与其他图像格式相比（比如 JPEG 和 GIF），使用 SVG 的优势在于：

- SVG 图像可通过文本编辑器来创建和修改
- SVG 图像可被搜索、索引、脚本化或压缩
- SVG 是可伸缩的
- SVG 图像在放大或改变尺寸的情况下其图形质量不会有损失
- SVG 图像可在任何的分辨率下被高质量地打印

# 如何使用SVG？

在 HTML5 中，HTML **<svg>** 元素是 SVG 图形的容器，能够将 SVG 元素直接嵌入 HTML 页面中（支持内联）

## 小例子

在坐标（100，50）处画一个半径为40，填充颜色为红色，描绘轮廓为黑色、宽度为2的一个圆

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
   <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
</svg>
```

![37VO2k](https://cdn.jsdelivr.net/gh/dolphinchng/MyPic@master/uPic/37VO2k.png)
