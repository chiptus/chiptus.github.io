import { setTimeoutAsync, fetchHtmlAsText } from './utils.js';

// const itemIds = ['multiSearch'];

const itemsById = {
  multiSearch: {
    id: 'multiSearch',
    title: 'Multi Search',
    content: fetchHtmlAsText('./gallery/multi-search.html'),
    imageURL:
      'https://images.unsplash.com/photo-1488610675821-b5776c22e019?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  },
  tezos: {
    id: 'tezos',
    title: 'TezosIL Bakery website',
    content: fetchHtmlAsText('./gallery/tezos.html'),
    imageURL: './gallery/tezos-logo.png',
  },
};

let modal;

export function initGallery() {
  const gallery = document.querySelector('.gallery');
  const galleryItems = gallery.querySelectorAll('.gallery-item');
  modal = BuildModal('.gallery .modal');
  galleryItems.forEach(item => setOnclick(item));
}

function setOnclick(element) {
  element.addEventListener('click', async () => {
    if (!element.dataset.item || !itemsById[element.dataset.item]) {
      return;
    }
    const item = itemsById[element.dataset.item];
    item.content = await item.content;
    modal.open(item);
  });
}

function BuildModal(selector) {
  const modalElement = document.querySelector(selector);
  const modalHeader = modalElement.querySelector('.modal-header');
  const modalTitle = modalHeader.querySelector('.modal-title');
  const modalContent = modalElement.querySelector('.item-description');
  const image = modalElement.querySelector('.item-image img');
  const modalCloseBtn = modalElement.querySelector('.modal-close-btn');

  modalCloseBtn.addEventListener('click', () => close());

  modalElement.hidden = true;
  return {
    open,
    close,
  };

  async function open({ title, content, imageURL }) {
    modalElement.hidden = false;
    await setTimeoutAsync();
    modalElement.classList.add('open');

    modalTitle.innerHTML = title;
    modalContent.innerHTML = content;
    image.src = imageURL;
  }

  function close() {
    modalElement.hidden = true;
    modalElement.classList.remove('open');
  }
}
