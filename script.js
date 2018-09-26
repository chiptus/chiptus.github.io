const spotlightContainer = document.querySelector('.spotlight-container');
const menuButtons = document.querySelectorAll('.menu ul li');
let page = window.location.hash ? window.location.hash.substr(1) : 'about';
const inputNameToCssVar = {
  sourceWidth: '--spotlight-source-width',
  width: '--spotlight-width',
  sourcex: '--spotlight-sourcex',
  sourcey: '--spotlight-sourcey',
};

menuButtons.forEach(btn => {
  btn.addEventListener('click', () => onClickButton(btn));
});

window.addEventListener('resize', () => {
  setSourceToPage(page);
});

window.addEventListener('hashchange', () => {
  setSourceToPage(window.location.hash.substr(1));
});

setSourceToPage(page);

function setSourceToPage(page) {
  var btn = document.querySelector(`.menu ul li.${page}-button`);
  moveSourceToButton(btn);
}

function moveSourceToButton(btn) {
  const sourceWidth = btn.clientWidth;
  const centerTop = btn.offsetTop + btn.clientHeight;
  const centerLeft = btn.offsetLeft;
  const sourceY = (centerTop / spotlightContainer.clientHeight) * 100;
  const leftTriangleWidth = (centerLeft / spotlightContainer.clientWidth) * 100;
  setSpotlight({ sourceWidth, sourceY, leftTriangleWidth });
}

function onClickButton(btn) {
  page = btn.getAttribute('data-page');
  window.location.hash = `${page}`;
}

function setSpotlight({ sourceWidth, sourceY, leftTriangleWidth }) {
  spotlightContainer.style.setProperty(
    inputNameToCssVar.sourceWidth,
    sourceWidth + 'px'
  );
  spotlightContainer.style.setProperty(
    '--spotlight-left-triangle-width',
    leftTriangleWidth + 'vw'
  );
  spotlightContainer.style.setProperty(
    inputNameToCssVar.sourcey,
    `${sourceY}vh`
  );
}
