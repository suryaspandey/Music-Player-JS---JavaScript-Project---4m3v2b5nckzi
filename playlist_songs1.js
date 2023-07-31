// const accessToken = localStorage.getItem('accessToken');
// console.log(accessToken);
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

})
.catch(error => {
    console.error('Error fetching userName:', error);
  });


// displaying songs in table

const playlistId = "37i9dQZF1DWV6eas0o9JXU";
let currentAudio = null;
let currentSongRow = null;


fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response =>{
    return response.json()
  })
  .then(data =>{
    const tracks = data.items;
    // console.log(tracks);


    const tableBody = document.getElementById('song-list');
    let track_number =1;




    function playSong(song_row) {
        const audio = song_row.querySelector('audio');
  
        if (currentAudio) {
          currentAudio.pause();
          currentSongRow.classList.remove('playing');
        }
  
        audio.play();
  
        currentAudio = audio;
        currentSongRow = song_row;
  
        song_row.classList.add('playing');
        const playPauseBtn = song_row.querySelector('.play-pause');
        playPauseBtn.innerHTML = '<span class="material-symbols-rounded play-pause">pause</span>';
      }



    function playNextSong() {
        const nextSongRow = currentSongRow.nextElementSibling;
        if (nextSongRow) {
          playSong(nextSongRow);
        }
      }

    tracks.forEach(track => {
        const album = track.track.album;
        const song_url = track.track.preview_url
        const song_duration_ms = track.track.duration_ms;

        console.log(album);
        console.log(song_url);
        console.log(song_duration_ms);
        console.log(album.images[2].url);
        console.log(album.name);
        console.log(album.artists[0].name);



    //   Create a new table row (song_row)
      const song_row = document.createElement('tr');

       song_row.innerHTML = `
       <td>${track_number}</td>
       <td><img src= "${album.images[2].url}" alt= "${album.name}" /> </td>
       <td><audio src="${song_url}"></audio></td>
       <td>${album.name}</td>
       <td>${album.artists[0].name}</td>
       <td>${millisToMinutesAndSeconds(song_duration_ms)}</td>
     `;

        track_number++;



// adding code for song row event ilstenre

song_row.addEventListener('click',()=>{
    const audio= song_row.querySelector('audio');

    if(audio.paused){
        playSong(song_row);

        // if(currentAudio){
        //     currentAudio.pause();
        //     const currentRow = currentAudio.parentNode.parentNode;
        //     currentRow.classList.remove('playing');
        // }

        // audio.play();

        // currentAudio = audio;
        // song_row.classList.add('playing');
        // playPauseBtn.innerHTML = '<span class="material-symbols-rounded play-pause">pause</span>';
    }
    else {
        audio.pause();
        song_row.classList.remove('playing');
        const playPauseBtn = song_row.querySelector('.play-pause');
        playPauseBtn.innerHTML = '<span class="material-symbols-rounded play-pause">play_arrow</span>';
        
      }

    //   if (audio.currentTime === audio.duration) {
    //     playNextSong(song_row);
    //   }

});

    // const playPauseBtn = song_row.querySelector('.play-pause');
    // audio.addEventListener('ended',()=>{
    //     song_row.classList.remove('playing');
    //     playPauseBtn.innerHTML = '<span class="material-symbols-rounded play-pause">play_arrow</span>';

    //     playNextSong(song_row);

    //     // const nextSongRow = song_row.nextElementSibling;
    //     // if(nextSongRow){
    //     //     nextSongRow.click();
    //     // }
    // });

    tableBody.appendChild(song_row);

//  end of song row add event listener


    });
  })
  .catch(error => {
    console.log('Error:', error);
  });



// Function to convert milliseconds to minutes and seconds format
function millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }


// Update progress bar and time display
function updateProgressBar() {
    if (currentAudio) {
      const progress = currentAudio.currentTime / currentAudio.duration;
      const progressBar = document.querySelector('.progress-bar span');
      progressBar.style.width = (progress * 100) + '%';
  
      const currentTime = document.querySelector('.current');
      currentTime.textContent = formatTime(currentAudio.currentTime);
  
      const finalTime = document.querySelector('.final');
      finalTime.textContent = formatTime(currentAudio.duration);
    }
  }

// Format time in minutes and seconds
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
  }

// Update progress bar when the audio is playing
setInterval(updateProgressBar, 1000)


// Handle seeking in the progress bar
const progressBar = document.querySelector('.progress-bar');
progressBar.addEventListener('click', (event) => {
  if (currentAudio) {
    const progressWidth = progressBar.offsetWidth;
    const clickPosition = event.offsetX;
    const progress = clickPosition / progressWidth;
    currentAudio.currentTime = currentAudio.duration * progress;
  }
});

// --------------------------------- Working till above -------------------------//
const audio1  = document.querySelector(".main-song");
    

audio.addEventListener("timeupdate",(e) =>{
    // console.log(e);
    // go to target to see current time and duration

    const initialTime = e.target.currentTime; // get current music time
    const finalTime  = e.target.duration; // get music duration
    let Barwidth = (initialTime/finalTime) * 100; // total time in prcentage
    progressBar.style.width= Barwidth+"%";


    progressDetails.addEventListener("click",(e)=>{
        let progressValue = progressDetails.clientWidth; // get width of the progressBar
        let clickedOffsetX = e.offsetX; // get offsetX value
        let musicDuration = audio.duration; // total music duration

        audio.currentTime = (clickedOffsetX/progressValue)*musicDuration;
    })

    // timer logic
    audio.addEventListener("loadeddata",() =>{
        let finalTimeData = content.querySelector(".final");

        // update final duration
        let audioDuration= audio1.duration;
        let finalMinitues= Math.floor(audioDuration/60);
        let finalSeconds = Math.floor(audioDuration%60);

        // if final sec is less than 10 add 0 as prefix
        if(finalSeconds<10){
            finalSeconds = `0${finalSeconds}`;
        }

        finalTimeData.innerText  = `${finalMinitues}:${finalSeconds}`
    })


    let currentTimeData = content.querySelector(".current");
    let currentTime = audio1.currentTime;
    let currentMinutes = Math.floor(currentTime/60);
    let currentSeconds = Math.floor(currentTime%60);

    if(currentSeconds<10){
        currentSeconds  = `0${currentSeconds}`;
    }

    currentTimeData.innerText = `${currentMinutes}:${currentSeconds}`;


    // repeat btn

    repeatBtn1.addEventListener("click", ()=>{
        audio1.currentTime = 0;
    })


    shuffleBtn1.addEventListener('click',()=>{
        var randomIndex = Math.floor(Math.random() * songs.length) + 1;
        loadData(randomIndex);
        playSong();
    })


    audio.addEventListener("ended",()=>{
        index++;
        if(index>songs.length){
            index = 1;
        }
        loadData(index);
        playSong();
    })



    var fastReverseFiveSec = document.getElementById("fast-reverse-five-sec");
    var fastForwardFiveSec = document.getElementById("fast-forward-five-sec");

    fastForwardFiveSec.addEventListener('click', ()=>{
        audio1.currentTime +=5;
       })
      
       fastReverseFiveSec.addEventListener('click', ()=>{
        audio1.currentTime -=5;
       })
})