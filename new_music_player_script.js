// const songs = new_songs.js;
// const songs = songs.json;


const content = document.querySelector(".content");
// const PlayImg= content.querySelector(".music-img img");
const musicName = content.querySelector(".music-titles .name");
const musicArtist  = content.querySelector(".music-titles .artist");
//extra song Id
const songId = content.querySelector(".music-titles .songId");

const audio1  = document.querySelector(".main-song");
playBtn = content.querySelector(".play-pause");
playBtnIcon = content.querySelector(".play-pause span");
prevBtn = content.querySelector("#prev1");
nextBtn = content.querySelector("#next1");
progressBar = content.querySelector(".progress-bar");
progressDetails=  content.querySelector(".progress-details");

repeatBtn1 = content.querySelector("#repeat1");
shuffleBtn1 = content.querySelector("#shuffle1");


let index  = 1;

window.addEventListener("load",()=>{
loadData(index);
// audio1.play();
});


function loadData(indexValue){
    musicName.innerHTML = songs[indexValue -1].title;
    musicArtist.innerHTML = songs[indexValue -1].artist;
    // PlayImg.src = songs[indexValue-1].artwork;
    //extra song Id
    songId.innerHTML=  songs[indexValue-1].id;

    // PlayImg.src = "/"+songs[indexValue-1].artwork;
    audio1.src = songs[indexValue-1].url;
    
}


playBtn.addEventListener('click',()=>{
    const isMusicPaused  = content.classList.contains("paused");

    if(isMusicPaused){
        pauseSong();
    }

    else{
        playSong();
    }
})

function playSong(){
    content.classList.add("paused");
    playBtnIcon.innerHTML = "pause";
    audio1.play();
}

function pauseSong(){
    content.classList.remove("paused");
    playBtnIcon.innerHTML = "play_arrow";
    audio1.pause();
}

nextBtn.addEventListener("click",()=>{
    nextSong();
})

prevBtn.addEventListener("click",()=>{
    prevSong();
})

function nextSong(){
    index++;
    if(index >songs.length){
        index=1;
    }

    else{
        index = index;
    }

    loadData(index);
    playSong();
}

function prevSong(){
    index--;
    if(index <=0){
        index=songs.length;
    }

    else{
        index = index;
    }

    loadData(index);
    playSong();
}


audio1.addEventListener("timeupdate",(e) =>{
    // console.log(e);
    // go to target to see current time and duration

    const initialTime = e.target.currentTime; // get current music time
    const finalTime  = e.target.duration; // get music duration
    let Barwidth = (initialTime/finalTime) * 100; // total time in prcentage
    progressBar.style.width= Barwidth+"%";


    progressDetails.addEventListener("click",(e)=>{
        let progressValue = progressDetails.clientWidth; // get width of the progressBar
        let clickedOffsetX = e.offsetX; // get offsetX value
        let musicDuration = audio1.duration; // total music duration

        audio1.currentTime = (clickedOffsetX/progressValue)*musicDuration;
    })

    // timer logic
    audio1.addEventListener("loadeddata",() =>{
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


    audio1.addEventListener("ended",()=>{
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







