import * as Helpers from './GlobalHelpers.js';

export { GlobalStyle };

class GlobalStyle {
  constructor() {
    // initalize with entropy protected node namespace
    this.setKey();
  }

  private _uniqueKey: string = '';
   _help = new Helpers.Helpers();

  setKey() {
    let uniqueId: Array<string> = [];
    let iterator: number = 15; // 15 seems sufficient entropy
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
