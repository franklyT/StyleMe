import * as StyleMe from './GlobalHelpers.js';
export { GlobalStyle };
var GlobalStyle = /** @class */ (function () {
    function GlobalStyle() {
        this._lastKey = '';
        this._masterStyle = [
            "body {background: black !important;}html {background: black !important;}"
        ];
        this.help = new StyleMe.Helpers();
    }
    GlobalStyle.prototype.generateKey = function () {
        var uniqueId = ['StyleMe-injected-'];
        var iterator = 20; // 20 seems sufficient entropy
        while (iterator !== 0) {
            uniqueId.push(this.help.alphanumericKey[this.help.getRandomBetween(1, 62)]);
            iterator -= 1;
        }
        return uniqueId.join('');
    };
    GlobalStyle.prototype.getLastKey = function () {
        return this._lastKey;
    };
    GlobalStyle.prototype.setLastKey = function (key) {
        this._lastKey = key;
    };
    GlobalStyle.prototype.getStyles = function () {
        return this._masterStyle;
    };
    GlobalStyle.prototype.addStyle = function (key, style) {
        this._masterStyle.push("." + key + " {" + style + "}");
        this.setLastKey(key);
    };
    return GlobalStyle;
}());
