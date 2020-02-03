import * as StyleMe from './GlobalStyle.js';

let styleMe = new StyleMe.GlobalStyle();

function styleMeLoader() {
  let Style_Me = document.createElement('style');
  Style_Me.type = 'text/css';
  Style_Me.id = 'StyleMe-Master-Node';
  Style_Me.innerHTML = `
  html {
    background: black;
  }

  body {
    background: black;
  }
  `;

  document.getElementsByTagName('head')[0].appendChild(Style_Me);
}

function lightenDarkenColor(colorArg: string, percentArg: number) {
  const color: any = colorArg.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    ),
    r =
      color[1] > 16
        ? Math.floor(
            Number(color[1]) - Number(color[1]) * Number(percentArg * 0.01)
          )
        : 16,
    g =
      color[2] > 16
        ? Math.floor(
            Number(color[2]) - Number(color[2]) * Number(percentArg * 0.01)
          )
        : 16,
    b =
      color[3] > 16
        ? Math.floor(
            Number(color[3]) - Number(color[3]) * Number(percentArg * 0.01)
          )
        : 16,
    a = color[4] ? color[4] : 1;

  // console.log(`Old Value: ${colorArg}`);
  // console.log(`New Value: rgba(${r}, ${g}, ${b}, ${a})`);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
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

  // HSP equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 75) {
    return true;
  } else {
    return false;
  }
}

function runDOOM() {
  var all: any = document.body.querySelectorAll('*:not(script)');
  for (var iterator = 0, max = all.length; iterator < max; iterator++) {
    all[iterator].style.color = `lime `;
    let computeStyles = window.getComputedStyle(all[iterator]);
    styleMe.getStyles();

    if (isLight(computeStyles.getPropertyValue('background-color'))) {
      styleMe.addStyle(
        styleMe.generateKey(),
        `background: ${lightenDarkenColor(
          computeStyles.getPropertyValue('background-color'),
          90
        )} !important;`
      );
      all[iterator].classList.add(`${styleMe.getKey()}`);
      document.getElementById(
        'StyleMe-Master-Node'
      )!.innerHTML = styleMe.getStyles().join('');
    }
  }
}

window.addEventListener('load', () => {
  styleMeLoader();
  runDOOM();
});
