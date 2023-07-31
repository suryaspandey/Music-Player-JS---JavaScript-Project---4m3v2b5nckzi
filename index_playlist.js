


(function(){
  console.log('IIFE is running...');
  function isValidToken(accessToken, expiresIn, tokenStoredAt) {
    const currentTime = Date.now();
    const timeDelta = (currentTime - Number(tokenStoredAt)) / 1000;
    return timeDelta < Number(expiresIn);
  }

  function startApp(){
  const homePage = document.getElementById("spotify-redirect-link");

    homePage.addEventListener('click',()=>{
      
    
    // ================================
    
    var accessToken = localStorage.getItem('accessToken');
    var expiresIn = localStorage.getItem('expiresIn');
    var tokenType = localStorage.getItem('tokenType');
    var user_id = localStorage.getItem('user_id');




    
    // Check if any of the token values are undefined
    if (!accessToken || !expiresIn || !tokenType) {
      // Handle the case when token values are missing
      console.log('Token values are missing');
      const url = `https://prismatic-cat-ea7dc8.netlify.app/login_page.html`;
      const localUrl = "http://127.0.0.1:5500/login_page.html";
      window.location.href = url;
    } else {
      // Token values are present, proceed with using them
      console.log('Access Token:', accessToken);
      console.log('Expires In:', expiresIn);
      console.log('Token Type:', tokenType);
    
    
    // Check if the values are defined
    if (isValidToken(accessToken, expiresIn,localStorage.getItem('tokenStoredAt'))) {
      // Construct the URL with the access token and expiration time
      const url = `index.html?access_token=${accessToken}&expires_in=${expiresIn}`;
      
      // Navigate to the index.html page
      window.location.href = url;
    }
    
    else {
      // Handle the case when the values are undefined
      const url = `https://prismatic-cat-ea7dc8.netlify.app/login_page.html`;
          const localUrl = "http://127.0.0.1:5500/login_page.html";
      console.log('Access token or expiration time is not available');
      window.location.href = url;

    }
    }
    
    // window.location.href = `http://127.0.0.1:5500/index.html?#access_token=${accessToken}&token_type=${tokenType}&expires_in=${expiresIn}`;
    
    // })
    
    })
    
    

    
     accessToken = localStorage.getItem('accessToken');
     expiresIn = localStorage.getItem('expiresIn');
     user_id = localStorage.getItem('user_id');
    
    
     localStorage.setItem('accessToken',accessToken);
     localStorage.setItem('expiresIn',expiresIn);
     localStorage.setItem('user_id',user_id);
    
      // Display UserName
    
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

        user_id = data.id;

        console.log("user_id "+user_id);
        localStorage.setItem("user_id",user_id);
    
    })
    .catch(error => {
        console.error('Error fetching userName:', error);
      });
    
    
    //   DISPLAY PLAYLIST
    
    // "https://api.spotify.com/v1/browse/featured-playlists?country=IN&timestamp=2023-05-22T09%3A13%3A18&offset=0&limit=20"
    
    // https://api.spotify.com/v1/users/{user_id}/playlists

    fetch('https://api.spotify.com/v1/browse/featured-playlists', {
    
    // const user_iddd = localStorage.getItem('user_id');
    // console.log("before fetch userId "+user_iddd);

    // fetch(`https://api.spotify.com/v1/users/${user_iddd}/playlists`, {
      // fetch(`https://api.spotify.com/v1/me/playlists`, {

      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    
      .then(response => response.json())
      .then(data => {
        // Handle the response data here
        console.log(data);
        // console.log(user_iddd);
    
        
        const playlist_container = document.getElementById("playlist-container");
     
       data.playlists.items.forEach((item) =>{
    
         const card = document.createElement('div');
    
         card.classList.add("card");
    
         const playlist_id= item.id;
        //  console.log(playlist_id);
    
         const playlist_link  = item.external_urls.spotify;
        
     
         const card_contents  = 
            `
            <img width="200px" height="200px" src="${item.images[0].url}" alt="${item.name}">
            <p id="track-name">${item.name} </p>
            <p id="track-artist">${item.description} </p>
              `
         ;
    
         card.innerHTML = card_contents;
       playlist_container.appendChild(card);
    
        //  when card is clicked, pass the info to local storage
    
    
        card.addEventListener('click',()=>{
        localStorage.setItem('playlistId', playlist_id);
        const playlistMainImg = item.images[0].url;
        // console.log(playlistMainImg);
        localStorage.setItem('playlistImg', playlistMainImg);
        const accessToken = localStorage.getItem('accessToken');
    
        localStorage.setItem('accessToken', accessToken);
        console.log("access Token from playilst page: ", accessToken);
    
    
        window.location.href = `./index2.html?playlistId=${playlist_id}`
    
      })
     
       });
    
      
    })
      .catch(error => {
        console.error('Error fetching playlists:', error);
      });
    
    
      //                       -------------------------         SEARCH A SONG            ---------------------
    
    const searchButton = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-text');
    
    searchButton.addEventListener('click', performSearch );
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        performSearch();
      }
    } );
    
    function performSearch(){
      const searchQuery = searchInput.value.trim();
      if (searchQuery) {
            window.location.href = `search.html?query=${encodeURIComponent(searchQuery)}`;
      }
    }
    
    
    
    localStorage.setItem('sharedAccessToken', accessToken);
    localStorage.setItem('sharedExpiresIn', expiresIn);

    if (!isValidToken(accessToken, expiresIn, storedTokenCreateTime)) {
      window.location.href = '/login_page.html';
      return;
    }

  }

  const stortedToken = localStorage.getItem('accessToken');
  const storedExpiresIn = localStorage.getItem('expiresIn');
  const storedTokenCreateTime = localStorage.getItem('storedTokenCreateTime');


  // const hasIsValidToken = () => {
  //   if (stortedToken && storedExpiresIn) {
  //     return isValidToken(stortedToken, storedExpiresIn, storedTokenCreateTime);
  //   }
  //   return false;
  // };
  function hasIsValidToken(storedTokenCreateTime) {
    const accessToken = localStorage.getItem('sharedAccessToken');
    const expiresIn = localStorage.getItem('sharedExpiresIn');

    if (accessToken && expiresIn && storedTokenCreateTime) {
      return isValidToken(accessToken, expiresIn, storedTokenCreateTime);
    }

    return false;
  }


 if(hasIsValidToken(storedTokenCreateTime)){
  startApp();
  return;
 }
 const hash = window.location.hash;
  if (!hash) {
    // If the token is not valid and there is no hash, redirect to the login page
    window.location.href = '/login_page.html';
    return;
  }
  startApp()
})();





// --------------- my code     ----------------------------------------

// const homePage = document.getElementById("spotify-redirect-link");

// homePage.addEventListener('click',()=>{
//   console.log("icon clicked");
// // const accessToken = localStorage.getItem('sharedAccessToken');
// // const expiresIn = localStorage.getItem('sharedExpiresIn');

// // ================================

// var accessToken = localStorage.getItem('accessToken');
// var expiresIn = localStorage.getItem('expiresIn');
// var tokenType = localStorage.getItem('tokenType');

// // Check if any of the token values are undefined
// if (!accessToken || !expiresIn || !tokenType) {
//   // Handle the case when token values are missing
//   console.log('Token values are missing');
// } else {
//   // Token values are present, proceed with using them
//   console.log('Access Token:', accessToken);
//   console.log('Expires In:', expiresIn);
//   console.log('Token Type:', tokenType);


// // Check if the values are defined
// if (accessToken && expiresIn) {
//   // Construct the URL with the access token and expiration time
//   const url = `index.html?access_token=${accessToken}&expires_in=${expiresIn}`;
  
//   // Navigate to the index.html page
//   window.location.href = url;
// }

// else {
//   // Handle the case when the values are undefined
//   console.log('Access token or expiration time is not available');
// }
// }

// // window.location.href = `http://127.0.0.1:5500/index.html?#access_token=${accessToken}&token_type=${tokenType}&expires_in=${expiresIn}`;
// console.log("spotify icon clicked")
// console.log(window.location.href);
// // })

// })



//  accessToken = localStorage.getItem('accessToken');
//  expiresIn = localStorage.getItem('expiresIn');


//  localStorage.setItem('accessToken',accessToken);
//  localStorage.setItem('expiresIn',expiresIn);

// // Display UserName


//   fetch("https://api.spotify.com/v1/me",{
//     headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//   })
//   .then(response => response.json())
//   .then(data => {
//     // Handle the response data here
//     console.log(data);

//     const userDisplayName = data.display_name;
//     const userName= document.getElementById('login_btn');

//     userName.textContent  = userDisplayName;

// })
// .catch(error => {
//     console.error('Error fetching userName:', error);
//   });


// //   DISPLAY PLAYLIST

// // "https://api.spotify.com/v1/browse/featured-playlists?country=IN&timestamp=2023-05-22T09%3A13%3A18&offset=0&limit=20"

// fetch('https://api.spotify.com/v1/browse/featured-playlists', {
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   }
// })
//   .then(response => response.json())
//   .then(data => {
//     // Handle the response data here
//     console.log(data);

    
//     const playlist_container = document.getElementById("playlist-container");
 
//    data.playlists.items.forEach((item) =>{

//      const card = document.createElement('div');

//      card.classList.add("card");

//      const playlist_id= item.id;
//     //  console.log(playlist_id);

//      const playlist_link  = item.external_urls.spotify;
    
 
//      const card_contents  = 
//         `
//         <img width="200px" height="200px" src="${item.images[0].url}" alt="${item.name}">
//         <p id="track-name">${item.name} </p>
//         <p id="track-artist">${item.description} </p>
//           `
//      ;

//      card.innerHTML = card_contents;
//    playlist_container.appendChild(card);

//     //  when card is clicked, pass the info to local storage


//     card.addEventListener('click',()=>{
//     localStorage.setItem('playlistId', playlist_id);
//     const playlistMainImg = item.images[0].url;
//     // console.log(playlistMainImg);
//     localStorage.setItem('playlistImg', playlistMainImg);
//     const accessToken = localStorage.getItem('accessToken');

//     localStorage.setItem('accessToken', accessToken);
//     console.log("access Token from playilst page: ", accessToken);


//     window.location.href = `./index2.html?playlistId=${playlist_id}`

//   })
 
//    });

  
// })
//   .catch(error => {
//     console.error('Error fetching playlists:', error);
//   });


//   //                       -------------------------         SEARCH A SONG            ---------------------

// const searchButton = document.getElementById('search-btn');
// const searchInput = document.getElementById('search-text');

// searchButton.addEventListener('click', performSearch );
// searchInput.addEventListener('keydown', (event) => {
//   if (event.key === 'Enter') {
//     performSearch();
//   }
// } );

// function performSearch(){
//   const searchQuery = searchInput.value.trim();
//   if (searchQuery) {
//         window.location.href = `search.html?query=${encodeURIComponent(searchQuery)}`;
//   }
// }



// localStorage.setItem('sharedAccessToken', accessToken);
// localStorage.setItem('sharedExpiresIn', expiresIn);





