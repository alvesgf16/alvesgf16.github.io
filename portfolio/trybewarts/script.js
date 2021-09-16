const loginBtn = document.querySelector('.login-button');
const email = document.getElementById('email');
const password = document.getElementById('password');
loginBtn.addEventListener('click', () => {
  if (email.value === 'tryber@teste.com' && password.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
});

function createRatingOptions() {
  const rateContainer = document.getElementById('rate-options-container');

  for (let index = 1; index <= 10; index += 1) {
    const rateDiv = document.createElement('div');
    rateDiv.className = 'form-check form-check-inline';

    const rateOption = document.createElement('input');
    rateOption.type = 'radio';
    rateOption.value = [index];
    rateOption.name = 'rate';
    rateOption.id = `option-${[index]}`;
    rateOption.className = 'form-check-input';

    const rateLabel = document.createElement('label');
    rateLabel.setAttribute('for', `option-${index}`);
    rateLabel.innerText = [index];
    rateLabel.className = 'form-check-label';

    rateDiv.appendChild(rateOption);
    rateDiv.appendChild(rateLabel);
    rateContainer.appendChild(rateDiv);
  }
}

function enableSubmitButton() {
  const agreementCheckbox = document.getElementById('agreement');
  const submitButton = document.getElementById('submit-btn');

  if (agreementCheckbox.checked) {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', true);
  }
}

function addCounter() {
  const counter = document.getElementById('counter');
  const textArea = document.getElementById('textarea');

  counter.innerText = 500;

  textArea.addEventListener('keyup', () => {
    counter.innerText = 500 - textArea.value.length;
  });
}

function getSelectedFamily() {
  const families = document.getElementsByName('family');
  let selectedFamily;

  for (let index = 0; index < families.length; index += 1) {
    if (families[index].checked) {
      selectedFamily = families[index].value;
    }
  }

  return selectedFamily;
}

function getSelectedContents() {
  const contents = document.getElementsByName('content');
  const selectedContents = [];

  for (let index = 0; index < contents.length; index += 1) {
    if (contents[index].checked) {
      selectedContents.push(contents[index].value);
    }
  }

  return selectedContents.join(', ');
}

function getUserRating() {
  const rates = document.getElementsByName('rate');
  let userRating;

  for (let index = 0; index < rates.length; index += 1) {
    if (rates[index].checked) {
      userRating = rates[index].value;
    }
  }

  return userRating;
}

function generateResults() {
  const name = document.getElementById('input-name').value;
  const lastName = document.getElementById('input-lastname').value;
  const formEmail = document.getElementById('input-email').value;
  const selectedHouse = document.getElementById('house').value;
  const selectedFamily = getSelectedFamily();
  const selectedContents = getSelectedContents();
  const userRating = getUserRating();
  const feedbackText = document.getElementById('textarea').value;

  const formResult = `Nome: ${name} ${lastName}<br>
  Email: ${formEmail}<br>
  Casa: ${selectedHouse}<br>
  Família: ${selectedFamily}<br>
  Matérias: ${selectedContents}<br>
  Avaliação: ${userRating}<br>
  Observações: ${feedbackText}`;

  return formResult;
}

function showResults() {
  const formArea = document.getElementById('evaluation-form');
  const formResults = generateResults();

  while (formArea.firstChild) {
    formArea.removeChild(formArea.firstChild);
  }

  formArea.innerHTML = formResults;
}

window.onload = () => {
  const agreementCheckbox = document.getElementById('agreement');
  const submitButton = document.getElementById('submit-btn');

  createRatingOptions();
  agreementCheckbox.addEventListener('change', enableSubmitButton);

  addCounter();

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    showResults();
  });
};
