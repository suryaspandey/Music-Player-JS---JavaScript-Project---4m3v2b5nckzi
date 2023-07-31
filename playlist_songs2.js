const accessToken = localStorage.getItem('accessToken');
// console.log("access token from playlist2/ song list pg"+accessToken);

// localStorage.setItem('sharedAccessToken', accessToken);


fetch("https://api.spotify.com/v1/me", {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then(response => response.json())
  .then(data => {
    // Handle the response data here
    // console.log(data);



    const userDisplayName = data.display_name;
    const userName = document.getElementById('login_btn');

    userName.textContent = userDisplayName;

  })
  .catch(error => {
    console.error('Error fetching userName:', error);
  });







// --------------------------------------------- GOING TO HOME PAGE --------------------------



// localStorage.getItem('accessToken', accessToken);
// localStorage.getItem('tokenType', tokenType);
// localStorage.getItem('expiresIn', expiresIn);

// const accessTkn = localStorage.getItem('accessToken');
// const homePage = document.getElementById("home-link");

// homePage.addEventListener('click',()=>{
//   window.location.href = `http://127.0.0.1:5500/index.html?#access_token=${accessTkn}&token_type=Bearer&expires_in=3600`;
//   console.log(window.location.href);
// })




// const homePage = document.getElementById("spotify-redirect-link");

// homePage.addEventListener('click',()=>{
//   const accessToken = localStorage.getItem('accessToken');
//   const expiresIn = localStorage.getItem('expiresIn');
//   const tokenType = localStorage.getItem('tokenType');

//   window.location.href = `http://127.0.0.1:5500/index.html?access_token=${accessToken}&token_type=${tokenType}&expires_in=${expiresIn}`;
//   // console.log(window.location.href);
// })








// ------------------------------        new code with complete table                   ------------------
// if (accessToken && tokenType && expiresIn) {
//   const expirationTime = new Date(parseInt(expiresIn, 10) * 1000);
//   const currentTime = new Date();
//   if (expirationTime > currentTime) {

// const accessToken = localStorage.getItem('accessToken');
// console.log(accessToken);


const playlistId = localStorage.getItem('playlistId');
// const playlistId = "37i9dQZF1DWV6eas0o9JXU";
const audio1 = document.querySelector(".main-song");
const progressBar = document.querySelector(".progress-bar");
const progressDetails = document.querySelector(".progress-details");
const currentTimeData = document.querySelector(".current");
const finalTimeData = document.querySelector(".final");
const repeatBtn = document.getElementById("repeat1");
const shuffleBtn = document.getElementById("shuffle1");
const nextBtn = document.getElementById("next1");
const prevBtn = document.getElementById("prev1");
const fastForwardBtn = document.getElementById("fast-forward-five-sec");
const fastReverseBtn = document.getElementById("fast-reverse-five-sec");
const playPauseBtn = document.querySelector(".play-pause");


// const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');


let currentIndex = 0;
let songs = [];

fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})
  .then(response => response.json())
  .then(data => {
    songs = data.items;
    loadSongs();
  });



function loadSongs() {

  const tableBody = document.getElementById('song-list');
  tableBody.innerHTML = '';

  songs.forEach((song, index) => {
    const track = song.track;
    const album = track.album;
    const song_url = track.preview_url;
    const song_duration_ms = track.duration_ms;

    function millisToMinutesAndSeconds(millis) {
      const minutes = Math.floor(millis / 60000);
      const seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    const song_row = document.createElement('tr');

    // if(song_url !== null)

    {
      //  index = currentIndex;
      song_row.innerHTML = `
      <td id = "title_no">${index + 1}</td>
      <td id= "table_img"><img height = "40px" width = "40px" src="${album.images[2].url}" alt="${album.name}" /></td>
      <td><audio src="${song_url}"></audio></td>
      <td id = "table_album_name">${album.name}</td>
      <td id = "table_album_artist">${album.artists[0].name}</td>
      <td id ="song_duration"> ${millisToMinutesAndSeconds(song_duration_ms)}</td>
    `;
    }

    song_row.addEventListener("click", () => {
      stopCurrentSong();
      currentIndex = index;
      loadData(currentIndex);
      playSong();
    });

    tableBody.appendChild(song_row);

  });


  function loadData(index) {

    // Retrieve the song data based on the index
    const song = songs[index];

    // Update the song details and play the song
    const musicTitles = document.querySelector('.music-titles');
    const nameElement = musicTitles.querySelector('.name');
    const artistElement = musicTitles.querySelector('.artist');

    nameElement.textContent = song.name;
    artistElement.textContent = song.artist;


    audio1.src = song.track.preview_url;
    // audio1.src = song.preview_url;

  }


  function playSong() {
    const currentSong = songs[currentIndex];

    if (currentSong) {
      audio1.src = currentSong.track.preview_url;
      audio1.play();
      updateProgressBar();
      updateSongDetails(currentSong);
      highlightTableRow(currentIndex);

      audio1.addEventListener('ended', () => {
        stopCurrentSong();
        currentIndex = (currentIndex + 1) % songs.length;
        loadData(currentIndex);
        playSong();
      });
    }
  }



  function pauseSong() {
    const audio1 = document.querySelector(".main-song");
    audio1.pause();
  }




  const playPauseIcon = document.querySelector('.play-pause-icon');

  playPauseBtn.addEventListener("click", () => {

    if (audio1.paused) {
      playPauseIcon.textContent = 'pause';
      audio1.play();

    }

    else {

      playPauseIcon.textContent = 'play_arrow';
      audio1.pause();

    }
  });

  // when play button is clicked, the icon should change to pause and vice versa

  audio1.addEventListener('play', () => {
    playPauseIcon.textContent = 'pause';
  });

  audio1.addEventListener('pause', () => {
    playPauseIcon.textContent = 'play_arrow';
  });


  // update the current time of the progressBar

  audio1.addEventListener("timeupdate", () => {
    const currentTime = audio1.currentTime;
    const duration = audio1.duration;
    const progress = (currentTime / duration) * 100;
    progressBar.style.width = progress + "%";

    const finalTimeData = document.querySelector(".final");

    // Update final duration
    const finalMinutes = Math.floor(duration / 60);
    const finalSeconds = Math.floor(duration % 60);

    // If final seconds is less than 10, add 0 as prefix
    const formattedFinalSeconds = finalSeconds < 10 ? "0" + finalSeconds : finalSeconds;

    finalTimeData.innerText = `${finalMinutes}:${formattedFinalSeconds}`;
  });



  //   ------------------- update the playing of song, based on where you click on the progressBar

  progressDetails.addEventListener("click", (e) => {
    const progressValue = progressDetails.clientWidth; // Get width of the progressBar
    const clickedOffsetX = e.offsetX; // Get offsetX value
    const musicDuration = audio1.duration; // Total music duration

    audio1.currentTime = (clickedOffsetX / progressValue) * musicDuration;
  });



  // ------------------------------------- button functionalities --------------------------

  // Repeat button
  repeatBtn.addEventListener('click', () => {
    audio1.currentTime = 0; // Reset the current time of the audio
  });



  // Shuffle button
  shuffleBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * songs.length); // Generate a random index
    currentIndex = randomIndex;
    

    loadData(currentIndex); // Load the data for the random song
    playSong(); // Play the random song
  });


  // Next button


  nextBtn.addEventListener('click', () => {
    currentIndex++; // Increment the index to move to the next song
    if (currentIndex >= songs.length) {
      currentIndex = 0; // Reset the index to 0 if it exceeds the length of the songs array
    }
    loadData(currentIndex); // Load the data for the next song
    playSong(); // Play the next song
  });



  // Previous button

  prevBtn.addEventListener('click', () => {
    currentIndex--; // Decrement the index to move to the previous song
    if (currentIndex < 0) {
      currentIndex = songs.length - 1; // Set the index to the last song if it goes below 0
    }
    loadData(currentIndex); // Load the data for the previous song
    playSong(); // Play the previous song
  });

  fastForwardBtn.addEventListener('click', () => {
    audio1.currentTime += 5; // Fast forward the song by 5 seconds
  });

  fastReverseBtn.addEventListener('click', () => {
    audio1.currentTime -= 5; // Rewind the song by 5 seconds
  });


  //   function loadData(index) {
  //     // Retrieve the song data based on the index
  //     const song = songs[index];

  //     // Update the song details and play the song
  //     const musicTitles = document.querySelector('.music-titles');
  //     const nameElement = musicTitles.querySelector('.name');
  //     const artistElement = musicTitles.querySelector('.artist');

  //     nameElement.textContent = song.name;
  //     artistElement.textContent = song.artist;

  //     // const audio = document.querySelector('.main-song');
  //     audio1.src = song.preview_url;
  //     // audio.play();
  //   }

  // }



  //   function playSong() {         
  //     const currentSong = songs[currentIndex];
  //     // const audio1 = document.querySelector("audio");

  //     if (currentSong) {
  //     //   audio1.src = currentSong.track.preview_url;
  //       audio1.src = currentSong.track.preview_url;
  //       audio1.play();
  //       updateProgressBar();
  //       updateSongDetails(currentSong);
  //       highlightTableRow(currentIndex);

  //       audio1.addEventListener('ended',()=>{
  //           stopCurrentSong();
  //           currentIndex = (currentIndex+1) % songs.length;
  //           loadData(currentIndex);
  //         playSong();
  //       });


  //     }
  //     }

  function stopCurrentSong() {
    audio1.pause();
    audio1.currentTime = 0;
    resetProgressBar();
    resetSongDetails();
    removeTableRowHighlight();
  }


  function updateProgressBar() {
    audio1.addEventListener("timeupdate", () => {
      const currentTime = audio1.currentTime;
      const duration = audio1.duration;
      const progress = (currentTime / duration) * 100;
      progressBar.style.width = progress + "%";
      currentTimeData.textContent = formatTime(currentTime);
    });
  }

  function resetProgressBar() {
    progressBar.style.width = "0%";
    currentTimeData.textContent = formatTime(0);
  }

  function updateSongDetails(song) {
    const songName = document.querySelector(".name");
    const artistName = document.querySelector(".artist");
    songName.textContent = song.track.album.name;
    artistName.textContent = song.track.album.artists[0].name;
  }

  function resetSongDetails() {
    const songName = document.querySelector(".name");
    const artistName = document.querySelector(".artist");
    songName.textContent = "";
    artistName.textContent = "";
  }

  function highlightTableRow(index) {
    const tableRows = document.querySelectorAll("#song-list tr");
    tableRows.forEach((row, i) => {
      if (i === index) {
        row.classList.add("active-song");
      } else {
        row.classList.remove("active-song");
      }
    });
  }

  function removeTableRowHighlight() {
    const tableRows = document.querySelectorAll("#song-list tr");
    tableRows.forEach((row) => {
      row.classList.remove("active-song");
    });
  }

  // Helper function to format time in mm:ss format
  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  
}


// const searchButton = document.getElementById('search-btn');
// const searchInput = document.getElementById('search-text');

// searchButton.addEventListener('click', () => {
//   const searchQuery = searchInput.value.trim();
//   if (searchQuery) {
//     // Perform the search and redirect to search.html
//     // const accessToken = localStorage.getItem('accessToken');

//     window.location.href = `search.html?query=${encodeURIComponent(searchQuery)}`;
//   }
// });




// localStorage.setItem('sharedAccessToken', accessToken);




const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search-text');

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    performSearch();
  }
});

function performSearch() {
  const searchQuery = searchInput.value.trim();
  if (searchQuery) {
    window.location.href = `search.html?query=${encodeURIComponent(searchQuery)}`;
  }
}




