import * as Helpers from './GlobalHelpers.js';
export { GlobalStyle };
var GlobalStyle = /** @class */ (function () {
    function GlobalStyle() {
        // Private
        // refer to getKey() for external access
        this._uniqueKey = '';
        // Private
        this._help = new Helpers.Helpers();
        // initalize with entropy protected node namespace
        this.setKey();
    }
    GlobalStyle.prototype.setKey = function () {
        var uniqueId = [];
        var iterator = 10; // 10 seems sufficient arbitrary entropy
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
