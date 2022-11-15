import { getGalleryPixabay } from './js/getGalleryPixabay';

const refs = {
  form: document.querySelector('#search-form'),
};
refs.form.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  event.preventDefault();
  const response = await getGalleryPixabay();
  console.log(response);

  // const searchGallery = (gallery.config.params.q =
  //   event.target.elements.searchQuery.value);
  // console.log(gallery.config.params);
}
// getGalleryPixabay();
