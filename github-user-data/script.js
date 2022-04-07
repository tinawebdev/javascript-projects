const userAvatarElem = document.querySelector('.user_avatar');
const userNameElem = document.querySelector('.user_name');
const userInfo = document.querySelector('.user_info');
const userRepos = document.querySelector('.user_repos');

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

const fetchUserRepos = userName => {
  return fetch(`https://api.github.com/users/${userName}/repos?per_page=${3}`)
  .then(handleError)  // skips to .catch if error is thrown
  .catch(console.log) // catches the error and logs it
}

const renderUserData = userData => {
  const { avatar_url, name, html_url, login } = userData;
  userAvatarElem.src = avatar_url;
  userNameElem.textContent = name ? name : login;
  userNameElem.href = html_url;
  userInfo.hidden = false;
};

const renderUserRepos = userReposData => {
  userReposData.map(repo => {
    let userRepo = `
      <div class="user_repo">
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        <small>${repo.description ? repo.description : "No description"}</small>
      </div>
    `;

    userRepos.insertAdjacentHTML("afterbegin", userRepo);
  })
}

const showUserBtnElem = document.querySelector('.name-form_btn');
const showUserInputElem = document.querySelector('.name-form_input');

const onSearchUser = () => {
  const userName = showUserInputElem.value;
  userRepos.innerHTML = "";
  fetchUserData(userName)
  .then(userData => renderUserData(userData))
  .catch(console.log)

  fetchUserRepos(userName)
  .then(userRepos => renderUserRepos(userRepos))
  .catch(console.log)
};

showUserBtnElem.addEventListener('click', onSearchUser);
