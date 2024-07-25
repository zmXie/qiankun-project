/**
 * 防抖
 * @param {*} fn
 * @param {*} delay
 *
 * 场景：
 */
export function debounce(fn, delay = 500) {
  var timerId = null;
  var flag = true;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timerId);
    let isRepeat = false;
    if (flag) {
      fn.apply(context, args);
      isRepeat = true;
      flag = false;
    }
    timerId = setTimeout(() => {
      if (!isRepeat) fn.apply(context, args);
      flag = true;
    }, delay);
  };
}

/**
 * 节流
 * @param {*} fn
 * @param {*} delay
 *
 * 场景：
 */
export function throttle(fn, delay = 500) {
  let last;
  let timer;
  let interval = delay;
  return function () {
    let args = arguments;
    let now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(this, args);
      }, interval);
    } else {
      last = now;
      fn.apply(this, args);
    }
  };
}

/**
 * 倒计时
 * @param {*} options
 */
export function countDown(options) {
  if (!options) return;
  let { startVal, endVal, step, runCallback, endCallback } = options;
  let timeInterval = setInterval(() => {
    startVal--;
    runCallback(startVal);

    if (startVal === endVal) {
      clearInterval(timeInterval);
      timeInterval = null;
      endCallback();
    }
  }, step);
}

/**
 * @description 深度克隆
 * @param {object} obj 需要深度克隆的对象
 * @returns {*} 克隆后的对象或者原值（不是对象）
 */
export function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    // 原始类型直接返回
    return obj;
  }
  const o = obj instanceof Array ? [] : {};
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}