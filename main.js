const contentWrappers = document.querySelectorAll(".card-content-wrapper");
const submitButtons = document.querySelectorAll(".card-submit");
const filterButtons = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");
const cardInputs = document.querySelectorAll(".card-input");
const all = document.querySelectorAll("*");

function handleSubmitClick() {
  const card = getCard(this);
  const contentWrapper = getCardContentWrapper(this);
  const title = getCardTitle(card);
  const question = getCardQuestion(card);
  const userAnswer = getCardUserAnswer(card);
  const actualAnswer = getCardActualAnswer(card);

  contentWrapper.remove();
  card.innerHTML = displayFeedbackCard(
    title,
    question,
    userAnswer,
    actualAnswer
  );
  let feedbackButtons = document.querySelectorAll(".feedback-button");

  function handleFeedback() {
    let colour = "";
    switch (this.innerText) {
      case "Got it!":
        colour = "green-fill";
        break;
      case "Nearly":
        colour = "amber-fill";
        break;
      case "WTF?":
        colour = "red-fill";
        break;
    }
    let html = `
        <div class="card-content-wrapper">
            <div class="card-header">
                <h2 class="card-title">${title}</h2>
                <button class="feedback-label ${colour}">${this.innerText}</button>
            </div>
            <p class="card-question">
                ${question}
            </p>
            <div class="card-correct-answer">
                ${actualAnswer}
            </div>
            </div>
        `;
    card.innerHTML = html;
  }
  feedbackButtons.forEach((button) =>
    button.addEventListener("click", handleFeedback)
  );
}

const displayFeedbackCard = (title, question, userAnswer, actualAnswer) => {
  return `
    <div class="card-content-wrapper">
        <div class="card-header" style="display:none">
            <h2 class="card-title">${title}</h2>
        </div>
          <p class="card-question back">
            ${question}
          </p>
          <p class="card-correct-answer">
            ${actualAnswer}
          </p>
          <p class="card-user-answer">
            ${userAnswer}
          </p>
          <div class="card-footer">
            <div class="card-feedback">How'd you do?</div>
            <button class="feedback-button green">Got it!</button>
            <button class="feedback-button amber">Nearly</button>
            <button class="feedback-button red">WTF?</button>
          </div>
        </div>
    `;
};

// Get card from the button on the card
const getCard = (button) => {
  return button.parentElement.parentElement.parentElement;
};

// Get card content wrapper from the button on the card
const getCardContentWrapper = (button) => {
  return button.parentElement.parentElement;
};

// Get card title from the card
const getCardTitle = (card) => {
  return card.children[0].children[0].children[0].innerHTML;
};

// Get card question from the card
const getCardQuestion = (card) => {
  return card.children[0].children[1].innerText;
};

// Get card user answer from the card
const getCardUserAnswer = (card) => {
  return card.children[0].children[2].value;
};

// Get card actual answer from the card
const getCardActualAnswer = (card) => {
  return card.children[0].children[3].innerText;
};

let count = 0;

function handleFilter() {
  this.classList.toggle("active");

  if (count === 0) {
    cards.forEach((card) => card.classList.add("hidden"));
  }

  cards.forEach((card) => {
    if (getCardTitle(card) === this.innerText) {
      card.classList.toggle("hidden");
    }
  });

  let isOneFilterActive = false;

  filterButtons.forEach((button) => {
    if (button.classList.contains("active")) {
      isOneFilterActive = true;
    }
  });

  if (!isOneFilterActive) {
    cards.forEach((card) => card.classList.remove("hidden"));
    count = -1;
  }

  count++;
}

function highlightInput(event) {
  console.log(this.value === '');
  if (this.value !== '') {
    this.classList.add('active');
  } else {
    this.classList.remove('active');
  }
}

submitButtons.forEach((button) =>
  button.addEventListener("click", handleSubmitClick)
);

filterButtons.forEach((button) =>
  button.addEventListener("click", handleFilter)
);

cardInputs.forEach(input => input.addEventListener('keyup', highlightInput))
