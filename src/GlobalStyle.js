import * as StyleMe from './GlobalHelpers.js';
export { GlobalStyle };
var GlobalStyle = /** @class */ (function () {
    function GlobalStyle() {
        this._lastKey = '';
        this._help = new StyleMe.Helpers();
        this._masterStyle = ["\n    body {\n      background: black;\n    }\n    html {\n      background: black;\n    }\n  "];
    }
    GlobalStyle.prototype.getKey = function () {
        return this._lastKey;
    };
    GlobalStyle.prototype.getStyles = function () {
        return this._masterStyle;
    };
    GlobalStyle.prototype.generateKey = function () {
        var uniqueId = ['StyleMe-injected-'];
        var iterator = 15; // 15 seems sufficient entropy
        while (iterator !== 0) {
            uniqueId.push(this._help.alphanumericKey[this._help.getRandomBetween(1, 62)]);
            iterator -= 1;
        }
        return uniqueId.join('');
    };
    GlobalStyle.prototype.addStyle = function (key, style) {
        var returnStyle = "." + key + " {" + style + "}";
        this._masterStyle.push(returnStyle);
        this._lastKey = key;
    };
    return GlobalStyle;
}());
