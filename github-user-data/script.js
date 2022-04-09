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
     userAvatarElem.src = '404.png';
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
  return fetch(`https://api.github.com/users/${userName}/repos`)
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

const sortUserRepos = userRepos => {
  const REPOS_MAX = 5;

  let sortedRepos = [];

  const addRepos = (repo) => {
    if (sortedRepos.length <  REPOS_MAX) {
      sortedRepos.push(repo);
    }
  }

  userRepos.filter(repo => repo.stargazers_count > 0).map(addRepos);

  if (userRepos.length >= REPOS_MAX && sortedRepos.length < REPOS_MAX) {
    userRepos.filter(repo => !sortedRepos.includes(repo)).map(addRepos);
  } else {
    userRepos.map(addRepos);
  }

  return sortedRepos;
}

const renderUserRepos = userReposData => {
  userReposData.map(repo => {
    let userRepo = `
      <div class="${repo.stargazers_count ? "user_repo stars" : "user_repo"}">
        <span>
          <a href="${repo.html_url}" target="_blank" class="user_repo-link">${repo.name}</a>
        </span>
        ${repo.description ? `<small>${repo.description}</small>` : ""}
      </div>
    `;

    userRepos.insertAdjacentHTML("beforeend", userRepo);
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
  .then(userRepos => sortUserRepos(userRepos))
  .then(userRepos => renderUserRepos(userRepos))
  .catch(console.log)
};

showUserBtnElem.addEventListener('click', onSearchUser);
