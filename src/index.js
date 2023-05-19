import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { getImages } from './get-images';
import { renderGallery } from './render-gallery';

//let PER_PAGE = 3;
//let search = '';
//let totalPages = 0;
//let pageGroup = 1;

const searchForm = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
//console.log(galleryList)
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let perPage = 3;
//const totalPages = 0;
let search = '';

loadMoreBtn.setAttribute('hidden', true);

searchForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    search = data.get('searchQuery').trim();

    if (!search) {
        return;
    }
        clearGallery();
        searchForm.reset()
 
    try {
        const data = await getImages(search);
        console.log(data);
        const { total, totalHits, hits } = data;
        
        page = 1;
        
        if (totalHits === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            loadMoreBtn.setAttribute('hidden', true);

            return;

        } if (page === 1) {
            Notify.success(`Hooray! We found ${totalHits} images.`);
        }        
        
        galleryList.innerHTML = renderGallery(hits);
        loadMoreBtn.removeAttribute('hidden');
    }
    catch (error) {
        console.log(error.message);
    }
}    

loadMoreBtn.addEventListener('click', onloadMoreBtn);
async function onloadMoreBtn() {
       
    try {
        const data = await getImages(search);
        const { total, totalHits, hits } = data;
        console.log(total);
        page += 1;

            if (page > Math.ceil(totalHits / perPage)) {
                Notify.failure("We're sorry, but you've reached the end of search results.");
                loadMoreBtn.setAttribute('hidden', true);

                return;

            } else {
                galleryList.insertAdjacentHTML('beforeend', renderGallery(hits));
            }
        
    }
    catch (error) {
        console.log(error.message);
    }
}    
function clearGallery() {   
    galleryList.innerHTML = ''; 
}
