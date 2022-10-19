let elList = document.querySelector(".move__card");
let elForm = document.querySelector(".move__search");
let elFormCange = document.querySelector(".form__cange");
let elInput = document.querySelector(".search__input");
let elSelect = document.querySelector(".form__select");
let fragment = new DocumentFragment();
let elTemplate = document.querySelector(".card__template").content;

let moves = movies.slice(5, 101);
let midkeMoves = movies.slice(5, 1001);

const createList = (bek) => {
  for (var move of bek) {
    var cloneTemplate = elTemplate.cloneNode(true);
    cloneTemplate.querySelector(".move__item");
    cloneTemplate.querySelector(
      ".card__img"
    ).src = `http://i3.ytimg.com/vi/${move.ytid}/mqdefault.jpg`;

    cloneTemplate.querySelector(".card-title").textContent = move.Title;
    cloneTemplate.querySelector(".star").textContent = move.imdb_rating;
    cloneTemplate.querySelector(".stars__data").textContent = move.movie_year;
    cloneTemplate.querySelector(".stars__time").textContent = dataTime(
      move.runtime
    );

    cloneTemplate.querySelector(".card__text").textContent = move.Categories;
    cloneTemplate.querySelector(".card__text").dataset.id = move.imdb_id;
    cloneTemplate.querySelector(".card__btn").dataset.id = move.imdb_id;
    fragment.appendChild(cloneTemplate);
  }
  elList.appendChild(fragment);
};

function dataTime(data) {
  return `${Math.floor(data / 60)} hr ${data % 60} min`;
}

const optionVal = [];
moves.forEach((film) => {
  var generMoves = film.Categories.split("|");

  generMoves.forEach((result) => {
    if (!optionVal.includes(result)) {
      optionVal.push(result);
    }
  });
  optionVal.sort();
});

let newSelectFragment = document.createDocumentFragment();
optionVal.forEach((option) => {
  var newOption = document.createElement("option");
  newOption.textContent = option;
  newOption.value = option;
  newOption.classList.add("form__option");
  newSelectFragment.appendChild(newOption);
});
elSelect.appendChild(newSelectFragment);

elForm.addEventListener("keyup", function (evt) {
  evt.preventDefault();

  // let inputVal = evt.target.value.toLowerCase();
  // let inputVal = elInput.value.trim();
  const searchElem = new RegExp(elInput.value.trim(), "gi");
  let filterName = moves.filter((item) => {
    return String(item.Title).toLowerCase().match(searchElem);
  });

  // console.log(filterName);

  elList.innerHTML = "";

  createList(filterName);

  elList.appendChild(fragment);
});

createList(moves);
elList.appendChild(fragment);

// Modal
let elModalContent = document.querySelector(".modal");
let elSTitle = document.querySelector(".card__title");
let elStar = document.querySelector(".star__mod");
let elData = document.querySelector(".data__mod");
let elTime = document.querySelector(".time__mod");
let elCotegory = document.querySelector(".card__category");
let elCradText = document.querySelector(".card__tect");
let elIframe = document.querySelector(".ifram__card");

let mdLink = document.querySelector(".mdlink");

elList.addEventListener("click", function (evt) {
  if (evt.target.matches(".card__btn")) {
    let btnId = evt.target.dataset.id;
    let itemFind = moves.find((obj) => obj.imdb_id == btnId);
    elSTitle.textContent = itemFind.Title;
    elStar.textContent = itemFind.imdb_rating;
    elData.textContent = itemFind.movie_year;
    elTime.textContent = dataTime(itemFind.runtime);
    elCotegory.textContent = itemFind.Categories;
    elCradText.textContent = itemFind.summary;
    elIframe.src = `https://www.youtube.com/embed/${itemFind.ytid}`;

    mdLink.href = `https://www.imdb.com/title/${itemFind.imdb_id}`;
  }
});

elModalContent.addEventListener("hidden.bs.modal", function () {
  elIframe.src = "";
});

elFormCange.addEventListener("change", function (evt) {
  elList.innerHTML = "";
  let elOption = midkeMoves.filter((item) => item.Categories == evt.target.value);
  console.log(elOption);
  console.log(elSelect.value);
  if (elSelect.value == "All") {
    createList(midkeMoves);
  } else {
    createList(elOption);
  }
});
