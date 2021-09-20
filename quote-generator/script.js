const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('quote-loader');
const errorMessage = document.getElementById('error-message')

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

let countCallsToAPI = 0;

// Get Quote From API
async function getQuoteFromAPI() {
  showLoadingSpinner();
  const proxyUrl1 = 'https://cors-anywhere.herokuapp.com/';
  const proxyUrl2 = 'https://guarded-peak-77488.herokuapp.com/';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    let response = await fetch(proxyUrl1 + apiUrl);
    if (response.status !== 200) {
      response = await fetch(proxyUrl2 + apiUrl);
    }
    const data = await response.json();
    // Check if Author field is blank and replace it with 'Unknown'
    if (data.quoteAuthor === '') {
      authorText.innerText = '- Unknown';
    } else {
      authorText.innerText = `- ${data.quoteAuthor}`;
    }
    // Dynamically reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    // Stop Loader & Show Quote
    removeLoadingSpinner();
  } catch (error) {
    countCallsToAPI += 1;
    if (countCallsToAPI <= 10) {
      getQuoteFromAPI();
    } else if (countCallsToAPI > 10) {
      // Show Error Message
      errorMessage.innerText = "Whoops! There was an error!";
      errorMessage.classList.add('visible');
      // Stop Loader
      loader.hidden = true;
    }
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = `"${quoteText.innerText}"`;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuoteFromAPI);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuoteFromAPI();
