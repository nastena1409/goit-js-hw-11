function renderGallery(gallery) {
    return gallery
        .map(
            ({
                webformatURL,
                largeImageURL,
                tags,
                likes,
                views,
                comments,
                downloads
            }) => {
                return `
        <div class="photo-card">
            <a class="gallery__link" href="${largeImageURL}">
                <img class="gallery-image"
                    src="${webformatURL}" 
                    alt="${tags}" 
                    loading="lazy" />
            </a>  
            <div class="info">
                <p class="info-item"><b>Likes</b>${likes}</p>
                <p class="info-item"><b>Views</b>${views}</p>
                <p class="info-item"><b>Comments</b>${comments}</p>
                <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
        </div>`}).join("");
    
}  
  
export { renderGallery };





//webformatURL - посилання на маленьке зображення для списку карток.
//largeImageURL - посилання на велике зображення.
//tags - рядок з описом зображення. Підійде для атрибуту alt.
//likes - кількість лайків.
//views - кількість переглядів.
//comments - кількість коментарів.
//downloads - кількість завантажень.    