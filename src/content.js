import * as GlobalStyle from './GlobalStyle.js';
var StyleMe = new GlobalStyle.GlobalStyle();
// inject all new CSS in style tag, not inline
// maybe assign unique class to all DOM elements and style them based on that
function styleMeLoader() {
    var styleMe = document.createElement('style');
    styleMe.type = 'text/css';
    styleMe.id = StyleMe.getKey();
    styleMe.innerHTML = "\n  ";
    document.getElementsByTagName('head')[0].appendChild(styleMe);
}
function lightenDarkenColor(colorArg, reducerArg) {
    var color = colorArg.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    var oldColor = [color[1], color[2], color[3], color[4]];
    // Substitute alpha channel if not provided through a mini test
    oldColor.forEach(function (elm, index) {
        if (!elm) {
            oldColor.splice(index, 1, 1);
        }
    });
    var newColor = [];
    oldColor.forEach(function (elm, index) {
        // Push alpha channel to array unchanged
        if (index === 3) {
            newColor.push(elm);
        }
        else {
            // Lighten/darken RGB values
            newColor.push(addZeroFloor(Number(elm) + Number(reducerArg)));
            newColor.push(',');
        }
    });
    return "rgba(" + newColor.join('') + ")";
}
function addZeroFloor() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    var returnPoint = numbers.reduce(function (num1, num2) {
        num1 + num2;
    });
    return returnPoint > 0 ? returnPoint : 0;
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
var styleObject = [];
// current problem is that styleme injected tags are duplicated
function runDOOM() {
    var all = document.body.querySelectorAll('*:not(script)');
    for (var iterator = 0, max = all.length; iterator < max; iterator++) {
        var computeStyles = window.getComputedStyle(all[iterator]);
        if (isLight(computeStyles.getPropertyValue('background-color'))) {
            StyleMe.setKey();
            all[iterator].classList.add("StyleMe-injected-" + StyleMe.getKey());
            all[iterator].style.backgroundColor = lightenDarkenColor(computeStyles.getPropertyValue('background-color'), -200);
        }
        else {
            StyleMe.setKey();
            all[iterator].classList.add("StyleMe-injected-" + StyleMe.getKey());
            all[iterator].style.backgroundColor = lightenDarkenColor(computeStyles.getPropertyValue('background-color'), 50);
        }
        if (isLight(computeStyles.getPropertyValue('color'))) {
            StyleMe.setKey();
            all[iterator].classList.add("StyleMe-injected-" + StyleMe.getKey());
            all[iterator].style.color = lightenDarkenColor(computeStyles.getPropertyValue('color'), -200);
        }
        else {
            StyleMe.setKey();
            all[iterator].classList.add("StyleMe-injected-" + StyleMe.getKey());
            all[iterator].style.color = lightenDarkenColor(computeStyles.getPropertyValue('color'), 200);
        }
    }
}
window.onload = styleMeLoader;
runDOOM();
