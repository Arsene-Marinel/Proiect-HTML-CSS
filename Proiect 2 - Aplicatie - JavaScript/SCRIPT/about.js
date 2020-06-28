window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {
   let videoElement = document.createElement("video");
   let videoContainer = document.getElementById('video');
   videoElement.src = "../images/video.mp4a";
   videoContainer.append(videoElement);
}