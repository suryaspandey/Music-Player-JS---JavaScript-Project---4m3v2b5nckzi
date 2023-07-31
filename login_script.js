

  // login name on button


  function authorizeWithSpotify() {
      // Replace YOUR_CLIENT_ID with your actual Spotify client ID
      // var clientId = '748e9e04d1a24bb08f262476d1653821'; // from old account
      // var clientId = '632a6d1d16bd4af381c9adb7a06ba6ad'; //
      var clientId ='62bae43f0ce643908462467b7e2878e9'
      // var redirectUri = 'http://127.0.0.1:5500/index.html';
      var redirectUri ="https://prismatic-cat-ea7dc8.netlify.app/";

    //  var redirectUri = "https://6476dabb481a915c8e9f1c21-prismatic-c.netlify.app/" -- hosteed
                           
   
     

      // Construct the authorization URL
      var authorizationUrl = 'https://accounts.spotify.com/authorize';
      authorizationUrl += '?client_id=' + encodeURIComponent(clientId);
      authorizationUrl += '&response_type=token';
      authorizationUrl += '&redirect_uri=' + encodeURIComponent(redirectUri);
      authorizationUrl += '&scope=' + encodeURIComponent('user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public ');

      // Redirect the user to the authorization URL

      setTimeout(() => window.location.href = authorizationUrl);
      console.log(window.location.href);   
  }


  window.onload = function() {

  const accessToken = localStorage.getItem('accessToken');
  console.log(accessToken);

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
    const showFN = userDisplayName[0];
    const showLN = userDisplayName.split(" ")[1][0];
    // console.log(showLN);
    // const userID= data.id;
    // console.log(userID);
    const userName= document.getElementById('login_btn');

    // userName.textContent  = userDisplayName;
    userName.textContent  = showFN+ " "+showLN;

  })
  .catch(error => {
    console.error('Error fetching userName:', error);
  });

  };


