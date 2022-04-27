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

const clearReposList = () => userRepos.innerHTML = "";

const fetchUserData =  userName => {
  return fetch(`https://api.github.com/users/${userName}`)
  .then(handleError)  // skips to .catch if error is thrown
  .catch(console.log) // catches the error and logs it
};

const fetchUserRepos = url => {
  return fetch(url)
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
    if (sortedRepos.length <  REPOS_MAX && !sortedRepos.includes(repo)) {
      sortedRepos.push(repo);
    }
  }

  const maxStars = (function(a, b) {
    return b.stargazers_count - a.stargazers_count;
  });

  userRepos.filter(repo => repo.stargazers_count > 0).sort(maxStars).map(addRepos);
  userRepos.map(addRepos);

  return sortedRepos;
}

const renderUserRepos = userReposData => {
  userReposData.map(repo => {
    let userRepo = "";
    if (repo.stargazers_count) {
      userRepo = `
        <div class="user_repo">
          <div class="repo_with_stars">
            <a href="${repo.html_url}" target="_blank" class="user_repo-link">${repo.name}</a>
            <span class="stars_count">${repo.stargazers_count}</span>
          </div>
          ${repo.description ? `<small class="repo_description">${repo.description}</small>` : ""}
        </div>
      `;
    } else {
      userRepo = `
        <div class="user_repo">
          <a href="${repo.html_url}" target="_blank" class="user_repo-link">${repo.name}</a>
          ${repo.description ? `<small class="repo_description">${repo.description}</small>` : ""}
        </div>
      `;
    }

    userRepos.insertAdjacentHTML("beforeend", userRepo);
  })
}

const showUserBtnElem = document.querySelector('.name-form_btn');
const showUserInputElem = document.querySelector('.name-form_input');

const onSearchUser = () => {
  clearReposList();
  const userName = showUserInputElem.value.trim();
  fetchUserData(userName)
  .then(userData => {
    renderUserData(userData);
    return userData.repos_url;
  })
  .then(url => fetchUserRepos(url))
  .then(userRepos => sortUserRepos(userRepos))
  .then(userRepos => renderUserRepos(userRepos))
  .catch(console.log)
};

const inputKeyPress = (event) => {
  if (event.key === 'Enter' && showUserInputElem.value.trim() !== '') onSearchUser();
}

showUserBtnElem.addEventListener('click', onSearchUser);
showUserInputElem.addEventListener('keypress', inputKeyPress);
