import axios from 'axios';

async function getImages(searchQuery) {

    const BASE_URL = 'https://pixabay.com/api/'; 
    const API_KEY = '36448026-c154cc2c27941767e61d80325';
    const PER_PAGE = 40;
    let pageGroupNumber = 1;
    
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: pageGroupNumber,
        per_page: PER_PAGE,
    });
    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    const images = response.json();

    return images;
}
            
       
export { getImages };

