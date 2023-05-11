---
title: JS 之 词法作用域
date: 2020-04-03 16:09:42
updated:
tags:
categories:
hide:
comment:
---

# JS 之 词法作用域

词法作用域是 JavaScript 中的一个概念，它指的是变量作用域的静态性。在词法作用域中，变量的作用域由它在代码中声明的位置所决定，与代码执行的上下文无关。例如：

```javascript
let x = 1;

function foo() {
  console.log(x);
}

function bar() {
  let x = 2;
  foo();
}

bar(); // 输出 1
```

在这个例子中，函数 `foo` 中的 `x` 引用的是外部的变量 `x`，因为在词法作用域中，函数 `foo` 的作用域链包含了它定义时所处的作用域，即全局作用域。
