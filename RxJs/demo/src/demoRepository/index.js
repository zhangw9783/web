import { writeStr, writeLine } from '../util/tool'
import { Observable, of } from 'rxjs'
import { map, first } from 'rxjs/operators'

export const demoRep = {
  '1': () => {
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
  },
  '2': () => {
    map(x => x**2)(of(1,2,3)).subscribe(x=>writeLine(x))
    writeLine('/*************/')
    first(x => x**2)(of(1,2,3)).subscribe(x=>writeLine(x))
  }
}