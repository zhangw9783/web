import { Observable, of } from 'rxjs'
import { map, first } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

/**
 * demo1
 */
// let demo1 = new Observable(subscriber => {
//   subscriber.next(1)
//   subscriber.next(2)
//   subscriber.next(3)
//   setTimeout(() => {
//     subscriber.next(4)
//     subscriber.complete()
//   }, 1000)
// })
// console.log('/*before subscribr*/')
// demo1.subscribe({
//   next(val) {console.log('/*get value ' + val + '*/')},
//   error(err) {console.log('/*error ocurred ' + err + '*/')},
//   complete() {console.log('/*done*/')}
// })
// console.log('/*after subscribr*/')


/**
 * demo2
 */
// map(x => x**2)(of(1,2,3)).subscribe(x=>console.log(x))
// console.log('/*************/')
// first(x => x**2)(of(1,2,3)).subscribe(x=>console.log(x))

/**
 * demo3
 */
// ajax('/index.html').pipe(
//   first()
// ).subscribe(x => console.log(x))