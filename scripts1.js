console.log("Welcome to Spotify");
let songindex=0;
let masterplay= document.getElementById('masterplay');
let myprogressbar= document.getElementById('myprogressbar');
let gif= document.getElementById('gif'); 
let songitems=Array.from(document.getElementsByClassName('songitem'));
let songs=[

    {songnames: "EASY ON ME REMIX",filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songnames: "ALONE WITH YOU MUSICMIX",filePath:"songs/2.mp3", coverPath:"covers/1.jpg"},
    {songnames: "YOUR LOVE MUSICMIX",filePath:"songs/3.mp3", coverPath:"covers/1.jpg"},
    {songnames: "25 MINUTES_WAYNE DOMINIC RECORDS",filePath:"songs/4.mp3", coverPath:"covers/1.jpg"},
    {songnames: "LIPS OF AN ANGEL MUSICMIX)",filePath:"songs/5.mp3", coverPath:"covers/1.jpg"},
    {songnames: "SAID I LOVE YOU BUT I LIED MUSICMIX",filePath:"songs/6.mp3", coverPath:"covers/1.jpg"},
    {songnames: "SOME HEARTS ARE DIAMONDS_WAYNE DOMINIC RECORDS",filePath:"songs/7.mp3", coverPath:"covers/1.jpg"},
    {songnames: "CHRISTMAS TIKTOK REMIX BISAYANG DAKO TV",filePath:"songs/8.mp3", coverPath:"covers/1.jpg"},
    {songnames: "Classic Hip Hop RNB 2000S 7",filePath:"songs/9.mp3", coverPath:"covers/1.jpg"},
    {songnames: "HIP HOP RNB Classic 90s 2000s Mix 5",filePath:"songs/10.mp3", coverPath:"covers/1.jpg"},
    {songnames: "HIP HOP RNB Classic 90s 2000s Mix 6",filePath:"songs/11.mp3", coverPath:"covers/1.jpg"},
    {songnames: "Mix Hip Hop RNB Old School 8",filePath:"songs/12.mp3", coverPath:"covers/1.jpg"},
    {songnames: "SINULOG 2024 REMIX_BisayangDako",filePath:"songs/SINULOG 2024 REMIX - NONSTOP SINULOG 2024 DANCE.mp3", coverPath:"covers/1.jpg"},


];

songitems.forEach((element,i)=>{
//    console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByTagName("span")[0].innerText = songs[i].songnames;

})

let audioElement =new Audio;
audioElement.play();

masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {  audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');     
        gif.style.opacity=1; 
    }
    else 
    {  audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity=0;     
    }
})

audioElement.addEventListener('timeupdate',()=>
{
    progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value=progress;
})
myprogressbar.addEventListener('change',()=>{
audioElement.currentTime=(myprogressbar.value * audioElement.duration)/100;

})

 const makeallplay = ()=>{
Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

})
}
Array.from(document.getElementsByClassName('startitemplay')).forEach((element)=>{
element.addEventListener('click',(e)=>{
     makeallplay();
    //console.log(e.target);
    songindex=parseInt(e.target.id);
   
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');

audioElement.src=`songs/${songindex}.mp3`;
audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})
})
document.getElementById('next').addEventListener('click',()=>{
if(songindex>7)
{
    songindex=0; 
}
else
{
    songindex+=1;
}
audioElement.src=`songs/${songindex}.mp3`;
audioElement.currentTime=0;
    audioElement.play();
-    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songindex<=0)
    {
        songindex=0;
    }
    else
    {
        songindex+=1;}
    audioElement.src=`songs/${songindex}.mp3`;
    audioElement.currentTime=0;
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
    
    })
