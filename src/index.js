import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './get-images';
import { renderGallery } from './render-gallery';

const lightbox = new SimpleLightbox('.gallery a',
        {
            captionDelay: 250,
            captionsData: "alt",
        });


const searchForm = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.setAttribute('hidden', true);

let pageGroupNumber = 1;
let perPage = 40;
let search = '';
let totalPages = 0;

searchForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    search = data.get('searchQuery').trim();

    if (!search) {
        return;
    }

    pageGroupNumber = 1;
    clearGallery();
    hideLoadBtn();
    searchForm.reset(); 
    addPageGroup();

};
    
    async function addPageGroup() {
    
        try {
        const data = await getImages(search, pageGroupNumber);
        const { totalHits, hits } = data;
        totalPages = Math.ceil(totalHits / perPage)
            
        galleryList.insertAdjacentHTML('beforeend', renderGallery(hits));   

        if (totalHits === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            hideLoadBtn();

            return;

            }  if (pageGroupNumber === 1) {
                Notify.success(`Hooray! We found ${totalHits} images.`); 
                
        }     if (pageGroupNumber < totalPages) {
            showLoadBtn();
            onScroll();

            } else {
            hideLoadBtn();
            Notify.failure("We're sorry, but you've reached the end of search results.");
            }
        
        lightbox.refresh(); 
           
    } 
    
    catch (error) {
        console.log(error.message);
    }
};    

loadMoreBtn.addEventListener('click', onloadMoreBtn);
function onloadMoreBtn() {

    pageGroupNumber += 1;
    addPageGroup();
    onScroll();
}   

function onScroll() {
    if (pageGroupNumber <= 1) {
        return;
    }
    const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}

function clearGallery() {   
    galleryList.innerHTML = ''; 
}

function showLoadBtn() { 
    loadMoreBtn.removeAttribute('hidden')
};

function hideLoadBtn() {
   loadMoreBtn.setAttribute('hidden', true); 
}
