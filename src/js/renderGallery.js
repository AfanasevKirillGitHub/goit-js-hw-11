import { refs } from './refs';
import { lightbox } from './simpleLightbox';

export { renderGallery, clearRender };

function renderGallery(response) {
  const arrayImages = response.data.hits;
  const gallery = arrayImages
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <div class="photo-wrapper">

  <a href="${largeImageURL}" class="gallery-link">
 
  <div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery-image"/>
    <div class="info">
      <p class="info-item">Likes:<b>${likes}</b></p>
      <p class="info-item">Views:<b>${views}</b></p>
      <p class="info-item">Comments:<b>${comments}</b></p>
      <p class="info-item">Downloads:<b>${downloads}</b></p>
    </div>
  </div>
  
</a>
 </div>
          `
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', gallery);
  lightbox.refresh();
}

function clearRender() {
  refs.gallery.innerHTML = '';
  refs.loadMore.classList.add('is-hidden');
}
