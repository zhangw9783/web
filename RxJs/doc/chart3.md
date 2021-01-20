# Operators

> Rx最重要的就是操作符了。Observable是基础，但是operator可以让复杂的异步代码以声明的方式轻松组成。

> operator都是函数。

## 分类

- 可传递的操作符（pipeable）：可使用`pipe()`来传递，这类操作符会返回一个新的observable，原有的实例并未改变，是一类纯净的操作符。

- 新建操作符（creation）：可以单独使用，产生一个新的observable。

### 操作符文档

- Creation Operators

操作名 | 参数 | 描述
--- | --- | ---
ajax | (string &#124; object) | 创建一个ajax请求并返回一个Observable
bindCallback | (callbackFunc: Function, resultSelector?: Function &#124; SchedulerLike, scheduler?: SchedulerLike) | 将非 Observable 的函数转化成一个 Observable 函数
bindNodeCallback | (callbackFunc: Function, resultSelector: Function &#124; SchedulerLike, scheduler?: SchedulerLike) | bindCallback 的 node 版本