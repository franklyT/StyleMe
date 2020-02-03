export { Helpers };

class Helpers {
  constructor() {
    console.log(this.alphanumericKey.length)
  }
  readonly alphanumericKey: string =
    'abcdefghijklmnopqrtsuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()-_=+[{]};:,<.>/?'; // length is 89
  getRandomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
