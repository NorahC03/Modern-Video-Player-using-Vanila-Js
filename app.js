const video = document.querySelector("video");
const playBtn = document.getElementById("play-btn");
const volumeBar = document.querySelector(".volume-bar");
const volumeRange = document.querySelector(".volume-range");
const volumeIcon = document.getElementById("volume-icon");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const speed = document.querySelector('.player-Rate');
const player = document.querySelector('.player');
const Fullscreen = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //
function Ended() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute("title", "play");
}

function tooglePlay() {
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute("title", "pause");
    } else {
        video.pause();
        Ended();

    }
}


// Progress Bar ---------------------------------- //
function displayTime(time) {
    const minutes = Math.floor(time / 60);
    let second = Math.floor(time % 60);
    second = second < 9 ? `0${second}` : second;
    return `${minutes}:${second}`;

}

function updateProgress() {
    // console.log(Math.floor(video.currentTime / video.duration * 100));
    progressBar.style.width = `${Math.floor(video.currentTime / video.duration * 100)}%`;
    console.log(video.currentTime);
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = displayTime(video.duration);
}
//Calculate Display Time
function seekProgress(e) {
    const Time = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${Time*100}%`;
    video.currentTime = Time * video.duration;
    // // console.log(Math.floor(currentTime * 10));
    // console.log((Time * video.duration));
}


// Volume Controls --------------------------- //
function updateVolume(e) {
    let defaultVolume = 1;
    let currentVol = e.offsetX / volumeRange.offsetWidth;
    if (currentVol < 0.1) {
        currentVol = 0;
    }
    if (currentVol > 0.9) {
        currentVol = 1;
    }
    // console.log(Math.round(currentVol));
    volumeBar.style.width = `${currentVol*100}%`;
    video.volume = currentVol;
    //change volume icon depending on volume
    // const [volume] = video;
    volumeIcon.className = "";
    if (currentVol > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (currentVol < 0.7 && currentVol > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if (currentVol == 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off');
    }
    defaultVolume = currentVol;
}

//Mute UnMute
function volumeToogle() {
    volumeIcon.className = "";
    if (video.volume) {
        defaultVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0
        volumeIcon.classList.add("fas", "fa-volume-off");
    } else {
        video.volume = defaultVolume;
        volumeBar.style.width = `${defaultVolume*100}%`;
        defaultVolume > 0.7 ? volumeIcon.classList.add("fas", "fa-volume-up") : volumeIcon.classList.add("fas", "fa-volume-down");
    }

}


// Change Playback Speed -------------------- //

function changeSpeed() {
    // console.log(speed.value);
    video.playbackRate = speed.value;
}


// Fullscreen ------------------------------- /
let fullscreen = false;

function toggleFullscreen() {

    if (!fullscreen) {
        openFullscreen(player);

    } else {
        closeFullscreen();
    }
    fullscreen = !fullscreen;

}

/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
}
//Event Listners
video.addEventListener('click', tooglePlay);
video.addEventListener('ended', Ended);
playBtn.addEventListener('click', tooglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', seekProgress);
volumeRange.addEventListener('click', updateVolume);
volumeIcon.addEventListener('click', volumeToogle);
speed.addEventListener('change', changeSpeed);
Fullscreen.addEventListener('click', toggleFullscreen);