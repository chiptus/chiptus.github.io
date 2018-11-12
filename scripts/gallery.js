let modal;
export function initGallery() {
  const gallery = document.querySelector('.gallery');
  const galleryItems = gallery.querySelectorAll('.gallery-item');
  modal = BuildModal('.gallery .modal');
  galleryItems.forEach(item => setOnclick(item));
}

function setOnclick(item) {
  item.addEventListener('click', () => {
    modal.open('asdsd');
  });
}

function BuildModal(selector) {
  const modalElement = document.querySelector(selector);
  modalElement.hidden = true;
  return {
    open,
    close,
  };

  function open(text) {
    modalElement.hidden = false;
    modalElement.classList.add('open');
    modalElement.innerHTML = text;
  }

  function close() {
    modalElement.hidden = true;
    modalElement.classList.remove('open');
  }
}
