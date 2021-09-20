# Unsplash API - Infinite Scroll
This is an infinite photo viewer app using Unsplash API.
* Fething the data in JSON format from the [Unsplash Api](https://unsplash.com/documentation/).
* Dynamically inserting the photos into the DOM on initial loading.
* When the user scrolls close to the bottom of the page the app makes another GET request to the API and inserts photos into the DOM (lazy loading).
* Responsive on large and small screens with the help of the CSS media queries.

## Getting Started
If you would like to run this locally, **you will need an API key**. 
You can get your access key on the [Unsplash's Developer Page](https://unsplash.com/documentation/).

### Steps to get this project up and running locally for you
* Download the repository using the [instruction](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository).
* Go to the `infinite-scroll` folder and open the `script.js` file.
* Replace the value of the `config.api_key` variable with your **API key** wrapped in quotes and save.
* Now you can run the project and see it work!

## Demo
[![](demo.gif)](#)

## Resources
* Fonts: [Google Fonts](https://fonts.google.com/)
* Loader: [Loading.io](https://loading.io/)
* Freely-usable images: [Unsplash API](https://unsplash.com/developers/)
