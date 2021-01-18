# Observables

## Pull versus Push

Pull 和 Puhs 是两种不同的协议。其对比如下：

protocols | producer | consumer
--- | --- | ---
Pull | 当数据被需要时，**被动**生产数据 | 当需要数据时**主动**请求数据
Push | **主动**产数据 | **被动**接受新生产的数据

RxJs就是一种Push的协议，其中Observable就是producer，而Observer就是consumer。

## 示例

```js
let observable = new Observable(subscriber => {
      subscriber.next(1)
      subscriber.next(2)
      subscriber.next(3)
      setTimeout(() => {
        subscriber.next(4)
        subscriber.complete()
      }, 1000)
    })
    writeStr('/*before subscribr*/')
    observable.subscribe({
      next(val) {writeStr('/*get value ' + val + '*/')},
      error(err) {writeStr('/*error ocurred ' + err + '*/')},
      complete() {writeStr('/*done*/')}
    })
    writeStr('/*after subscribr*/')
```

与函数不同，Observables可以返回多个复杂的值（即多次调用next），但是函数只能有一个return。Observables既可以同步返回值，也可以异步返回值。

## Observable解析

Observable的生命周期：
- create 创建
- Subscribeing 订阅
- Executing 执行
- Disposing 释放

### 创建

`new Obserable(subscribe=>{})`

### 订阅

`observable.subscribe(x=>{})`

与事件不同，订阅并没有将subscribe注册到Observable上，Observable并不会维护一个订阅列表，订阅单纯的就是一个observable的执行启动器，并将observable返回的值传入到函数中。

### 执行

Observable中包括3种可传递的值
- next ：传递一个值
- error ：传递一个错误或异常
- complete ：完成，不传值

### 释放

`let subscription = observable.subscribe(x=>{})`
利用返回的subscription来取消执行
`subscription.unsubscribe()`

observable需要在创建的时候声明释放的方法，生命方式为在末尾返回一个取消订阅的函数
```js
let observable = new Observable(function subscribe(subscriber) {
  let intervalId = setInterval(() => {
    subscriber.next('hi');
  }, 1000);
  return function unsubscribe() {
    clearInterval(intervalId);
  };
});
```


- [目录](./README.md)