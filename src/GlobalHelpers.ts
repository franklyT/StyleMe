export { Helpers };

class Helpers {
  constructor() {}
  readonly alphanumericKey: string =
    'abcdefghijklmnopqrtsuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // length is 62
  getRandomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
