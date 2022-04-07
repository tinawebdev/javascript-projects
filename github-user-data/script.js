const userAvatarElem = document.querySelector('.user_avatar');
const userNameElem = document.querySelector('.user_name');
const userInfo = document.querySelector('.user_info');

const defaultAvatar = 'default-avatar.png';

userAvatarElem.src = defaultAvatar;

// handler function that throws any encountered error
const handleError = response => {
  if (!response.ok) { 
     userInfo.hidden = true;
     userAvatarElem.src = defaultAvatar;
     showUserInputElem.value = "";
     throw Error(response.statusText);
  } else {
      return response.json();
  }
};

const fetchUserData =  userName => {
  return fetch(`https://api.github.com/users/${userName}`)
  .then(handleError)  // skips to .catch if error is thrown
  .catch(console.log) // catches the error and logs it
};

const renderUserData = userData => {
  const { avatar_url, name, html_url } = userData;
  userAvatarElem.src = avatar_url;
  userNameElem.textContent = name;
  userNameElem.href = html_url;
  userInfo.hidden = false;
};

const showUserBtnElem = document.querySelector('.name-form_btn');
const showUserInputElem = document.querySelector('.name-form_input');

const onSearchUser = () => {
  const userName = showUserInputElem.value;
  fetchUserData(userName)
  .then(userData => renderUserData(userData))
  .catch(console.log)
};

showUserBtnElem.addEventListener('click', onSearchUser);
