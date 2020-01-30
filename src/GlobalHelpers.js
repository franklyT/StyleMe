export { Helpers };
var Helpers = /** @class */ (function () {
    function Helpers() {
        this.alphanumericKey = 'abcdefghijklmnopqrtsuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // length is 62
    }
    Helpers.prototype.getRandomBetween = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    return Helpers;
}());
