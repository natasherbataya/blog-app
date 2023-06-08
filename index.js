const posts = [];

const SYMBOL_TITLE_CLASSNAME = "symbol-title-red";
const SYMBOL_TEXT_CLASSNAME = "symbol-text-red";
const TITLE_EMPTY_MESSAGE = 'Введите заголовок';
const TEXT_EMPTY_MESSAGE = 'Введите текст';
const SYMBOL_TITLE_MESSAGE = 'Вы ввели более 100 символов';
const SYMBOL_TEXT_MESSAGE = 'Вы ввели более 200 символов';
const MAX_SYMBOL_TITLE = 100;
const MAX_SYMBOL_TEXT = 200;



const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts');
const outputSymbolTitleNode = document.querySelector('.js-output-symbol-title');
const outputSymbolTextNode = document.querySelector('.js-output-symbol-text');


newPostBtnNode.addEventListener('click', function () {
  const postFromUser = getPostFromUser();

  if (!postTitleInputNode.value) {
    outputSymbolTitleNode.classList.add(SYMBOL_TITLE_CLASSNAME);
    return outputSymbolTitleNode.innerText = TITLE_EMPTY_MESSAGE;
  };

  if (!postTextInputNode.value) {
    outputSymbolTextNode.classList.add(SYMBOL_TEXT_CLASSNAME);
    return outputSymbolTextNode.innerText = TEXT_EMPTY_MESSAGE;
  };

  addPost(postFromUser);

  renderPosts();

  clearInput();

});

postTitleInputNode.addEventListener('input', function () {
  validationGetTitleFromUser();
  validationDisabledButton();
});

postTextInputNode.addEventListener('input', function () {
  validationGetTextFromUser();
  validationDisabledButton();
});


function validationDisabledButton() {

  ((postTitleInputNode.value.length > MAX_SYMBOL_TITLE) || (postTextInputNode.value.length > MAX_SYMBOL_TEXT))
    ? newPostBtnNode.setAttribute('disabled', 'disabled')
    : newPostBtnNode.removeAttribute('disabled');
};


function validationGetTitleFromUser() {

  const titleLength = postTitleInputNode.value.length;
  outputSymbolTitleNode.innerText = `${MAX_SYMBOL_TITLE - titleLength} / ${MAX_SYMBOL_TITLE}`;

  if (titleLength === 0) {
    outputSymbolTitleNode.innerText = ``;

  };

  if (titleLength > MAX_SYMBOL_TITLE) {

    outputSymbolTitleNode.innerHTML = SYMBOL_TITLE_MESSAGE;
    outputSymbolTitleNode.classList.add(SYMBOL_TITLE_CLASSNAME);

  } else {
    outputSymbolTitleNode.classList.remove(SYMBOL_TITLE_CLASSNAME);
  };
};


function validationGetTextFromUser() {

  const textLength = postTextInputNode.value.length;
  outputSymbolTextNode.innerHTML = `${MAX_SYMBOL_TEXT - textLength} / ${MAX_SYMBOL_TEXT}`;

  if (textLength === 0) {
    outputSymbolTextNode.innerText = ``;
  }

  if (textLength > MAX_SYMBOL_TEXT) {

    outputSymbolTextNode.innerHTML = SYMBOL_TEXT_MESSAGE;
    outputSymbolTextNode.classList.add(SYMBOL_TEXT_CLASSNAME);

  } else {
    outputSymbolTextNode.classList.remove(SYMBOL_TEXT_CLASSNAME);
  };
};


function addZero(value) {
  if (value < 10) {
    value = '0' + value;
  }

  return value;
};

function publicationDate() {
  const currentDate = new Date();

  const day = addZero(currentDate.getDate());
  const month = addZero(currentDate.getMonth() + 1);
  const year = currentDate.getFullYear();
  const hour = addZero(currentDate.getHours());
  const min = addZero(currentDate.getMinutes());

  return `${day}.${month}.${year} ${hour}:${min}`;

};

function getPostFromUser() {
  const title = postTitleInputNode.value;
  const text = postTextInputNode.value;
  const date = publicationDate();

  return {
    title: title,
    text: text,
    date: date
  };
};

function addPost({ title, text, date }) {
  posts.push({
    title: title,
    text: text,
    date: date

  });

};


function getPosts() {
  return posts;
};


function renderPosts() {
  const posts = getPosts();

  let postsHTML = '';

  posts.forEach(post => {
    postsHTML += `
    <div class='post'>
         <p class='date__text'>${post.date}</p>
         <p class='post__title'>${post.title}</p>
         <p class='post__text'>${post.text}</P>
    </div>    
     `;

  });

  postsNode.innerHTML = postsHTML;
};

function clearInput() {
  postTitleInputNode.value = '';
  postTextInputNode.value = '';
  outputSymbolTitleNode.value = '';
  outputSymbolTextNode.value = '';
};













