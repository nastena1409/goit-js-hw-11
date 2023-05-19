import axios from 'axios';

async function getImages(searchQuery, pageGroupNumber) {

    const BASE_URL = 'https://pixabay.com/api/'; 
    const API_KEY = '36448026-c154cc2c27941767e61d80325';
    
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: pageGroupNumber,
        per_page: 3,
    });
    const { data } = await axios.get(`${BASE_URL}?${searchParams}`);
    
    return data;
}
        
       
export { getImages };

