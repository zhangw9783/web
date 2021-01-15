export const codeRep = {
  '1': `
  let observable = new Observable(subscriber => {
    subscriber.next(1)
    subscriber.next(2)
    subscriber.next(3)
    setTimeout(() => {
      subscriber.next(4)
    }, 1000)
  })
  writeStr('/*before subscribr*/')
  observable.subscribe({
    next(val) {writeStr('/*get value ' + val + '*/')},
    error(err) {writeStr('/*error ocurred ' + err + '*/')},
    complete() {writeStr('/*done*/')}
  })
  writeStr('/*after subscribr*/')
  `,
  '2': `
  writeStr('demo2')
  `,
}