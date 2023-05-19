import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getImages } from './get-images';
import { renderGallery } from './render-gallery';


const searchForm = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery');
//console.log(galleryList)
const loadMoreBtn = document.querySelector('.load-more');

let pageGroupNumber = 1;
let perPage = 40;
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
        const data = await getImages(search, pageGroupNumber);
        console.log(data);
        const { total, totalHits, hits } = data;

        pageGroupNumber += 1;
        
        if (totalHits === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            loadMoreBtn.setAttribute('hidden', true);

            return;

        } if (pageGroupNumber >= 1) {
            Notify.success(`Hooray! We found ${totalHits} images.`);
        }        
        
        galleryList.innerHTML = renderGallery(hits);
        loadMoreBtn.removeAttribute('hidden');

        
    }
    catch (error) {
        console.log(error.message);
    }
};

loadMoreBtn.addEventListener('click', onloadMoreBtn);
async function onloadMoreBtn() {
   
    try {
        const data = await getImages(search, pageGroupNumber);
        const { total, totalHits, hits } = data;
        //console.log(total);

            if (pageGroupNumber > Math.ceil(totalHits / perPage)) {
                Notify.failure("We're sorry, but you've reached the end of search results.");
                loadMoreBtn.setAttribute('hidden', true);

                return;
            } else { 
                galleryList.insertAdjacentHTML('beforeend', renderGallery(hits));
            }
        pageGroupNumber += 1;
    }
    catch (error) {
        console.log(error.message);
    }
}    
function clearGallery() {   
    galleryList.innerHTML = ''; 
}
