import * as StyleMe from './GlobalHelpers.js';
export { GlobalStyle };
var GlobalStyle = /** @class */ (function () {
    function GlobalStyle() {
        this._uniqueKey = '';
        this._help = new StyleMe.Helpers();
        // initalize with entropy protected node namespace
        this.setKey();
    }
    GlobalStyle.prototype.setKey = function () {
        var uniqueId = ['StyleMe-injected-'];
        var iterator = 12; // 12 seems sufficient entropy
        while (iterator !== 0) {
            uniqueId.push(this._help.alphanumericKey[this._help.getRandomBetween(1, 62)]);
            iterator -= 1;
        }
        this._uniqueKey = uniqueId.join('');
    };
    GlobalStyle.prototype.getKey = function () {
        return this._uniqueKey;
    };
    return GlobalStyle;
}());
