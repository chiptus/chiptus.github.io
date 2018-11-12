const spotlightContainer = document.querySelector('.spotlight');
const contentContainer = document.querySelector('.content');
const menuButtons = document.querySelectorAll('.menu ul li');
let page = window.location.hash ? window.location.hash.substr(1) : 'contact';
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

initView();

async function initView() {
  menuButtons.forEach(btn => {
    btn.addEventListener('click', () => onClickButton(btn));
  });

  window.addEventListener('resize', () => {
    setSourceToPage(page);
  });

  // window.addEventListener('hashchange', () => {
  //   page = window.location.hash.substr(1);
  // });
  // contentContainer.querySelector(`.${page}-page`).removeAttribute('hidden');
  await showOpenningAnimation(page);
  await pageTransition(null, page);
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

function setTimeoutAsync(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function wait(seconds) {
  return setTimeoutAsync(seconds * 1000);
}

async function onClickButton(btn) {
  page = btn.getAttribute('data-page');
  moveToPage(page);
}

async function pageTransition(lastPage, page) {
  if (lastPage) {
    await hidePage(lastPage);
  }
  await showPage(page);
}

async function hidePage(page) {
  const pageElement = contentContainer.querySelector(`.${page}-page`);
  pageElement.classList.add('outside');
  await wait(1);
  pageElement.setAttribute('hidden', 'hidden');
}

async function showPage(page) {
  const pageElement = contentContainer.querySelector(`.${page}-page`);
  pageElement.removeAttribute('hidden');
  await wait(1);
  pageElement.classList.remove('outside');
}

async function showOpenningAnimation(page) {
  setSourceToPage(page);
  // when content is hidden - start moving the spotlight
  spotlightContainer.classList.add('animation');

  // when spotlight is in place start showing the content
  await wait(2);
  contentContainer.classList.remove('hide');
  await wait(1);
  // when spotlight is finished - hide it
  spotlightContainer.classList.add('hide');
}

async function moveToPage(page) {
  const lastPage = window.location.hash.substr(1);
  window.location.hash = page;
  await pageTransition(lastPage, page);
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
