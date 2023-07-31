const accessToken = localStorage.getItem('sharedAccessToken');


fetch("https://api.spotify.com/v1/me", {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then(response => response.json())
  .then(data => {

    console.log(data);


    const userDisplayName = data.display_name;
    const userName = document.getElementById('login_btn');

    userName.textContent = userDisplayName;

  })
  .catch(error => {
    console.error('Error fetching userName:', error);
  });




console.log(accessToken);
console.log("hello search 111");


// -----------------------      new code below on 24-07-2023   ---------------


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
const playPauseBtn = document.querySelector(".play-pause-icon");
const pauseIcon = document.querySelector('.pause-icon');



document.addEventListener('DOMContentLoaded', () => {
  const searchParams = new URLSearchParams(window.location.search);
  const searchQuery = searchParams.get('query');

  const searchEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track`;

  fetch(searchEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      const searchResults = data.tracks.items.map(item => ({
        iconImg: item.album.images[0].url,
        name: item.name,
        artist: item.artists[0].name,
        preview_url: item.preview_url,
      }));

      const searchResultsContainer = document.querySelector('#search-results tbody');
      const audioPlayer = document.querySelector('#audio-player');


      let currentlyPlayingRow = null;

      

      searchResults.forEach((result,index) => {
        const row = document.createElement('tr');


        const iconCell = document.createElement('td');
        const icon = document.createElement('img');
        icon.src = result.iconImg;
        icon.alt = result.name;
        icon.style.width = '50px';
        icon.style.height = '50px';
        iconCell.appendChild(icon);
        row.appendChild(iconCell);

        // <img width="200px" height="200px" src="${item.images[0].url}" alt="${item.name}"></img>

        const nameCell = document.createElement('td');
        nameCell.textContent = result.name;
        row.appendChild(nameCell);

        const artistCell = document.createElement('td');
        artistCell.textContent = result.artist;
        row.appendChild(artistCell);

        row.addEventListener('click', () => {
          // audioPlayer.src = result.preview_url;
          // audioPlayer.play();

          // if (currentlyPlayingRow) {
          //   currentlyPlayingRow.classList.remove('playing');
          // }
          // row.classList.add('playing');
          // currentlyPlayingRow = row;
          playSong(index); 



          // ---------- new -----------
          const musicTitles = document.querySelector('.music-titles');
          const nameElement = musicTitles.querySelector('.name');
          const artistElement = musicTitles.querySelector('.artist');
          nameElement.textContent = result.name;
          artistElement.textContent = result.artist;
        });


        searchResultsContainer.appendChild(row);
      });

      audioPlayer.addEventListener('ended', () => {
        if (currentlyPlayingRow) {
          currentlyPlayingRow.classList.remove('playing');
          currentlyPlayingRow = null;
        }
      })

      let currentSongIndex = -1;
      
      let songs = [];

      function playSong(index) {
        if (index >= 0 && index < songs.length) {
          // if (currentlyPlayingRow) {
          //   currentlyPlayingRow.classList.remove("playing");
          // }

          pauseSong();
          // Update the currently playing song index
          currentSongIndex = index;
          highlightTableRow(currentSongIndex);
          currentSongIndex = index;
          const song = songs[currentSongIndex];
          audioPlayer.src = song.preview_url;
          audioPlayer.play();
    
          // Update play/pause button icon to "pause"
          playPauseBtn.textContent = 'pause';
        }
      }


      function pauseSong() {
        audioPlayer.pause();
        // Update play/pause button icon to "play"
        playPauseBtn.textContent = 'play_arrow';

        if (currentlyPlayingRow) {
          currentlyPlayingRow.classList.remove("playing");
        }
        // removeTableRowHighlight();
      }

      function playNextSong() {
        const nextIndex = currentSongIndex + 1;

        if (nextIndex >= songs.length) {
          // If it reaches the end of the playlist, stop playing
          pauseSong();
        } else {
          playSong(nextIndex);
        }
        // highlightTableRow(currentSongIndex);
      }

      function playPreviousSong() {
        const prevIndex = currentSongIndex - 1;
        if (prevIndex < 0) {
          // If it reaches the beginning of the playlist, play the first song
          playSong(0);
        } else {
          playSong(prevIndex);
        }
        // highlightTableRow(currentSongIndex);
      }

      // Event listener for play/pause button click
    playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
      playSong(currentSongIndex);
    } else {
      pauseSong();
    }
    });

    nextBtn.addEventListener('click', () => {
      playNextSong();
    });

    prevBtn.addEventListener('click', () => {
      playPreviousSong();
    });

    // Event listener for updating the progress bar
  audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const progress = (currentTime / duration) * 100;
    progressBar.style.width = progress + '%';

    // Update current time
    currentTimeData.textContent = formatTime(currentTime);
  });

  function highlightTableRow(index) {
    const tableRows = document.querySelectorAll("#search-results tbody tr");
    tableRows.forEach((row, i) => {
      if (i === index) {
        row.classList.add("active-song");
        currentlyPlayingRow = row;
      } else {
        row.classList.remove("active-song");
      }
    });
  }

  function removeTableRowHighlight() {
    const tableRows = document.querySelectorAll("#search-results tbody tr");
    tableRows.forEach((row) => {
      row.classList.remove("active-song");
    });
  }


  // Event listener for clicking on the progress bar to seek the song
  progressDetails.addEventListener('click', (e) => {
    const progressValue = progressDetails.clientWidth;
    const clickedOffsetX = e.offsetX;
    const musicDuration = audioPlayer.duration;

    audioPlayer.currentTime = (clickedOffsetX / progressValue) * musicDuration;
    highlightTableRow(currentSongIndex);
  });

  repeatBtn.addEventListener('click', () => {
    audio1.currentTime = 0;
    highlightTableRow(currentSongIndex);
    // Handle repeat functionality here (e.g., loop through the playlist, repeat current song, etc.)
  });

  // Event listener for shuffle button click
  shuffleBtn.addEventListener('click', () => {
    // Handle shuffle functionality here (e.g., shuffle the playlist)
    const randomIndex = Math.floor(Math.random()*songs.length);
    currentIndex = randomIndex;
    highlightTableRow(currentSongIndex);
  });

  // Helper function to format time in mm:ss format
  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // Load the songs from the search results
  songs = searchResults;

  function resetProgressBar() {
    progressBar.style.width = '0%';
    currentTimeData.textContent = '0:00';
  }

  // Event listener for when the song finishes playing
  audioPlayer.addEventListener('ended', () => {
    resetProgressBar();
    pauseSong();
    removeTableRowHighlight();
  });


      fastForwardBtn.addEventListener('click', () => {
        audioPlayer.currentTime += 5;
      });

      fastReverseBtn.addEventListener('click', () => {
        audioPlayer.currentTime -= 5;
      });

    })
    .catch(error => {
      console.error('Error fetching search results:', error);
    });
});
