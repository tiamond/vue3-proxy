let activeEffect: Function
export const effect = (fn: Function) => {
  const _effect = function () {
    activeEffect = _effect
    fn()
  }

  _effect()
}

// 收集依赖
const targetMap = new WeakMap()
export const track = (target: object, key: string | symbol) => {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }

  deps.add(activeEffect)
}

// 更新
export const trigger = (target: object, key: string | symbol) => {
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return new Error("");
  }

  const deps = depsMap.get(key)
  if (!deps) {
    return new Error("");
  }

  deps.forEach((effect: Function) => effect());
}