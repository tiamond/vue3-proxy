let activeEffect;
export const effect = (fn, _options) => {
    const _effect = function () {
        activeEffect = _effect;
        let res = fn();
        return res;
    };
    _effect.options = _options;
    _effect();
    return _effect;
};
// 收集依赖
const targetMap = new WeakMap();
export const track = (target, key) => {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    let deps = depsMap.get(key);
    if (!deps) {
        deps = new Set();
        depsMap.set(key, deps);
    }
    deps.add(activeEffect);
};
// 更新
export const trigger = (target, key) => {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
        return new Error("");
    }
    const deps = depsMap.get(key);
    if (!deps) {
        return new Error("");
    }
    deps.forEach((effect) => {
        var _a, _b, _c, _d, _e;
        if ((_b = (_a = effect === null || effect === void 0 ? void 0 : effect.prototype) === null || _a === void 0 ? void 0 : _a._options) === null || _b === void 0 ? void 0 : _b.scheduler) {
            (_e = (_d = (_c = effect === null || effect === void 0 ? void 0 : effect.prototype) === null || _c === void 0 ? void 0 : _c._options) === null || _d === void 0 ? void 0 : _d.scheduler) === null || _e === void 0 ? void 0 : _e.call(_d);
        }
        else {
            effect();
        }
    });
};
