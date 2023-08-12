'use strict'

document.addEventListener('click', documentClick);

function documentClick(e) {
  const targetItem = e.target;

  if (targetItem.closest('.header__burger')) {
    document.documentElement.classList.toggle('menu-open');
  }
}

let searchBtn = document.querySelector('.search__btn');
let searchBox = document.querySelector('.header__search');
let searchInput = document.querySelector('.search__input');

searchBtn.addEventListener('click', () => {
  searchBox.classList.toggle('active');
  searchInput.classList.toggle('active');
})
