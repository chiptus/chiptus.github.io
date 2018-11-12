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
