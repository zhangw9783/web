# Operators

> Rx最重要的就是操作符了。Observable是基础，但是operator可以让复杂的异步代码以声明的方式轻松组成。

> operator都是函数。

## 分类

- 可传递的操作符：可使用`pipe()`来传递，这类操作符会返回一个新的observable，原有的实例并未改变，是一类纯净的操作符。

- 新建操作符：可以单独使用，产生一个新的observable。