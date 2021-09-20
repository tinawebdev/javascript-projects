const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');
const alertContainer = document.getElementById('alert-container');
const alertIcon = document.getElementById('alert-icon');
let message = document.getElementById('alert-message');
let bookmarks = {};

// Show Modal, Focus on Input 
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => {
  modal.classList.remove('show-modal');
  clearAlertMessage();
});
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show-modal');
    clearAlertMessage();
  }
})

// Validate URL
function validateUrl(urlValue) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!urlValue.match(regex)) {
    showDangerAlert('Please provide a valid web address.');
    bookmarkForm[1].style.borderColor = "coral";
    return false;
  }
  return true;
}

// Validate Form
function validate(nameValue, urlValue) {
  clearAlertMessage();
  if (!nameValue || !urlValue) {
    showDangerAlert('Please submit values for both fields.');
    bookmarkForm[0].style.borderColor = "coral";
    validateUrl(urlValue)
    return false;
  }
  if (!validateUrl(urlValue)) {
    return false;
  }
  // Valid
  return true;
}

// Build Bookmarks DOM
function buildBookmarks() {
  // Remove all bookmark elements
  bookmarksContainer.textContent = '';
  // Build items
  Object.keys(bookmarks).forEach((id) => {
    const {name, url} = bookmarks[id];
    // Item
    const item = document.createElement('div');
    item.classList.add('item', 'link');
    // Close icon
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times', 'delete-icon');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    closeIcon.setAttribute('onclick', `deleteBookmark('${id}')`);
    // Favicon / Link Container
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    // Favicon
    const favicon = document.createElement('img');
    favicon.setAttribute('src', `https://www.google.com/s2/u/0/favicons?domain=${url}`);
    favicon.setAttribute('alt', 'Favicon');
    // Link
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = name;
    // Append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(linkInfo, closeIcon);
    bookmarksContainer.appendChild(item);
  });
}

// Fetch Bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage if available
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    // Create bookmarks object in localStorage
    bookmarks = {
      'https://yahoo.com/': {
        name: 'yahoo',
        url: 'https://yahoo.com/'
      },
      'https://google.com/': {
        name: 'google',
        url: 'https://google.com/'
      },
      'https://youtube.com/': {
        name: 'youtube',
        url: 'https://youtube.com/'
      }
    };
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

// Delete Bookmark
function deleteBookmark(id) {
  if (bookmarks[id]) {
    delete bookmarks[id];
  }
  // Update bookmarks object in localStorage, re-populate DOM
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}

// Show Danger Alert
function showDangerAlert(messageText) {
  message.textContent = messageText;
  alertContainer.classList.add('alert-container', 'alert-danger');
  alertContainer.hidden = false;
  alertIcon.classList.add('fas', 'fa-exclamation');
}

// Show Success Alert
function showSuccessAlert(messageText) {
  message.textContent = messageText;
  alertContainer.classList.add('alert-container', 'alert-success');
  alertContainer.hidden = false;
  alertIcon.classList.add('fas', 'fa-bookmark');
}

// Clear Alert Message
function clearAlertMessage() {
  message.textContent = '';
  alertContainer.className = '';
  alertContainer.hidden = true;
  alertIcon.className = '';
  bookmarkForm[0].style.borderColor = "";
  bookmarkForm[1].style.borderColor = "";
}

// Alert Event Listener
window.addEventListener('click', (e) => {
  if (e.target === alertContainer) {
    clearAlertMessage();
  }
})

// Handle Data from Form
function storeBookmark(e) {
  e.preventDefault();
  clearAlertMessage();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  // Add 'https://' if not there
  if (!urlValue.includes('https://', 'http://')) {
    urlValue = `https://${urlValue}`;
  }
  let isLastSlash = urlValue.charAt(urlValue.length-1) === '/' ? true : false;
  if(!isLastSlash) {
    urlValue += '/';
  }
  // Validate
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  // Set bookmark object
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  if (bookmarks[bookmark.url]) {
    showSuccessAlert('Bookmark updated!');
  } else {
    showSuccessAlert('Bookmark added!');
  }
  bookmarks[urlValue] = bookmark;
  // Set bookmarks in localStorage, fetch, reset input fields
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);

// On Load, Fetch Bookmarks
fetchBookmarks();
