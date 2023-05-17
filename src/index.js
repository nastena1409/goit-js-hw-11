import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { getImages } from './get-images';
import { renderGalleryItem } from './render-gallery-item';



const searchForm = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let pageGroupNumber = 1;
const PER_PAGE = 40;
const totaPages = 500 / PER_PAGE;


searchForm.addEventListener('submit', onSubmit);
hideLoadMoreBtn();

function onSubmit(e) {
    e.preventDefault();
    //console.dir(e.currentTarget);
    //clearGallery();
    const data = new FormData(e.currentTarget)
    const searchQuery = data.get('searchQuery').trim()
    console.log(searchQuery)

    
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