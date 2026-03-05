function toggleDropdown(btn) {
    const content = btn.nextElementSibling;
    content.classList.toggle('open');
}



/*Hittar alla <img> innuti thumbnails och samlar dem i en lista */
const thumbnails = document.querySelectorAll('.thumbnails img');
const mainImage = document.querySelector('.main-image img');


/*Loopar igenom listan
addEventListener "lyssnar" på click. när man klickar så körs koden inuti {} */
thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
        mainImage.src = thumb.src; //Byter main-img

        thumbnails.forEach(t => t.classList.remove('active')); //Tar bort active från alla thumbnails
        thumb.classList.add('active'); //Lägger active på den man klickar på
    });
});