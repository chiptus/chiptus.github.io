const spotlightContainer = document.querySelector('.spotlight');
const contentContainer = document.querySelector('.content');
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

const startPosition = {
  left: {
    x: 100,
    y: 100,
  },
  right: {
    x: 500,
    y: 100,
  },
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

initView();

async function initView() {
  setSourceToPage(page);
  await setTimeoutAsync(1 * 2000);

  // show content TODO
  contentContainer.classList.remove('hide');
}

function setSourceToPage(page) {
  var btn = document.querySelector(`.menu ul li.${page}-button`);
  moveSourceToButton(btn);
}

function moveSourceToButton(btn) {
  const widthTop = btn.clientWidth;
  const top = btn.offsetTop + btn.clientHeight;
  const topLeftX = btn.offsetLeft;
  const bottomLeftX = startPosition.left.x;
  const widthBottom = startPosition.right.x - startPosition.left.x;
  // const height = startPosition.left.y;
  setSpotlight({ widthTop, top, topLeftX, bottomLeftX, widthBottom });
}

async function setTimeoutAsync(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

async function onClickButton(btn) {
  // hide spotlight
  spotlightContainer.classList.add('spotlight-initial');
  // hide content TODO
  contentContainer.classList.add('hide');

  await setTimeoutAsync(3 * 1000);
  spotlightContainer.classList.remove('spotlight-animation');
  page = btn.getAttribute('data-page');
  window.location.hash = `${page}`;
  // show spotlight
  spotlightContainer.classList.remove('spotlight-initial');
  await setTimeoutAsync(1 * 1000);
  // restart animation
  spotlightContainer.classList.add('spotlight-animation');
  await setTimeoutAsync(1 * 2000);

  // show content TODO
  contentContainer.classList.remove('hide');
}

function setSpotlight({
  widthTop,
  widthBottom,
  top,
  topLeftX,
  bottomLeftX,
  height,
}) {
  if (height) {
    spotlightContainer.style.setProperty(
      inputNameToCssVar.height,
      height + 'px'
    );
  }

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

// const toggleAnimationButton = document.querySelector('#toggle-animation');

// toggleAnimationButton.addEventListener('click', () => {
//   const playState = spotlightContainer.style.animationPlayState;
//   spotlightContainer.style.animationPlayState =
//     playState === 'running' ? 'paused' : 'running';
// });
