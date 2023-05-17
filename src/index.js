import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { getImages } from './get-images';
import { renderGalleryItem } from './render-gallery-item';



const searchForm = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let pageGroupNumber = 1;
const PER_PAGE = 20;
const totaPages = 500 / PER_PAGE;


searchForm.addEventListener('submit', onSubmit);
hideLoadMoreBtn();

async function onSubmit(e) {
    e.preventDefault();
    clearGallery();

    const data = new FormData(e.currentTarget)
    const search = data.get('searchQuery').trim()

    pageGroupNumber = 1;
    

    try {
        const data = await getImages(search);
        console.log(data)
        
        if (data.totalHits === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again."); 
            searchForm.reset();
            hideLoadMoreBtn()
            return;
        } if (pageGroupNumber === 1) {
            Notify.failure(`Hooray! We found ${data.totalHits} images.`);
            searchForm.reset();
        }
        
        galleryList.innerHTML = renderGalleryItem(data.hits);
        showLoadMoreBtn()
    }
    catch (error) {
        console.log(error.message);
    }
    
}

loadMoreBtn.addEventListener('click', onLoadBtn);

function onLoadBtn(e) {
    
}

function clearGallery() {
    galleryList.innerHTML = ''; 
}

function hideLoadMoreBtn() {
    loadMoreBtn.classList.add('is-hidden');
}

function showLoadMoreBtn() {
    loadMoreBtn.classList.remove('is-hidden');
}