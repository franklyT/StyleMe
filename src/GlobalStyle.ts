import * as StyleMe from './GlobalHelpers.js';

export { GlobalStyle };

class GlobalStyle {
  constructor() {
  }

  private _lastKey: string = '';
  private _help: StyleMe.Helpers = new StyleMe.Helpers();
  private _masterStyle: Array<string> = [`
    body {
      background: black;
    }
    html {
      background: black;
    }
  `];

  getKey() {
    return this._lastKey;
  }

  getStyles() {
    return this._masterStyle;
  }

  generateKey() {
    let uniqueId: Array<string> = ['StyleMe-injected-'];
    let iterator: number = 15; // 15 seems sufficient entropy
    while (iterator !== 0) {
      uniqueId.push(
        this._help.alphanumericKey[this._help.getRandomBetween(1, 62)]
      );
      iterator -= 1;
    }
    return uniqueId.join('');
  }

  addStyle(key: string, style: string) {
    let returnStyle: string = `.${key} {${style}}`;
    this._masterStyle.push(returnStyle);
    this._lastKey = key;
  }
}
