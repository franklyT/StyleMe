import * as StyleMe from './GlobalStyle.js';
var styleMe = new StyleMe.GlobalStyle();
// inject all new CSS in style tag, not inline
// maybe assign unique class to all DOM elements and style them based on that
function styleMeLoader() {
    var Style_Me = document.createElement('style');
    Style_Me.type = 'text/css';
    Style_Me.id = styleMe.getKey();
    Style_Me.innerHTML = "\n  ";
    document.getElementsByTagName('head')[0].appendChild(Style_Me);
}
function lightenDarkenColor(colorArg, percentArg) {
    var color = colorArg.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/), r = color[1] > 16
        ? Math.floor(Number(color[1]) - Number(color[1]) * Number(percentArg * 0.01))
        : 16, g = color[2] > 16
        ? Math.floor(Number(color[2]) - Number(color[2]) * Number(percentArg * 0.01))
        : 16, b = color[3] > 16
        ? Math.floor(Number(color[3]) - Number(color[3]) * Number(percentArg * 0.01))
        : 16, a = color[4] ? color[4] : 1;
    // console.log(`Old Value: ${colorArg}`);
    // console.log(`New Value: rgba(${r}, ${g}, ${b}, ${a})`);
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
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
    // HSP equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 75) {
        return true;
    }
    else {
        return false;
    }
}
var styleObject = [];
// current problem is that styleme injected tags are duplicated
function runDOOM() {
    var all = document.body.querySelectorAll('*:not(script|style)');
    for (var iterator = 0, max = all.length; iterator < max; iterator++) {
        var computeStyles = window.getComputedStyle(all[iterator]);
        if (isLight(computeStyles.getPropertyValue('background-color'))) {
            styleMe.setKey();
            all[iterator].classList.add("" + styleMe.getKey());
            all[iterator].style.backgroundColor = lightenDarkenColor(computeStyles.getPropertyValue('background-color'), 90);
        }
        if (!isLight(computeStyles.getPropertyValue('color'))) {
            styleMe.setKey();
            all[iterator].classList.add("" + styleMe.getKey());
            all[iterator].style.color = lightenDarkenColor(computeStyles.getPropertyValue('color'), -90);
        }
    }
}
window.onload = styleMeLoader;
runDOOM();
