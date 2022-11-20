class Array {
  memory = 0;
  size = 0;
  length = 0;

  constructor(initialSize) {
    if (
      Number(initialSize) !== initialSize ||
      Math.round(initialSize) !== initialSize
    ) {
      throw new Error("Длина массива должна быть целым числом");
    }
    if (!(initialSize > 0)) {
      throw new Error("Размер массива должен быть больше нуля");
    }

    this.memory = allocate(initialSize);
    this.size = initialSize;
    this.length = 0;
  }

  get(index) {
    this._checkIndex(index);
    return this.memory[index];
  }

  getAll() {
    const newObj = {};
    for (let i = 0; i < this.length; i++) {
      newObj[i] = this.memory[i];
    }
    return newObj;
  }

  set(index, value) {
    this._checkIndex(index);
    this.memory[index] = value;
  }

  add(index, value) {
    if (index === undefined) {
      this.memory[this.length] = value;
    } else {
      this._checkIndex(index);

      for (let i = this.length; i > index; i--) {
        this.memory[i] = this.memory[i - 1];
      }

      this.memory[index] = value;
    }

    this.length++;

    if (this.length === this.size) {
      this._resize();
    }

    return this.length;
  }

  delete(index) {
    this._checkIndex(index);

    for (let i = index + 1; i < this.length; i++) {
      this.memory[i - 1] = this.memory[i];
    }

    this.length--;
    this.memory[this.length] = undefined;

    return this.length;
  }

  _resize() {
    const newSize = this.size * 2;
    const newMemory = allocate(newSize);

    for (let i = 0; i < this.size; i++) {
      newMemory[i] = this.memory[i];
    }

    this.size = newSize;
    this.memory = newMemory;
  }

  _checkIndex(index) {
    if (index < 0) {
      throw new Error("Индекс за пределами массива");
    }
  }
}

function allocate(size) {
  const memory = {};

  for (let i = 0; i < size; i++) {
    memory[i] = undefined;
  }

  return memory;
}

export default Array;
