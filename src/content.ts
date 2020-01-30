import * as GlobalStyle from './GlobalStyle.js';

let StyleMe = new GlobalStyle.GlobalStyle();

// inject all new CSS in style tag, not inline
// maybe assign unique class to all DOM elements and style them based on that

function styleMeLoader() {
  let styleMe = document.createElement('style');
  styleMe.type = 'text/css';
  styleMe.id = StyleMe.getKey();
  styleMe.innerHTML = `
  `;

  document.getElementsByTagName('head')[0].appendChild(styleMe);
}

function lightenDarkenColor(colorArg: string, reducerArg: number) {
  const color: any = colorArg.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    ),
    r = color[1],
    g = color[2],
    b = color[3],
    // Substitute alpha channel if not provided
    a = color[4] ? color[4] : 1;

  let oldColor = [r, g, b, a];
  
  let newColor: Array<any> = [];
  oldColor.forEach((elm, index) => {
    // Push alpha channel to array unchanged
    if (index === 3) {
      newColor.push(elm);
    } else {
      // Lighten/darken RGB values
      newColor.push(addZeroFloor(Number(elm) + Number(reducerArg)));
      newColor.push(',');
    }
  });
  return `rgba(${newColor.join('')})`;
}

function addZeroFloor(...numbers: Array<any>) {
  const returnPoint = numbers.reduce((num1: number, num2: number) => {
    num1 + num2;
  });
  return returnPoint > 0 ? returnPoint : 0;
}

function isLight(color: any) {
  // Variables for red, green, blue values
  let r, g, b, hsp;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );
    r = color[1];
    g = color[2];
    b = color[3];
  } else {
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
  } else {
    // dark
    return false;
  }
}

let styleObject = [];

// current problem is that styleme injected tags are duplicated
function runDOOM() {
  var all: any = document.body.querySelectorAll('*:not(script)');
  for (var iterator = 0, max = all.length; iterator < max; iterator++) {
    let computeStyles = window.getComputedStyle(all[iterator]);

    if (isLight(computeStyles.getPropertyValue('background-color'))) {
      StyleMe.setKey();
      all[iterator].classList.add(`StyleMe-injected-${StyleMe.getKey()}`);
      all[iterator].style.backgroundColor = lightenDarkenColor(
        computeStyles.getPropertyValue('background-color'),
        -200
      );
    } else {
      StyleMe.setKey();
      all[iterator].classList.add(`StyleMe-injected-${StyleMe.getKey()}`);
      all[iterator].style.backgroundColor = lightenDarkenColor(
        computeStyles.getPropertyValue('background-color'),
        50
      );
    }
    if (isLight(computeStyles.getPropertyValue('color'))) {
      StyleMe.setKey();
      all[iterator].classList.add(`StyleMe-injected-${StyleMe.getKey()}`);
      all[iterator].style.color = lightenDarkenColor(
        computeStyles.getPropertyValue('color'),
        -200
      );
    } else {
      StyleMe.setKey();
      all[iterator].classList.add(`StyleMe-injected-${StyleMe.getKey()}`);
      all[iterator].style.color = lightenDarkenColor(
        computeStyles.getPropertyValue('color'),
        200
      );
    }
  }
}

window.onload = styleMeLoader;
runDOOM();
