// const hash = window.location.hash.substr(1);
// const queryParams = {};
// hash.split('&').forEach((pair) => {
// const [key, value] = pair.split('=');
// queryParams[key] = value;
// });
// const accessToken = queryParams.access_token;

let ACCESS_TOKEN = '';
let EXPIRES_IN = '';
let TOKEN_TYPE = '';
const queryParams = {};
const APP_URL = 'http://127.0.0.1:5500/SpotifyClone/index.html';
const getProperties = () => {
  const hash = window.location.hash.substr(1);
  hash.split('&').forEach((pair) => {
    const [key, value] = pair.split('=');
    queryParams[key] = value;
  });
  ACCESS_TOKEN = queryParams.access_token;
  EXPIRES_IN = queryParams.expires_in;
  TOKEN_TYPE = queryParams.token_type;
}
const setItemsInLocalStorage = () => {
  localStorage.setItem("ACCESS_TOKEN", ACCESS_TOKEN);
  localStorage.setItem("EXPIRES_IN", EXPIRES_IN);
  localStorage.setItem("TOKEN_TYPE", TOKEN_TYPE);
}
const setBackToHome = () => {
  if (ACCESS_TOKEN)
    window.location.href = `${APP_URL}`;
}