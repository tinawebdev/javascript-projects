const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA API
const count = 10;
const apiKey = `DEMO_KEY`;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function showContent(page) {
  window.scrollTo({ top: 0, behavior: 'instant' });
  loader.classList.add('hidden');
  if (page === 'results') {
    resultsNav.classList.remove('hidden');
    favoritesNav.classList.add('hidden');
  } else {
    resultsNav.classList.add('hidden');
    favoritesNav.classList.remove('hidden');
  }
}

function createDOMNodes(page) {
  const currentArray = page === 'results' ? resultsArray : Object.values(favorites);
  currentArray.forEach((result) => {
    if (!result.url.includes('youtube')) {
      // Card Container
      const card = document.createElement('div');
      card.classList.add('card');
      // Link
      const link = document.createElement('a');
      link.href = result.hdurl;
      link.title = 'View Full Image';
      link.target = '_blank';
      // Image
      const image = document.createElement('img');
      image.src = result.url;
      image.alt = 'NASA Picture of the Day';
      image.loading = 'lazy';
      image.classList.add('card-img-top');
      // Card Body
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      // Card Header
      const cardHeader = document.createElement('div');
      cardHeader.classList.add('card-header');
      // Card Title of image
      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = result.title;
      // p for add to favorites
      const saveText = document.createElement('p');
      saveText.classList.add('card-link');
      saveText.textContent = 'Add to Favorites';
      // Icon
      const saveTextIcon = document.createElement('i');
      if (page === 'results') {
        saveText.textContent = 'Add to Favorites';
        saveTextIcon.classList.add('far', 'fa-bookmark');
        saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);
      } else {
        saveText.textContent = 'Remove Favorites';
        saveTextIcon.classList.add('fas', 'fa-trash');
        saveText.setAttribute('onclick', `removeFavorite('${result.url}')`);
      }
      // Card text
      const cardText = document.createElement('p');
      cardText.textContent = result.explanation;
      // Footer Container
      const footer = document.createElement('small');
      footer.classList.add('text-muted');
      // Date
      const date = document.createElement('strong');
      date.textContent = result.date;
      // Copyright
      const copyrightResult = result.copyright === undefined ? '' : result.copyright;
      const copyright = document.createElement('span');
      copyright.textContent = ` ${copyrightResult}`;

      // Append all together in right order
      footer.append(date, copyright);
      saveText.insertAdjacentElement('afterbegin', saveTextIcon);
      cardHeader.append(cardTitle, saveText);
      cardBody.append(cardHeader, cardText, footer);
      link.appendChild(image);
      card.append(link, cardBody);
      imagesContainer.appendChild(card);
    }
  });
}

function updateDOM(page) {
  // Get favorites from localstorage
  if (localStorage.getItem('nasaFavorites')) {
    favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
  }
  imagesContainer.textContent = '';
  createDOMNodes(page);
  showContent(page);
}

// Get 10 Images from NASA API
async function getNasaPictures() {
  // Show Loader
  loader.classList.remove('hidden');
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    updateDOM('results');
  } catch (error) {
    // Catch Error Here
  }
}

// Add result to favorites
function saveFavorite(itemURL) {
  // Loop through Results Array to select Favorite
  resultsArray.forEach((item) => {
    if (item.url.includes(itemURL) && !favorites[itemURL]) {
      favorites[itemURL] = item;
      // Show Save Confirmation for 2 seconds
      saveConfirmed.hidden = false; 
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);
      // Set Favorites in localStorage
      localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
    }
  });
}

// Remove items from Favorites
function removeFavorite(itemURL) {
  if (favorites[itemURL]) {
    delete favorites[itemURL];
    // Set favorites in localstorage
    localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
    updateDOM('favorites');
  }
}

// On Load
getNasaPictures();
