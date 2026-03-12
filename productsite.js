//JS För dropdowns
function toggleDropdown(btn) { //Skapar en funktion som tar btn som argument
    const content = btn.nextElementSibling; //Ta nästa element som ligger direkt efter btn i HTML:en
    content.classList.toggle('open');
}


//JS För hjärta-symbolen
const favourite = document.querySelector("#favourite"); //Hämtar elementet med id:tt favourite
favourite.addEventListener("click", () => { //Skapar en evenetlistener som lyssnar efter klick
    favourite.classList.toggle("filled"); //Byter stylen till css klassen "filled"
});

//JS För storlek-knappar
const sizeBtns = document.querySelectorAll(".size-btn button"); //Hämta alla buttons från size-btn div
sizeBtns.forEach(size => { //För varje storlekknapp lägg till eventListener
    size.addEventListener("click", () => {

        sizeBtns.forEach(btn => { //Ta bort CSS Klassen "active" från alla knappar
            btn.classList.remove("active");
        });

        size.classList.add("active"); //Den knappen man klickar på får klassen "active" på sig
    });
});

//JS För Add To Cart-knapp
const addtoCart = document.querySelector(".buy-btn"); //Hämta addtocart-knappen
const warning = document.querySelector("#warning"); //Hämta dett tomma varnings-elementet
addtoCart.addEventListener("click", () => {

    if (document.querySelector(".size-btn button.active") === null) { //Om sizeknappen inte är active (null)
        warning.textContent = "Du måste välja en storlek först!"; //Välj en storlek först
    }

    else { //Annars blir knappen active och varnings-texten försvinner
        addtoCart.classList.add("active");
        warning.textContent = "";
    }

});


//JS För thumbnail-bilderna
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