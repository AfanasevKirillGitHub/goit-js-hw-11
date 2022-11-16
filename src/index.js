import { refs } from './js/refs';
import { getGalleryPixabay } from './js/getGalleryPixabay';
import { renderGallery, clearRender } from './js/renderGallery';
import { smoothScrolling } from './js/smoothScrolling';
import Notiflix, { Notify } from 'notiflix';

refs.form.addEventListener('submit', onSubmit);
refs.loadMore.addEventListener('click', onClickLoadMore);
// изначально кнопка скрыта
clearRender();

let userRequest = '';
let page = 1;

async function onSubmit(event) {
  event.preventDefault();
  clearRender();

  userRequest = event.currentTarget.elements.searchQuery.value;
  page = 1;

  if (userRequest) {
    try {
      const response = await getGalleryPixabay(userRequest, page);
      // eсли ничего не пришло (пустой массив)
      if (response.data.total === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        event.target.reset();
        return;
      }
      // отрисовываем галлерею и кол-во картинок
      renderGallery(response);
      refs.loadMore.classList.add('is-hidden');
      Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
      // снимаем класс is-hidden
      if (response.data.totalHits > 40) {
        refs.loadMore.classList.remove('is-hidden');
      }
    } catch (error) {
      console.log(error.message);
    }
  } else {
    // проверка на пустую строку
    Notiflix.Notify.warning('Please enter your request');
    clearRender();
  }
}

async function onClickLoadMore() {
  page += 1;

  try {
    const response = await getGalleryPixabay(userRequest, page);
    const totalPages = response.data.totalHits / 40;

    if (totalPages <= page) {
      // конец результатов скрыть кнопку, предупредить
      // clearRender();
      refs.loadMore.classList.add('is-hidden');
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
    // отрисовываем дальше
    renderGallery(response);
    // плавная прокрутка страницы
    smoothScrolling();
  } catch (error) {
    console.log(error);
  }
}
