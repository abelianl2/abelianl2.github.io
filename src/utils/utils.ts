/* eslint-disable @typescript-eslint/ban-types */
export function throttle(fn: Function, delay: number = 200) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function () {
    if (timer) return;
    timer = setTimeout(() => {
      // eslint-disable-next-line prefer-rest-params, @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line prefer-rest-params
      fn.apply(this, arguments);
      timer ? clearTimeout(timer) : "";
      timer = null;
    }, delay);
  };
}

export function debounce(fn: Function, delay = 100) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function () {
    // eslint-disable-next-line prefer-rest-params, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line prefer-rest-params, @typescript-eslint/no-this-alias
    const _this = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn.apply(_this, args);
    }, delay);
  };
}

// addr mask
export function addressDots(v: string | number, len = 12, lastlen = 12) {
  const newstr = typeof v === "number" ? v.toString() : v;
  return newstr
    ? newstr.slice(0, len) +
        "..." +
        newstr.slice(newstr.length - lastlen, newstr.length)
    : "";
}
