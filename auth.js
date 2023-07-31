// import { Buffer } from "buffer";
// window.Buffer = window.Buffer || Buffer;

// // const hash = window.location.hash.substring(1);
// // const queryParams = {};
// // hash.split('&').forEach((pair) => {
// // const [key, value] = pair.split('=');
// // queryParams[key] = value;
// // });
// // const accessToken = queryParams.access_token;

// var request = require('request');

// var client_id = '748e9e04d1a24bb08f262476d1653821';
// var client_secret = '3ead4ebb971545d29da746bfc8a594d2';

// var authOptions = {
//   url: 'https://accounts.spotify.com/api/token',
//   headers: {
//     'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
//   },
//   form: {
//     grant_type: 'client_credentials'
//   },
//   json: true
// };

// request.post(authOptions, function(error, response, body) {
//   if (!error && response.statusCode === 200) {
//     var token = body.access_token;
//   }
//   var options = {
//     url: 'https://api.spotify.com/v1/users/jmperezperez',
//     headers: {
//       'Authorization': 'Bearer ' + token
//     },
//     json: true
//   };
//   request.get(options, function(error, response, body) {
//     console.log(body);
//   });
// }

// )

// const accessToken = localStorage.getItem('sharedAccessToken');


fetch("https://api.spotify.com/v1/me",{
  headers: {
      Authorization: `Bearer ${accessToken}`,
    },
})
.then(response => response.json())
.then(data => {
  // Handle the response data here
  console.log(data);

  

  const userDisplayName = data.display_name;
  const userName= document.getElementById('login_btn');

  userName.textContent  = userDisplayName;

})
.catch(error => {
  console.error('Error fetching userName:', error);
});
