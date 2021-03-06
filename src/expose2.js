
/**
 * App Module
 * @module /app.js
 *
 * @author Steve Griffith <steve@home.org>
 * @version 0.1.2
 * @description The init method is exported and once called will add the click event
 * listener to start the api fetch and then build the display of the products
 *
 * See [Getting Started]{@tutorial overview} to learn how to use app.js.
 */

/**
 * @constant {string} baseURL base portion of API url
 */
const baseURL = 'https://cool.dev/api';
/**
 * @enum {Array.<string>} list of possible colour values to be used
 */
const COLORS = ['rebeccapurple', 'cornflowerblue', 'lightsalmon'];

/**
 * @constant {string} API_KEY key required for api param in querystring
 */
const API_KEY = 'abcd-0123';

/**
 * @type {HTMLElement}
 * @global
 */
let root;

/**
 * @typedef {{id: number, name: string, price: number}} product object to be used as a blueprint to extract product details
 */

/**
 * getData function will attempt to make an API call to the provided endpoint.
 * If it works, the JSON string will be turned into an object and passed to the
 * buildData function. A failure will be written to console.error
 *
 * @param {string} endpoint api endpoint to be added to the base url for the api call
 * @example getData('products')
 */
function getData(endpoint) {
  let url = buildURL(endpoint);
  fetch(url)
    .then((resp) => {
      if (!resp.ok) throw new Error(resp.statusText);
      return resp.json();
    })
    .then((data) => {
      buildHTML(data, COLORS[0]);
    })
    .catch(console.error);
}

// explore.js

window.addEventListener('DOMContentLoaded', init);

/**
 * don't touch 
 *
 */
function init() {
  var synth = window.speechSynthesis;
  var options = document.getElementById("voice-select");
  var image = document.querySelector('img');
  setTimeout(() => {
    var voices = synth.getVoices();
    for (var i = 0; i < voices.length; i++){
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
      option.value = i;
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      options.appendChild(option);
    }
    var button = document.querySelector('button');
    var text = document.getElementById('text-to-speak');
    options.addEventListener('change', () => {
    });

    button.addEventListener('click', () => {
      if (options.value == 'select'){
        return;
      }
      var utterance = new SpeechSynthesisUtterance(text.value);
      utterance.voice = voices[options.value];

      utterance.addEventListener('start', () => {
        image.src = 'assets/images/smiling-open.png';
      });

      utterance.addEventListener('end', () => {
        image.src = 'assets/images/smiling.png';
      });

      synth.speak(utterance);

    });

  }, 100);
}

