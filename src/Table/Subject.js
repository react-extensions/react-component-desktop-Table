const HEIGHT = 'HEIGHT';

export default class Subject {
  constructor(height) {
    this.observerQueue = [];
    this.height = height;
  }

  emit(key, value, vm) {
    if (key === HEIGHT) {
      this.height = value;
    }
    this.observerQueue.forEach(
      item => item !== vm && item.updateSync(key, value)
    );
  }

  addObserver(observer) {
    this.observerQueue.push(observer);
    return callback => {
      this.observerQueue.splice(this.observerQueue.indexOf(observer), 1);
      callback(this.observerQueue.length);
    };
  }

  resize() {
    this.observerQueue.forEach(item => {
      item.forceUpdate();
    });
  }
}
