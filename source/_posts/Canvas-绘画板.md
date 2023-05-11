---
title: Canvas 绘画板
date: 2022-04-18 14:46:31
updated:
tags:
categories:
hide:
comment:
---

# 疑问

为什么在`add colors and sizes `这个提交之后，不用修改`onTouch`与`onMouse`的逻辑实现，画板颜色切换和画笔大小切换是直接就可以工作的？要想明白这个问题就得去第一次实现画笔移动工作的提交中也就是`init Canvas`，js 文件中找到判断移动设备语句 if(document.body.onTouch??)开始看。

# 答案

onTouch 和 onMouse 函数里面只是专门负责绘制线条和橡皮擦这两个主要功能，绘制线条的颜色取决于绑定在每个画板颜色选择器回调中的设置

```js
function bindColorsHandlers() {
    // 选中红色画笔时
    redEl.onclick = function () {
        // 覆盖改变绘制图形的填充颜色
        context.fillStyle = 'red'
        // 覆盖改变绘制线条的颜色
        context.strokeStyle = 'red'
        // 循环删除每一个颜色画板样式
        colorsLiEls.forEach(liEl => {
            liEl.classList.remove('active')
        })
        // 为选中的红色画板添加样式
        redEl.classList.add('active')
    }
 }
```

画笔大小逻辑同上

```js
// 绑定点击切换画笔大小的处理函数
function bindSizesHandlers() {
    thinEl.onclick = function () {
        lineWidth = 5
        // 循环删除每一个画笔样式
        sizesLiEls.forEach(liEl => {
            liEl.classList.remove('active')
        })
        // 为选中的画笔添加样式
        thinEl.classList.add('active')
    }
    thickEl.onclick = function () {
        lineWidth = 10
        // 循环删除每一个画笔样式
        sizesLiEls.forEach(liEl => {
            liEl.classList.remove('active')
        })
        // 为选中的画笔添加样式
        thickEl.classList.add('active')
    }
}
```

# 总结

为什么在`add colors and sizes `这个提交之后，不用修改`onTouch`与`onMouse`的逻辑实现，画板颜色切换和画笔大小切换是直接就可以工作的？主要还是得益于代码编写时采取了模块化处理，例如将每个可以复用的点封装成一个函数，并为这个函数取个简单且易懂的名字，**这样需要使用时就直接调用函数就可以**。发现这可能就是**函数式编程**思想的特性之一。

模块化这个方法可以提高编写代码和维护代码的效率。

# 关于函数式编程
请参见：
[深入理解函数式编程]: https://tech.meituan.com/2022/10/13/dive-into-functional-programming-01.html

