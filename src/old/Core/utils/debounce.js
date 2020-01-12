export default function debounce(
  fn,
  { time = 300, argsHandle = (...args) => args }
) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    if (argsHandle) {
      args = argsHandle(...args);
    }
    setTimeout(() => {
      argsHandle ? fn(args) : fn(...args);
    }, time);
  };
}
