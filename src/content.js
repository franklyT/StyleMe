import * as GlobalStyle from './GlobalStyle.js';
var StyleMe = new GlobalStyle.GlobalStyle();
function styleMeLoader() {
    var styleMe = document.createElement('style');
    styleMe.type = 'text/css';
    styleMe.id = "StyleMe-Node-" + StyleMe.getKey();
    styleMe.innerHTML = "\n  ";
    document.getElementsByTagName('head')[0].appendChild(styleMe);
}
window.onload = styleMeLoader;
runDOOM();
function LightenDarkenColor(col, amt) {
    var color = col.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    var newColor = [];
    if (Number(color[1]) + Number(amt) > 0) {
        newColor.push(Number(color[1]) + Number(amt));
    }
    else {
        newColor.push(0);
    }
    newColor.push(',');
    if (Number(color[2]) + Number(amt) > 0) {
        newColor.push(Number(color[2]) + Number(amt));
    }
    else {
        newColor.push(0);
    }
    newColor.push(',');
    if (Number(color[3]) + Number(amt) > 0) {
        newColor.push(Number(color[3]) + Number(amt));
    }
    else {
        newColor.push(0);
    }
    if (color[4]) {
        newColor.push(", " + color[4]);
    }
    return "rgba(" + newColor.join('') + ")";
}
function isLight(color) {
    // Variables for red, green, blue values
    var r, g, b, hsp;
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
        // If HEX --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {
        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
        r = color >> 16;
        g = (color >> 8) & 255;
        b = color & 255;
    }
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 75) {
        // light
        return true;
    }
    else {
        // dark
        return false;
    }
}
function runDOOM() {
    var all = document.body.querySelectorAll('*:not(script)');
    for (var iterator = 0, max = all.length; iterator < max; iterator++) {
        var computeStyles = window.getComputedStyle(all[iterator]);
        if (isLight(computeStyles.getPropertyValue('background-color'))) {
            all[iterator].style.backgroundColor = LightenDarkenColor(computeStyles.getPropertyValue('background-color'), -200);
        }
        else {
            all[iterator].style.backgroundColor = LightenDarkenColor(computeStyles.getPropertyValue('background-color'), 50);
        }
        if (isLight(computeStyles.getPropertyValue('color'))) {
            all[iterator].style.color = LightenDarkenColor(computeStyles.getPropertyValue('color'), -200);
        }
        else {
            all[iterator].style.color = LightenDarkenColor(computeStyles.getPropertyValue('color'), 200);
        }
    }
}
