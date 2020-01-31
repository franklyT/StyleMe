export { Helpers };
var Helpers = /** @class */ (function () {
    function Helpers() {
        this.alphanumericKey = 'abcdefghijklmnopqrtsuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\`~!@#$%^&*()-_=+[{]}\|;:\'",<.>/?'; // length is 93
        console.log(this.alphanumericKey.length);
    }
    Helpers.prototype.getRandomBetween = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    return Helpers;
}());
