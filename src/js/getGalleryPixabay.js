import axios from 'axios';
export { getGalleryPixabay };

async function getGalleryPixabay(query, page) {
  const API_URL = 'https://pixabay.com/api/';
  const options = {
    params: {
      key: '31327545-22153141499549b09c377ad67',
      q: `${query}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: `${page}`,
      per_page: 40,
    },
  };
  return axios.get(API_URL, options);
}
