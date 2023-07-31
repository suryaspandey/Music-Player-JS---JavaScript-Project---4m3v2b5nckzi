// login 


  // const accessToken = localStorage.getItem('accessToken');
  // console.log("token: ", accessToken);



  // function renderPlaylists(playlists) {
  //   const playlistContainer = document.getElementById('playlist-container');
  
  //   playlists.forEach(playlist => {
  //     const playlistElement = document.createElement('div');
  //     playlistElement.className = 'playlist';
  
  //     const playlistName = document.createElement('h3');
  //     playlistName.textContent = playlist.name;
  
  //     const playlistDescription = document.createElement('p');
  //     playlistDescription.textContent = playlist.description;
  
  //     playlistElement.appendChild(playlistName);
  //     playlistElement.appendChild(playlistDescription);
  //     playlistContainer.appendChild(playlistElement);
  //   });
  // }

  const playist_info = [
   { id:1,
    description:"Description 1",
    img_url: "spotify_playlistCard1.png"
  },

  { id:2,
    description:"Description 2",
    img_url: "spotify_playlistCard1.png"
  },

  { id:3,
    description:"Description 3",
    img_url: "spotify_playlistCard1.png"
  },

  { id:4,
    description:"Description 4",
    img_url: "spotify_playlistCard1.png"
  },

  ];

  // const playlist_container = document.getElementById("playlist-container");

  // playist_info.forEach((data) =>{
  //   const card = document.createElement('div');
  //   card.className = "card"
  //   // card.classList.add("card");

  //   var card_contents  =
  //   `
  //  <p> ${card.id} </p>
  //  <p> ${card.description} </p>
  //  <img src="${card.img_url}">
  //   `
  // })

  // card.innerHTML = card_contents;

  // playlist_container.append(card);





// fetch('https://api.spotify.com/v1/browse/featured-playlists', {
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },
// })
//   .then(response => response.json())
//   .then(data => {
//     // Handle the response data here
//     console.log(data);
//  // Render the playlists on your webpage


//     // renderPlaylists(data.playlists.items);
//     // console.log(data);

//     // data.forEach(element =>{
//     //   const {description,href, url} = element;

//     //   const card = document.createElement('div');
//     //   card.classList.add("card");
//     //   // console.log(element);


//     //   card.innerHTML = `
//     //   <img src="${href}">
//     //   <p id="track-name">${description}</p>
//     //   <p id="track-artist">${url}</p>

//     //   `
//     // });
//     // playlist_container.appendChild(card);

    
//   })


  // .catch(error => {
  //   // Handle any errors that occur during the API request
  //   console.error('Error fetching playlists:', error);
  // });






// --------------------------------------------------------------------------------------------- //


const music = [
    {
      "title": "Death Bed",
      "artist": "Powfu",
      "artwork": "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
      "url": "https://samplesongs.netlify.app/Death%20Bed.mp3",
      "id": "1"
    },
    {
      "title": "Bad Liar",
      "artist": "Imagine Dragons",
      "artwork": "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
      "url": "https://samplesongs.netlify.app/Bad%20Liar.mp3",
      "id": "2"
    },
    {
      "title": "Faded",
      "artist": "Alan Walker",
      "artwork": "https://samplesongs.netlify.app/album-arts/faded.jpg",
      "url": "https://samplesongs.netlify.app/Faded.mp3",
      "id": "3"
    },
    {
      "title": "Hate Me",
      "artist": "Ellie Goulding",
      "artwork": "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
      "url": "https://samplesongs.netlify.app/Hate%20Me.mp3",
      "id": "4"
    },
    {
      "title": "Solo",
      "artist": "Clean Bandit",
      "artwork": "https://samplesongs.netlify.app/album-arts/solo.jpg",
      "url": "https://samplesongs.netlify.app/Solo.mp3",
      "id": "5"
    },
    {
      "title": "Without Me",
      "artist": "Halsey",
      "artwork": "https://samplesongs.netlify.app/album-arts/without-me.jpg",
      "url": "https://samplesongs.netlify.app/Without%20Me.mp3",
      "id": "6"
    },
    {
        "title": "Death Bed",
        "artist": "Powfu",
        "artwork": "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
        "url": "https://samplesongs.netlify.app/Death%20Bed.mp3",
        "id": "7"
      },
      {
        "title": "Bad Liar",
        "artist": "Imagine Dragons",
        "artwork": "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
        "url": "https://samplesongs.netlify.app/Bad%20Liar.mp3",
        "id": "8"
      },
      {
        "title": "Faded",
        "artist": "Alan Walker",
        "artwork": "https://samplesongs.netlify.app/album-arts/faded.jpg",
        "url": "https://samplesongs.netlify.app/Faded.mp3",
        "id": "9"
      },
      {
        "title": "Hate Me",
        "artist": "Ellie Goulding",
        "artwork": "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
        "url": "https://samplesongs.netlify.app/Hate%20Me.mp3",
        "id": "10"
      },
      {
        "title": "Solo",
        "artist": "Clean Bandit",
        "artwork": "https://samplesongs.netlify.app/album-arts/solo.jpg",
        "url": "https://samplesongs.netlify.app/Solo.mp3",
        "id": "11"
      },
      {
        "title": "Without Me",
        "artist": "Halsey",
        "artwork": "https://samplesongs.netlify.app/album-arts/without-me.jpg",
        "url": "https://samplesongs.netlify.app/Without%20Me.mp3",
        "id": "12"
      }
  ];



  var audio = document.getElementById("audio");

  var source = document.getElementById("audioSource");

  var playToggle = false;

  var activeMusic = 1;

  var playIcon = document.getElementById("play-button-icon");

  // var repeatBtn = document.getElementById("repeat");

  // var shuffleBtn = document.getElementById("shuffle");

  var fastReverseFiveSec = document.getElementById("fast-reverse-five-sec");
  var fastForwardFiveSec = document.getElementById("fast-forward-five-sec");



  // for(let i= 0; i<music.length;i++){
  //   document.getElementById('song-list').innerHTML += 
  //   `<tr class="tracks" id = 'track${music[i].id}'  onClick = "playMusic('${music[i].url}','${music[i].id}');">
  //           <td>${music[i].id}</td>
  //           <td><img src="${music[i].artwork}" alt="logo" height="50px" width="auto"></td>

  //           <td>${music[i].title}</td>
  //           <td>${music[i].artist}</td>
  //       </tr>`;
  // };

function playMusic(src,id){

    source.src = src;
    audio.load();
    audio.play();

    var elements= document.getElementsByClassName("tracks");

    for(let i= 0 ;i<elements.length;i++){
      elements[i].classList.remove("active");
    }
    
    activeMusic = id;
    playToggle = true;

    document.getElementById('track'+id).classList.add('active');
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
  }

  function playPause(){

    // var music = getActiveMusic(activeMusic);
    // source.src = music.song;

    if(playToggle === true){
    //   document.getElementById('play-button-icon').classList.remove('fa-play');
    // document.getElementById('play-button-icon').classList.add('fa-pause');

      playIcon.classList.replace('fa-pause','fa-play');
      playToggle = false;
      audio.pause();
    }
    
    else{
      playIcon.classList.replace('fa-play','fa-pause');
      playToggle = true;
      audio.play();
    }



    // playToggle = (playToggle == false) ? true:false;
    // playIcon.className = (playToggle ==false) ? "fa fa-pause" : "fa fa-play";
    // (playToggle == false) ? audio.play() : audio.pause();
  }


  function next(){
    let nextMusicId= parseInt(activeMusic)+1;
    // let nextMusicId= (activeMusic)+1;

    var gotMusic = (nextMusicId <= music.length) ? getActiveMusic(nextMusicId) : getActiveMusic(1);
    playMusic(gotMusic.song, gotMusic.id);
    // console.log(gotMusic.song[nextMusicId]);
    // console.log("next");
    // audio.play();

  }

  function prev(){
    let prevMusicId= parseInt(activeMusic)-1;
    var gotMusic= (prevMusicId > 1) ? getActiveMusic(prevMusicId) : getActiveMusic(1);
    playMusic(gotMusic.song, gotMusic.id);
    audio.play();
  }

  function getActiveMusic(id){

    for(var i =0;i<music.length;i++){

      if(music[i].id == id){
        return music[i];
      }
    }
  }

//  repeatBtn.addEventListener('click',()=>{
//   audio.currentTime = 0;

//  })

//  shuffleBtn.addEventListener('click',()=>{
//   var randomIndex = Math.floor(Math.random() * songs.length) + 1;
//   loadData(randomIndex);
//   playSong();
// })

//  fastForwardFiveSec.addEventListener('click', ()=>{
//   audio.currentTime +=5;
//  })

//  fastReverseFiveSec.addEventListener('click', ()=>{
//   audio.currentTime -=5;
//  })






  // new_music_player_script.js content

// const content = document.querySelector(".content");
// const PlayImg= content.querySelector(".music-img img");
// const musicName = content.querySelector(".music-titles .name");
// const musicArtist  = content.querySelector(".music-titles .artist");
// //extra song Id
// const songId = content.querySelector(".music-titles .songId");

// const audio  = document.querySelector(".main-song");
// playBtn = content.querySelector(".play-pause");
// playBtnIcon = content.querySelector(".play-pause span");
// prevBtn = content.querySelector("#prev");
// nextBtn = content.querySelector("#next");
// progressBar = content.querySelector(".progress-bar");
// progressDetails=  content.querySelector(".progress-details");

// repeatBtn = content.querySelector("#repeat");
// shuffleBtn = content.querySelector("#shuffle");

//   let index  = 1;


// prevBtn = content.querySelector("#prev");
// nextBtn = content.querySelector("#next");


// function loadData(indexValue){
//   musicName.innerHTML = songs[indexValue -1].title;
//   musicArtist.innerHTML = songs[indexValue -1].artist;
//   PlayImg.src = songs[indexValue-1].artwork;
//   //extra song Id
//   songId.innerHTML=  songs[indexValue-1].id;

//   // PlayImg.src = "/"+songs[indexValue-1].artwork;
//   audio.src = songs[indexValue-1].url;
  
// }

// nextBtn.addEventListener("click",()=>{
//   nextSong();
// })

// prevBtn.addEventListener("click",()=>{
//   prevSong();
// })


// function nextSong(){
//   index++;
//   if(index >songs.length){
//       index=1;
//   }

//   else{
//       index = index;
//   }

//   loadData(index);
//   playSong();
// }

// function prevSong(){
//   index--;
//   if(index <=0){
//       index=songs.length;
//   }

//   else{
//       index = index;
//   }

//   loadData(index);
//   playSong();
// }








