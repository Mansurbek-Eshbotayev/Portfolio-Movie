let elList = document.querySelector(".move__card");
let elBookList = document.querySelector(".bookmark__list");
let elForm = document.querySelector(".move__search");
let elFormCange = document.querySelector(".form__cange");
let elInput = document.querySelector(".search__input");
let elSelect = document.querySelector(".form-selected");
let elSortSelect = document.querySelector(".form__sort");
let elStartInput = document.querySelector(".start__year");
let elEndInput = document.querySelector(".end__year");
let elOpenBtn = document.querySelector(".open__btn");
let elBookBtn = document.querySelector(".boock__btn");
let elBadge = document.querySelector(".count__bage");
let fragment = new DocumentFragment();
let elBtn = document.querySelector(".form__btn");
let elTemplate = document.querySelector(".card__template").content;

let moves = fullMovies.slice(5, 101);
let midkeMoves = fullMovies.slice(5, 1001);

const bookmarkArr = JSON.parse(window.localStorage.getItem("data")) || [];

const createList = (bek) => {
  for (var move of bek) {
    var cloneTemplate = elTemplate.cloneNode(true);
    cloneTemplate.querySelector(".move__item");
    cloneTemplate.querySelector(
      ".card__img"
    ).src = `http://i3.ytimg.com/vi/${move.youtubeId}/mqdefault.jpg`;

    cloneTemplate.querySelector(".card-title").textContent = move.title;
    cloneTemplate.querySelector(".star").textContent = move.imdbRating;
    cloneTemplate.querySelector(".stars__data").textContent = move.year;
    cloneTemplate.querySelector(".stars__time").textContent = dataTime(
      move.runtime
    );

    cloneTemplate.querySelector(".boock__btn").dataset.id = move.youtubeId;

    cloneTemplate.querySelector(".card__text").textContent = move.categories;
    cloneTemplate.querySelector(".card__text").dataset.id = move.imdbId;
    cloneTemplate.querySelector(".card__btn").dataset.id = move.imdbId;
    fragment.appendChild(cloneTemplate);
  }

  elList.appendChild(fragment);
};

function dataTime(data) {
  return `${Math.floor(data / 60)} hr ${data % 60} min`;
}

const optionVal = [];
fullMovies.forEach((film) => {
  var generMoves = film.categories;

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

function showSearchMovies(items) {
  return fullMovies.filter((movie) => {
    const meetsCriteria =
      movie.title.match(items) &&
      (elSelect.value === "All" || movie.categories.includes(elSelect.value)) &&
      (elStartInput.value.trim() === "" ||
        movie.year >= Number(elStartInput.value)) &&
      (elEndInput.value.trim() === "" ||
        movie.year <= Number(elEndInput.value));

    // console.log(meetsCriteria);
    return meetsCriteria;
  });
}

function sortMuvieSelect (sortArr,sortType){
  if(sortType === "a-z"){
    sortArr.sort((a,b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
  }else if(sortType === "z-a"){
    sortArr.sort((a,b) => b.title.charCodeAt(0) - a.title.charCodeAt(0))
  }else if(sortType === "r-high"){
    sortArr.sort((a,b) => a.imdbRating - b.imdbRating)
  }else if(sortType === "r-low"){
    sortArr.sort(function(a,b){
      return b.imdbRating - a.imdbRating
    })
  }else if(sortType === "year-old"){
    sortArr.sort((a,b) => a.year - b.year)
  }
  else if(sortType === "year-new"){
    sortArr.sort((a,b) => b.year - a.year)
  }
}

elFormCange.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const searchElem = new RegExp(elInput.value.trim(), "gi");
  
  const searchMovieFilteredList = showSearchMovies(searchElem)

  //  if (searchMovieFilteredList.length > 0 ) {
  //    createList(searchMovieFilteredList);
  //  } else {
  //   //  createList(elOption);
  //   alert("Not found !")
  //  }

  elList.innerHTML = "";
  sortMuvieSelect (searchMovieFilteredList,elSortSelect.value)
  createList(searchMovieFilteredList);
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
    let itemFind = fullMovies.find((obj) => obj.imdbId == btnId);
    elSTitle.textContent = itemFind.title;
    elStar.textContent = itemFind.imdbRating;
    elData.textContent = itemFind.year;
    elTime.textContent = dataTime(itemFind.runtime);
    elCotegory.textContent = itemFind.categories;
    elCradText.textContent = itemFind.summary;
    elIframe.src = `https://www.youtube.com/embed/${itemFind.youtubeId}`;
    mdLink.href = `https://www.imdb.com/title/${itemFind.imdbId}`;
  }
});

elModalContent.addEventListener("hidden.bs.modal", function () {
  elIframe.src = "";
});

// Bookmark listining ochilish va yopilish funcksiyasi
elOpenBtn.addEventListener("click", function () {
  elBookList.classList.toggle("bookmark__list--on");
});

function bookMarkFunction(arr, element) {
  element.innerHTML = "";
  arr.forEach((item) => {
    let bookItem = document.createElement("li");
    elBadge.textContent = bookmarkArr.length;
    let bookCard = `
      <div class="book__Card">
      <h2 class="book__ittle">
      ${item.title}
      </h2>
      <button class="del__btn" dataset-id=${item.youtubeId}>Del</button>
      </div>
      `;
    bookItem.innerHTML = bookCard;
    element.appendChild(bookItem);
  });
}

bookMarkFunction(bookmarkArr, elBookList);

elList.addEventListener("click", function (evt) {
  if (evt.target.matches(".boock__btn")) {
    let bookmarkId = evt.target.dataset.id;
    let itemId = fullMovies.find((item) => item.youtubeId == bookmarkId);
    
    if (!bookmarkArr.includes(itemId)) {
      bookmarkArr.push(itemId);
      evt.target.classList.add("dark")
      bookMarkFunction(bookmarkArr, elBookList);
      elBadge.textContent = bookmarkArr.length;
      // console.log(bookMarkFunction(bookmarkArr , elBookList));
    }else{
      evt.target.classList.remove("dark")
    }

    window.localStorage.setItem("data", JSON.stringify(bookmarkArr));
  }
});

elBookList.addEventListener("click", function (evt) {
  if (evt.target.matches(".del__btn")) {
    // let deletBtn = evt.target.matches(".del__btn").dataset.id = fullMovies.youtubeId
    // deletBtn.setAttribute("class", "background-color: #1a1111;")
    
    let delId = evt.target.getAttribute("dataset-id");
    let divFind = bookmarkArr.findIndex((item) => item.youtubeId == delId);
    bookmarkArr.splice(divFind, 1);
    elBadge.textContent = bookmarkArr.length;
    window.localStorage.setItem("data", JSON.stringify(bookmarkArr));
    bookMarkFunction(bookmarkArr, elBookList);
    evt.target.classList.remove("dark")
    
    console.log(deletBtn);
  }
});
