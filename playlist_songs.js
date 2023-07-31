// const accessToken = localStorage.getItem('accessToken');
// console.log(accessToken);

fetch('https://api.spotify.com/v1/browse/featured-playlists', {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then(response => response.json())
  .then(data => {
    // console.log(data);

    const song_content  = document.getElementById('content');
    data.playlists.items.forEach((item) =>{


      // const playlistId  = item.id;
      // localStorage.getItem("playlistId");
      // localStorage.setItem('playlistId', playlist_id);
      // 37i9dQZF1DXcJMm7qL65rU
      // 37i9dQZF1DWV6eas0o9JXU
     
        // const playlistId= item.id;
        // console.log("playlist id: "+ playlistId);
    })})


        // console.log(localStorage.getItem("playlistId"));



        //// songs fetch API
const playlistId = "37i9dQZF1DWV6eas0o9JXU";
let currentlyPlayingAudio = null;
let currentlyPlayingRow = null;


// -------------------------------------SONG CONTROLS PROGRESS BAR starts-------------------



// const content = document.querySelector(".content");
// // const PlayImg= content.querySelector(".music-img img");
// const musicName = content.querySelector(".music-titles .name");
// const musicArtist  = content.querySelector(".music-titles .artist");
// //extra song Id
// const songId = content.querySelector(".music-titles .songId");

// const audio1  = document.querySelector(".main-song");
// playBtn = content.querySelector(".play-pause");
// playBtnIcon = content.querySelector(".play-pause span");
// prevBtn = content.querySelector("#prev1");
// nextBtn = content.querySelector("#next1");
// progressBar = content.querySelector(".progress-bar");
// progressDetails=  content.querySelector(".progress-details");

// repeatBtn1 = content.querySelector("#repeat1");
// shuffleBtn1 = content.querySelector("#shuffle1");


// -------------------------------------SONG CONTROLS PROGRESS BAR ends-------------------


  fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})
.then(response => response.json())
.then(data => {

//  count and give track no

  const totalTracks = data.total;
  console.log("total songs: "+ totalTracks);


  const tableBody = document.getElementById('song-list');
  const songs = data.items;
  console.log("songs"+songs);


  // const song_content= document.getElementById("song-content");
  let track_number = 1;

  

  songs.forEach((song) => {
      const songRow = document.createElement('tr');
      songRow.classList.add("song_table");

      const album = song.track.album;
      const song_url = song.track.preview_url;

      songRow.addEventListener("click", () => {

        const song_row = `
        <td>${track_number}</td>
        <td><img src= "${album.images[2].url}" alt= "${album.name}" /> </td>
        <td><audio controls><source src ="${song_url}" type="audio/mpeg"></audio></td>
        <td>${album.name} </td>
        <td>${album.artists[0].name}</td>
        <td>${millisToMinutesAndSeconds(song_duration_ms)}</td>
        `
        ;

        currentlyPlayingAudio = audioElement;
          currentlyPlayingRow = songRow;
          songRow.style.backgroundColor = "grey";

        const audioElement = songRow.querySelector('audio');

        if(currentlyPlayingAudio){
          currentlyPlayingAudio.pause();
          currentlyPlayingRow.style.backgroundColor = "";
  
        }

        songRow.innerHTML= song_row;
      song_content.appendChild(songRow);

        // loadData(index + 1);
        // playSong();
          // audioElement.play();
          
      
      });


     

      // track no:

      // const tracks = data.items;
      // const track_no_array[];


      // tracks.forEach((track, index)=>{
      //   const trackNumber = index + 1;
      //   const trackName = track.track.name;
      //   // console.log(`Song ${trackNumber}: ${trackName}`);
      // })
      // console.log(`Song ${trackNumber}: ${trackName}`);
  





    
      // console.log(song_url);

   

      const song_duration_ms  = song.track.duration_ms;
      // console.log(song_duration_ms);

      const millisToMinutesAndSeconds = (song_duration_ms) =>{
        var minutes = Math.floor(song_duration_ms / 60000);
        var seconds = ((song_duration_ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
      }

      


      // const audioElement = document.createElement('audio');


      // const song_audio  = document.createElement('audio');

      // const song_audio = song.track.uri;

      // song_audio = "spotify:track:4i4l9CUPZsXGp1j74E4y11";



      // const song_audio = song.track.uri;


      // song_audio.play();
    
   
   
      
      track_number++;

    });
    /// ---------------------------------------------------   SONG CONTROLS START   ------------------------------------------------------------ ///


 


  //   // let index  = 1;
  //   // let index  = track_number;

   


  //     function loadData(indexValue){
  //       console.log(indexValue);
  //       musicName.innerHTML = album.name;
  //       musicArtist.innerHTML = album.artists[0].name;
  //       console.log("music name"+musicName.innerHTML);
  //       console.log("artist"+musicArtist.innerHTML);
  //       // PlayImg.src = songs[indexValue-1].artwork;
  //       //extra song Id
  //       // songId.innerHTML=  songs[indexValue-1].id;
    
  //       // PlayImg.src = "/"+songs[indexValue-1].artwork;
  //       // <audio controls><source src ="${song_url}" type="audio/mpeg"></audio>
  //       audio1.src = song_url;
        
  //   }

  //   playBtn.addEventListener('click',()=>{
  //     const isMusicPaused  = content.classList.contains("paused");
  
  //     if(isMusicPaused){
  //         pauseSong();
  //     }
  
  //     else{
  //         playSong();
  //     }
  //   })


  //   function playSong(){
  //       content.classList.add("paused");
  //       playBtnIcon.innerHTML = "pause";
  //       audio1.play();
  //   }

  //   function pauseSong(){
  //       content.classList.remove("paused");
  //       playBtnIcon.innerHTML = "play_arrow";
  //       audio1.pause();
  //   }


  //   nextBtn.addEventListener("click",()=>{
  //     nextSong();
  //   })
  
  //   prevBtn.addEventListener("click",()=>{
  //       prevSong();
  //   })


  
  //   function nextSong(){
  //     index++;
  //     if(index >totalTracks){
  //         index=1;
  //     }

  //     else{
  //         index = index;
  //     }

  //     loadData(index);
  //     playSong();
  //   }

  //   function prevSong(){
  //     index--;
  //     if(index <=0){
  //         index=totalTracks;
  //     }

  //     else{
  //         index = index;
  //     }

  //     loadData(index);
  //     playSong();
  //   }


    // audio1.addEventListener("timeupdate",(e) =>{
    //   // console.log(e);
    //   // go to target to see current time and duration
  
    //   const initialTime = e.target.currentTime; // get current music time
    //   const finalTime  = e.target.duration; // get music duration
    //   let Barwidth = (initialTime/finalTime) * 100; // total time in prcentage
    //   progressBar.style.width= Barwidth+"%";
  
  
    //   progressDetails.addEventListener("click",(e)=>{
    //       let progressValue = progressDetails.clientWidth; // get width of the progressBar
    //       let clickedOffsetX = e.offsetX; // get offsetX value
    //       let musicDuration = audio1.duration; // total music duration
  
    //       audio1.currentTime = (clickedOffsetX/progressValue)*musicDuration;
    //   })
  
    //   // timer logic
    //   audio1.addEventListener("loadeddata",() =>{
    //       let finalTimeData = content.querySelector(".final");
  
    //       // update final duration
    //       let audioDuration= audio1.duration;
    //       let finalMinitues= Math.floor(audioDuration/60);
    //       let finalSeconds = Math.floor(audioDuration%60);
  
    //       // if final sec is less than 10 add 0 as prefix
    //       if(finalSeconds<10){
    //           finalSeconds = `0${finalSeconds}`;
    //       }
  
    //       finalTimeData.innerText  = `${finalMinitues}:${finalSeconds}`
    //   })
  
  
  //     let currentTimeData = content.querySelector(".current");
  //     let currentTime = audio1.currentTime;
  //     let currentMinutes = Math.floor(currentTime/60);
  //     let currentSeconds = Math.floor(currentTime%60);
  
  //     if(currentSeconds<10){
  //         currentSeconds  = `0${currentSeconds}`;
  //     }
  
  //     currentTimeData.innerText = `${currentMinutes}:${currentSeconds}`;
  
  
  //     // repeat btn
  
  //     repeatBtn1.addEventListener("click", ()=>{
  //         audio1.currentTime = 0;
  //     })
  
  
  //     shuffleBtn1.addEventListener('click',()=>{
  //         var randomIndex = Math.floor(Math.random() * songs.length) + 1;
  //         loadData(randomIndex);
  //         playSong();
  //     })
  
  
  //     audio1.addEventListener("ended",()=>{
  //         index++;
  //         if(index>songs.length){
  //             index = 1;
  //         }
  //         loadData(index);
  //         playSong();
  //     })
  
  
  
  //     var fastReverseFiveSec = document.getElementById("fast-reverse-five-sec");
  //     var fastForwardFiveSec = document.getElementById("fast-forward-five-sec");
  
  //     fastForwardFiveSec.addEventListener('click', ()=>{
  //         audio1.currentTime +=5;
  //        })
        
  //        fastReverseFiveSec.addEventListener('click', ()=>{
  //         audio1.currentTime -=5;
  //        })
  // })





  


  })
  .catch(error => {
  console.error('Error:', error);
})
  .catch(error => {
    console.error('Error fetching playlists:', error);
  });



  /// ---------------------------------------------------   SONG CONTROLS  REMAINING DATA  ------------------------------------------------------------ ///

  // const songs = new_songs.js;
// const songs = songs.json;


window.addEventListener("load",()=>{
  loadData(index);
  console.log("load fn")
  // audio1.play();
  });

























