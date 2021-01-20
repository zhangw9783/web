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
**bindCallback** | (callbackFunc: Function, resultSelector?: Function &#124; SchedulerLike, scheduler?: SchedulerLike) | 将非 Observable 的函数转化成一个 Observable 函数
bindNodeCallback | (callbackFunc: Function, resultSelector: Function &#124; SchedulerLike, scheduler?: SchedulerLike) | bindCallback 的 node 版本
**defer** | (observableFactory: () => R) | 生成一个可观察对象工厂，为每个 Observer 生成一个新的 Observable
empty | (scheduler?: SchedulerLike) | 生成一个空的 Observable
**from** | (input: any, scheduler?: SchedulerLike) | 从一个 Array 、 类 Array 的对象 、 iterable 、 Promise 或者一个类 Observable 的对象生成一个新的 Observable
fromEvent | (target: FromEventTarget<T>, eventName: string, options?: EventListenerOptions &#124; ((...args: any[]) => T) | 从DOM事件生成新的Observable，可用于事件绑定
fromEventPattern | (addHandler: (handler: NodeEventHandler) => any, removeHandler?: (handler: NodeEventHandler, signal?: any) => void, resultSelector?: (...args: any[]) => T) | 从事件监听的handler生成新的Observable
generate | (initialState: S, condition: ConditionFunc&lt;S&gt;, iterate: IterateFunc&lt;S&gt;, scheduler?: SchedulerLike) | 对符合条件的处理并生成新的Observable
**interval** | (period: number = 0, scheduler: SchedulerLike = async) | 每隔固定时间就产生一个一次累加的数
of | (...args: (SchedulerLike &#124; T)[]) | 从参数产生新的Observable
range | (start: number = 0, count?: number, scheduler?: SchedulerLike) | 从指定位置开始产生指定个数的数
throwError | (error: any, scheduler?: SchedulerLike) | 生成一个立即发出错误的Observable
timer | (dueTime: number &#124; Date = 0, periodOrScheduler?: number &#124; SchedulerLike, scheduler?: SchedulerLike) | 指定时间范围内，每隔固定时间产生一个新的数
iif | (condition: () => boolean, trueResult: SubscribableOrPromise&lt;T&gt; = EMPTY, falseResult: SubscribableOrPromise&lt;F&gt; = EMPTY) | 有condition决定实际哪个Observable被订阅


- [目录](./READEME.md)