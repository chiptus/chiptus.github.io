const spotlightContainer = document.querySelector('.spotlight');
const menuButtons = document.querySelectorAll('.menu ul li');
let page = window.location.hash ? window.location.hash.substr(1) : 'about';
const inputNameToCssVar = {
  height: '--height',
  top: '--from-top',
  widthTop: '--width-top',
  widthBottom: '--width-bottom',
  topLeftX: '--top-left-x',
  bottomLeftX: '--bottom-left-x',
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
  const widthTop = btn.clientWidth;
  const top = btn.offsetTop + btn.clientHeight;
  const topLeftX = btn.offsetLeft;
  const bottomLeftX = Math.random() * (0.2 * spotlightContainer.clientWidth);
  const widthBottom = Math.random() * spotlightContainer.clientWidth;
  setSpotlight({ widthTop, top, topLeftX, bottomLeftX, widthBottom });
}

function onClickButton(btn) {
  page = btn.getAttribute('data-page');
  window.location.hash = `${page}`;
}

function setSpotlight({ widthTop, widthBottom, top, topLeftX, bottomLeftX }) {
  if (widthTop) {
    spotlightContainer.style.setProperty(
      inputNameToCssVar.widthTop,
      widthTop + 'px'
    );
  }
  if (widthBottom) {
    spotlightContainer.style.setProperty(
      inputNameToCssVar.widthBottom,
      widthBottom + 'px'
    );
  }
  if (top) {
    spotlightContainer.style.setProperty(inputNameToCssVar.top, `${top}px`);
  }

  if (topLeftX) {
    spotlightContainer.style.setProperty(
      inputNameToCssVar.topLeftX,
      `${topLeftX}px`
    );
  }

  if (bottomLeftX) {
    spotlightContainer.style.setProperty(
      inputNameToCssVar.bottomLeftX,
      `${bottomLeftX}px`
    );
  }
}
