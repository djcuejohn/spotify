console.log("Welcome to Spotify");

let songindex = 0;
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let currentSongTitle = document.getElementById('currentSongTitle');
let songitems = Array.from(document.getElementsByClassName('songitem'));
let audioElement = new Audio();

let songs = [
    { songnames: "EASY ON ME REMIX", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songnames: "ALONE WITH YOU MUSICMIX", filePath: "songs/2.mp3", coverPath: "covers/1.jpg" },
    { songnames: "YOUR LOVE MUSICMIX", filePath: "songs/3.mp3", coverPath: "covers/1.jpg" },
    { songnames: "25 MINUTES_WAYNE DOMINIC RECORDS", filePath: "songs/4.mp3", coverPath: "covers/1.jpg" },
    { songnames: "LIPS OF AN ANGEL MUSICMIX)", filePath: "songs/5.mp3", coverPath: "covers/1.jpg" },
    { songnames: "SAID I LOVE YOU BUT I LIED MUSICMIX", filePath: "songs/6.mp3", coverPath: "covers/1.jpg" },
    { songnames: "SOME HEARTS ARE DIAMONDS_WAYNE DOMINIC RECORDS", filePath: "songs/7.mp3", coverPath: "covers/1.jpg" },
    { songnames: "CHRISTMAS TIKTOK REMIX BISAYANG DAKO TV", filePath: "songs/8.mp3", coverPath: "covers/1.jpg" },
    { songnames: "Classic Hip Hop RNB 2000S 7", filePath: "songs/9.mp3", coverPath: "covers/1.jpg" },
    { songnames: "HIP HOP RNB Classic 90s 2000s Mix 5", filePath: "songs/10.mp3", coverPath: "covers/1.jpg" },
    { songnames: "HIP HOP RNB Classic 90s 2000s Mix 6", filePath: "songs/11.mp3", coverPath: "covers/1.jpg" },
    { songnames: "Mix Hip Hop RNB Old School 8", filePath: "songs/12.mp3", coverPath: "covers/1.jpg" },
    { songnames: "SINULOG 2024 REMIX_BisayangDako", filePath: "songs/SINULOG 2024 REMIX - NONSTOP SINULOG 2024 DANCE.mp3", coverPath: "covers/1.jpg" },
];

// Initialize song items
songitems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByTagName("span")[0].innerText = songs[i].songnames;
});

// Play and highlight song
function playSong(index) {
    songindex = index;
    audioElement.src = songs[songindex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    currentSongTitle.innerText = `🎵 Now Playing: ${songs[songindex].songnames}`;
    highlightActiveSong();
}

// Highlight active song visually
function highlightActiveSong() {
    songitems.forEach((item, i) => {
        item.classList.toggle('active', i === songindex);
    });
}

// Master play/pause
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong(songindex);
    } else {
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Stop button
document.getElementById('stop').addEventListener('click', () => {
    audioElement.pause();
    audioElement.currentTime = 0;
    masterplay.classList.remove('fa-pause-circle');
    masterplay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
    currentSongTitle.innerText = `🎵 No songs played!!!`;
});

// Shuffle button
document.getElementById('shuffle').addEventListener('click', () => {
    let randomIndex = Math.floor(Math.random() * songs.length);
    playSong(randomIndex);
});

// Volume control
document.getElementById('volume').addEventListener('input', (e) => {
    audioElement.volume = e.target.value;
});

// Progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogressbar.value = progress;
});

myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = (myprogressbar.value * audioElement.duration) / 100;
});

// Individual song play
Array.from(document.getElementsByClassName('startitemplay')).forEach((element, i) => {
    element.addEventListener('click', () => {
        makeallplay();
        element.classList.remove('fa-play-circle');
        element.classList.add('fa-pause-circle');
        playSong(i);
    });
});

// Reset all play buttons
function makeallplay() {
    Array.from(document.getElementsByClassName('startitemplay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}

// Next button
document.getElementById('next').addEventListener('click', () => {
    songindex = (songindex + 1) % songs.length;
    playSong(songindex);
});

// Previous button
document.getElementById('previous').addEventListener('click', () => {
    songindex = (songindex - 1 + songs.length) % songs.length;
    playSong(songindex);
});

// Auto-play next track in proper order
audioElement.addEventListener('ended', () => {
    songindex = (songindex + 1) % songs.length;
    playSong(songindex);
});
