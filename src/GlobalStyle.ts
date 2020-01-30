import * as Helpers from './GlobalHelpers.js';

export { GlobalStyle };

class GlobalStyle {
  constructor() {
    // initalize with entropy protected node namespace
    this.setKey();
  }
  // Private
  // refer to getKey() for external access
  _uniqueKey: string = '';

  // Private
  _help = new Helpers.Helpers();

  setKey() {
    let uniqueId: Array<string> = [];
    let iterator: number = 10; // 10 seems sufficient arbitrary entropy
    while (iterator !== 0) {
      uniqueId.push(
        this._help.alphanumericKey[this._help.getRandomBetween(1, 62)]
      );
      iterator -= 1;
    }
    this._uniqueKey = uniqueId.join('');
  }

  getKey() {
    return this._uniqueKey;
  }
}
