document.addEventListener("DOMContentLoaded", () => {
  // ===== Hämta element =====
  const navLinks = document.querySelectorAll("header nav a");
  const searchIcon = document.querySelector(".search-icon");
  const searchDropdown = document.querySelector(".search-dropdown");
  const searchInput = document.querySelector(".search-input");
  const favoritesCount = document.querySelector(".favorites-count");
  const favoriteButtons = document.querySelectorAll(".favorite-btn");

  // Sektioner
  const womensSection = document.querySelector(".womenshoes");
  const mensSection = document.querySelector(".menshoes");
  const newArrivalsSection = document.querySelector(".newarrivals");
  const footer = document.querySelector("footer");

  // ===== Dropdown sökfält =====
  function openSearch() {
    searchDropdown.hidden = false; // Gör sökrutan synlig
    searchInput.focus();           // placerar markören direkt i inputfältet när dropdownen öppnas
  }

  function closeSearch() {
    searchDropdown.hidden = true;  // gömmer dropdownen
    searchInput.value = "";        // rensar texten i sökfältet
  }

  function switchSearch() {       // om sökrutan är gömd → öppna den, annars → stäng den

    if (searchDropdown.hidden) openSearch();
    else closeSearch();
  }

  searchIcon.addEventListener("click", (e) => {
    e.preventDefault();                 // stoppar eventuell standardfunktion
    e.stopPropagation();               // hindrar klicket från att bubbla vidare upp i DOM
    switchSearch();                    // öppnar eller stänger sökfältet
  });

  document.addEventListener("click", (e) => {                         // När användaren klickar någonstans på sidan
    const clickedInsideSearch = e.target.closest(".search-wrap");    // kontrollerar om klicket sker inne i sökområdet
    if (!clickedInsideSearch) closeSearch();                        // Om klicket inte skedde inne i sökområdet, stängs sökrutan
  });

searchInput.addEventListener("keydown", function (event) {

  if (event.key === "Enter") {

    const value = searchInput.value.toLowerCase().trim();

    if (value.includes("shoe")) {
      window.location.href = "search-page.html";
    }

  }

});

  // ===== Menylänkar =====
  function scrollToElement(el) {
    if (!el) return;                                              // Om det är fel element, gör inget
    el.scrollIntoView({ behavior: "smooth", block: "start" });   // En DOM-metod som scrollar sidan så att det angivna elementet kommer i vy.
  }

  navLinks.forEach((link) => {                                  // Loopar igenom alla navigationslänkar
    link.addEventListener("click", (e) => {                    // När en länk klickas, kör denna funktion
      e.preventDefault();
      const label = link.textContent.trim().toUpperCase();    // Läs texten i länken och gör den lätt att jämföra

      if (label === "MEN") scrollToElement(mensSection);
      else if (label === "WOMEN") scrollToElement(womensSection);
      else if (label === "KIDS") scrollToElement(newArrivalsSection);
      else if (label === "ABOUT US") scrollToElement(footer);
    });
  });

  // ===== Favoriter =====
  function getFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];      // Hämtar favoriter från localStorage, eller returnerar en tom array om det inte finns några
    return [...new Set(favorites)];                                            // returnera favoriter utan dubletter
  }

  function saveFavorites(favorites) {                                            // Sparar favoriter från localStorage
    localStorage.setItem("favorites", JSON.stringify([...new Set(favorites)]));  // sparar favoriter utan dubletter
  }          

// ===== Uppdaterar antal hjärtan =====
  function updateFavoritesCount() {                                         // uppdaterar siffran vid hjärtikonen
    const favorites = getFavorites();                                       // Hämtar favoritlistan

    if (!favoritesCount) return;                                          // Om elementet för favoritantal inte finns, gör inget

    if (favorites.length === 0) {                                        // Kollar om favoritlistan är tom
      favoritesCount.style.display = "none";                            // Om den är tom, göm favoritantalet
      favoritesCount.textContent = "";                                  // Tar bort texten i räknaren
    } else {
      favoritesCount.style.display = "flex";                           // Om det finns favoriter, visa räknaren
      favoritesCount.textContent = favorites.length;                   // Visa antal favoriter
    }
  }

// ===== Visar rätt status av antal hjärtan =====
  function syncFavoriteIcons() {                                 // ser till att hjärtikonerna visar rätt status
    const favorites = getFavorites();                            // Hämtar favoritlistan

    favoriteButtons.forEach((button) => {                       // Loopar igenom alla favoritknappar
      const shoeItem = button.closest(".shoe-item");            // Hittar produktkortet som knappen ligger i
      if (!shoeItem) return;                                   // Om inget produktkort hittas - gör inget
      const productId = shoeItem.dataset.id;                   // Hämtar produktens id
      if (!productId) return;

      if (favorites.includes(productId)) {                          // Kollar om produkten finns i favoritlistan
        button.innerHTML = `<i class="fa-solid fa-heart"></i>`;    // Om den finns, visa ett fyllt hjärta
      } else {
        button.innerHTML = `<i class="fa-regular fa-heart"></i>`; // Om den inte finns, visa ett tomt hjärta
      }
    });
  }

// ===== Klick på hjärtknappar =====
  favoriteButtons.forEach((button) => {                       // Loopar igenom alla favoritknappar
    button.addEventListener("click", () => {                 // När en favoritknapp klickas, kör denna funktion
      const shoeItem = button.closest(".shoe-item");        // Hittar produktkortet som knappen ligger i
      if (!shoeItem) return;

      const productId = shoeItem.dataset.id;              // Hämtar produktens ID
      if (!productId) return;

      let favorites = getFavorites();                                // Hämtar favoritlistan

      if (favorites.includes(productId)) {                         // Om produkten redan är favorit
        favorites = favorites.filter((id) => id !== productId);   // Ta bort produkten från favoritlistan
      } else {
        favorites.push(productId);                               // Annars, lägg till produkten i favoritlistan
      }

      saveFavorites(favorites);                          // Spara den uppdaterade favoritlistan i localStorage
      syncFavoriteIcons();                              // Uppdatera alla hjärtikoner så att de visar rätt status
      updateFavoritesCount();                          // Uppdatera siffran vid hjärtikonen så att den visar rätt antal favoriter
    });
  });

  // ===== När sidan laddas =====
  syncFavoriteIcons();                              // När sidan laddas, se till att alla hjärtikoner visar rätt status baserat på favoritlistan
  updateFavoritesCount();                          // När sidan laddas, uppdatera siffran vid hjärtikonen så att den visar rätt antal favoriter

});

// för att tömma local storage: localStorage.removeItem("favorites");