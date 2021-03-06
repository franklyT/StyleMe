import * as StyleMe from './GlobalHelpers.js';

export { GlobalStyle };

class GlobalStyle {
  private _lastKey: string = '';
  private _masterStyle: Array<string> = [
    `body {background: black !important;}html {background: black !important;}`
  ];
  public help: StyleMe.Helpers = new StyleMe.Helpers();

  generateKey() {
    let uniqueId: Array<string> = ['StyleMe-injected-'];
    let iterator: number = 20; // 20 seems sufficient entropy
    while (iterator !== 0) {
      uniqueId.push(
        this.help.alphanumericKey[this.help.getRandomBetween(1, 62)]
      );
      iterator -= 1;
    }
    return uniqueId.join('');
  }

  getLastKey() {
    return this._lastKey;
  }

  setLastKey(key: string) {
    this._lastKey = key;
  }

  getStyles() {
    return this._masterStyle;
  }

  addStyle(key: string, style: string) {
    this._masterStyle.push(`.${key} {${style}}`);
    this.setLastKey(key);
  }
}
