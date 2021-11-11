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

/**
 *
 * @param {HTMLElement} btn the button to be clicked
 * @param {HTMLElement} main the HTML area where content will be added
 */
function init(btn, main) {
  //save the main element in a global variable to be accessed later
  addEventListeners(btn);
  root = main;
}

/**
 *
 * @param {HTMLElement} main where to add the click listener
 * @description When the main element is clicked, the getData function will be called
 * passing the `products` api endpoint
 */
function addEventListeners(main) {
  main.addEventListener('click', (ev) => {
    ev.preventDefault();
    getData(`products`);
  });
}

/**
 *
 * @param {string} endpoint endpoint for the api to be added to the baseurl
 * @returns {URL}
 */
function buildURL(endpoint) {
  return new URL(`${baseURL}${endpoint}?key=${API_KEY}`);
}

/**
 *
 * @param {array} data array of products returned by api call
 * @param {COLORS} clr must be one of the colours from COLORS set.
 *
 */
function buildHTML(data, clr) {
  /**
   * @type {Array.<product>}
   */
  let products = data.map((item) => {
    let { id, name, price, description, image } = { ...item };
    /**
     * @type {product}
     */
    let prod = { id, name, price };
    return prod;
  });
  root.innerHTML = products
    .map((product) => {
      let { id, name, price } = { ...product };
      return `<div data-ref="${id}" style="background-color:${clr};">
      <p>${name}</p>
      <p>${price}</p>
    </div>`;
    })
    .join('');
}

export default init;
