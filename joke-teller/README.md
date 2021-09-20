# Joke Teller
A Text to Voice-Based Joke Teller app using JavaScript and 2 APIs:
- [JokeAPI](https://sv443.net/jokeapi/v2/) to fetch a programming joke
- [Voice RSS Text-To-Speech API](http://www.voicerss.org/api/) to read out the fetched jokes to user

## Demo
You can view a live version [here](https://tinawebdev.github.io/javascript-projects/joke-teller/).

[![](demo.png)](#)

## Getting Started
If you would like to run this locally, you will need an **API key**, which you can get for free from the steps below:
* Download the repository using the [instruction](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository).
* Go to the `joke-teller` folder and open the `script.js` file.
* Go to the documentation page for the [Voice RSS Text-To-Speech API page](http://www.voicerss.org/api/) and click on **Get API Key**.
* Create a free account.
* When your account is created, you need to activate the account by clicking the **Activate Account** button on the sign up page.
* Once your account is activated, you can copy your API key and paste it into the `script.js` file:

```js
function tellMe(joke) {
  VoiceRSS.speech({
    // Replace 'YOUR_API_KEY' with your 
    // API key contained in single quotes
    key: 'YOUR_API_KEY',
    // ...
  });
}
```
