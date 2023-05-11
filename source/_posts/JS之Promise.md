---
title: JS 之 Promise
date: 2020-04-04 16:09:05
updated:
tags:
categories:
hide:
comment:
---

# JS 之 Promise

学习 Promise 是非常重要的，因为它是一种异步编程的重要方式，可以帮助我们更好地处理异步操作，避免回调地狱（Callback Hell）的问题。

## 简单例子

假设我们要实现一个异步的加法函数 `addAsync`，它接收两个数字作为参数，并异步地计算它们的和，最终返回一个 Promise 对象，用于表示异步操作的结果。

```js
function addAsync(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a !== 'number' || typeof b !== 'number') {
        reject(new Error('Invalid arguments'));
      } else {
        resolve(a + b);
      }
    }, 1000);
  });
}
```

在这个例子中，我们通过 `new Promise()` 创建了一个新的 Promise 对象，并传入一个回调函数，这个回调函数接收两个参数 `resolve` 和 `reject`，分别用于表示异步操作成功和失败的情况。

在回调函数中，我们使用 `setTimeout()` 来模拟异步计算的过程。如果两个参数都是数字，那么我们就调用 `resolve` 方法，并将它们的和作为参数传入；如果有一个或两个参数不是数字，那么我们就调用 `reject` 方法，并传入一个错误对象作为参数。

接下来，我们可以使用 `then()` 方法来处理异步操作的结果：

```js
addAsync(2, 3)
  .then(result => {
    console.log(result); // 输出 5
  })
  .catch(error => {
    console.error(error); // 输出错误信息
  });
```

在这个例子中，我们首先调用 `addAsync()` 函数，并传入两个数字参数 2 和 3，得到一个 Promise 对象。然后，我们使用 `then()` 方法来处理异步操作成功的情况，它接收一个回调函数作为参数，这个回调函数会在异步操作成功后被调用，并传入异步操作的结果。在这个回调函数中，我们将结果输出到控制台。

如果异步操作失败，那么我们可以使用 `catch()` 方法来处理失败的情况，它接收一个回调函数作为参数，这个回调函数会在异步操作失败后被调用，并传入一个错误对象作为参数。在这个回调函数中，我们将错误信息输出到控制台。

总之，这个例子展示了如何使用 Promise 来实现异步操作，并处理异步操作的结果和错误。使用 Promise 可以帮助我们更好地处理异步操作，避免回调地狱的问题，提高代码的可读性和可维护性。
