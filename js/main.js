let elList = document.querySelector(".move__card");
let fragment = new DocumentFragment();
let elTemplate = document.querySelector(".card__template").content;

let moves = movies.slice(5, 101);

function dataTime(data) {
  return `${Math.floor(data / 60)} hr ${data % 60} min`;
}

for (var move of moves) {
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
  cloneTemplate.querySelector(".card__btn").dataset.id = move.imdb_id;
  fragment.appendChild(cloneTemplate);
}
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
