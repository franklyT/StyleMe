import * as StyleMe from './GlobalStyle.js';
var styleMe = new StyleMe.GlobalStyle();
function loadStyle() {
    var Style_Me = document.createElement('style');
    Style_Me.type = 'text/css';
    Style_Me.id = 'StyleMe-Master-Node';
    document.getElementsByTagName('head')[0].appendChild(Style_Me);
}
function lightenAllText() {
    document.body.querySelectorAll('*:not(script)').forEach(function (elm) {
        styleMe.addStyle(styleMe.generateKey(), "color: lime !important;");
        elm.classList.add("" + styleMe.getLastKey());
    });
    document.getElementById('StyleMe-Master-Node').innerHTML = styleMe.getStyles().join('');
}
function processNodes() {
    document.body.querySelectorAll('*:not(script)').forEach(function (elm) {
        var computeStyles = window.getComputedStyle(elm);
        if (styleMe.help.isLight(computeStyles.getPropertyValue('background-color'))) {
            styleMe.addStyle(styleMe.generateKey(), "background: " + styleMe.help.lightenDarkenColor(computeStyles.getPropertyValue('background-color'), 90) + " !important;");
            elm.classList.add("" + styleMe.getLastKey());
        }
    });
    document.getElementById('StyleMe-Master-Node').innerHTML = styleMe.getStyles().join('');
}
// remove from load, add mutation observer
window.addEventListener('load', function () {
    loadStyle();
    lightenAllText();
    processNodes();
});
