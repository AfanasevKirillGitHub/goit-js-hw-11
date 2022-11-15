import axios from 'axios';
export { getGalleryPixabay };

async function getGalleryPixabay() {
  const API_URL = 'https://pixabay.com/api/';
  const options = {
    params: {
      key: '31327545-22153141499549b09c377ad67',
      q: '',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: 1,
      per_page: 40,
    },
  };
  const response = await axios.get(API_URL, options);
  return response;
}
