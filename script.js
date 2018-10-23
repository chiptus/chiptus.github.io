const spotlightContainer = document.querySelector('.spotlight');
const contentContainer = document.querySelector('.content');
const menuButtons = document.querySelectorAll('.menu ul li');
const pages = ['about', 'projects', 'contact'];
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

  window.addEventListener('hashchange', () => {
    page = window.location.hash.substr(1);
    setSourceToPage(page);
    pages.filter(p => p !== page).forEach(p => {
      contentContainer
        .querySelector(`.${p}-page`)
        .setAttribute('hidden', 'true');
    });
    contentContainer.querySelector(`.${page}-page`).removeAttribute('hidden');
  });
  contentContainer.querySelector(`.${page}-page`).removeAttribute('hidden');
  setSourceToPage(page);
  await wait(3);

  // show content TODO
  contentContainer.classList.remove('hide');
  await wait(2);
  spotlightContainer.classList.add('hide');
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
  // hide content and start showing the spotlight (in its initial place)

  // hide content
  contentContainer.classList.add('hide');
  // change page hash
  page = btn.getAttribute('data-page');
  window.location.hash = page;
  await wait(1);
  // move spot light to inital position
  spotlightContainer.classList.remove('animation');
  // show spotlight
  spotlightContainer.classList.remove('hide');
  await wait(2);

  // when content is hidden - start moving the spotlight
  spotlightContainer.classList.add('animation');

  // when spotlight is in place start showing the content
  await wait(2);
  contentContainer.classList.remove('hide');
  await wait(1);
  // when spotlight is finished - hide it
  spotlightContainer.classList.add('hide');
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

const formElement = document.querySelector('.contact-page form');
const submitButton = formElement.querySelector('.submit-button');
const nameInput = formElement.querySelector('#name-input');
const emailInput = formElement.querySelector('#email-input');
const phoneInput = formElement.querySelector('#phone-input');
const commentsInput = formElement.querySelector('#comments-input');

submitButton.addEventListener('click', async e => {
  e.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;
  const comments = commentsInput.value;
  if (!name) {
    alert('name is required');
  }
  if (!email) {
    alert('email is required');
  }

  await fetch(
    'https://script.google.com/macros/s/AKfycbwAsOEjtJcp8HNtdgMD3QIfGrZjVfB_ME0JMFMDb9YrusxGDCo/exec',
    {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        phone,
        comments,
      }),
    }
  );

  alert('Thank you');
  nameInput.value = '';
  emailInput.value = '';
  phoneInput.value = '';
  commentsInput.value = '';
});
