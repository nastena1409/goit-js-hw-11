import axios from 'axios';

async function getImages(searchQuery) {

    const BASE_URL = 'https://pixabay.com/api/'; 
    const API_KEY = '36448026-c154cc2c27941767e61d80325';
    //const PER_PAGE = 3;
    //let pageGroup = 3;
    
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: 1,
        per_page: 3,
    });
    const { data } = await axios.get(`${BASE_URL}?${searchParams}`);
    
    return data;
}
        
       
export { getImages };

