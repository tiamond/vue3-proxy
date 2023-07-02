import { track, trigger } from './effect'

export const reactive = <T extends object>(target: T) => {
  return new Proxy(target, {
    get(target, key, receiver) {
      let res = Reflect.get(target, key, receiver)
      // 为什么使用Reflect -- 参考《vue的设计与实现》

      track(target, key)
      return res

      // return target[key] // 直接这样放回，有时候会导致上下文错乱。需要使用Reflect
    },

    set(target, key, value, receiver) {
      let res = Reflect.set(target, key, value, receiver)

      trigger(target, key)
      return res // 要求返回bool值，Reflect刚刚好返回的bool
    }
  })
}