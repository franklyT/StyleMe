import * as StyleMe from './GlobalStyle.js';

let styleMe = new StyleMe.GlobalStyle();

function styleMeLoader() {
  const Style_Me = document.createElement('style');
  Style_Me.type = 'text/css';
  Style_Me.id = 'StyleMe-Master-Node';
  document.getElementsByTagName('head')[0].appendChild(Style_Me);
}

function processNodes() {
  document.body.querySelectorAll('*:not(script)').forEach((elm: any) => {
    elm.style.color = `lime`;
    let computeStyles = window.getComputedStyle(elm);
    if (
      styleMe.help.isLight(computeStyles.getPropertyValue('background-color'))
    ) {
      styleMe.addStyle(
        styleMe.generateKey(),
        `background: ${styleMe.help.lightenDarkenColor(
          computeStyles.getPropertyValue('background-color'),
          90
        )} !important;`
      );
      elm.classList.add(`${styleMe.getLastKey()}`);
      document.getElementById(
        'StyleMe-Master-Node'
      )!.innerHTML = styleMe.getStyles().join('');
    }
  });
}

// remove from load, add mutation o
window.addEventListener('load', () => {
  styleMeLoader();
  processNodes();
});
