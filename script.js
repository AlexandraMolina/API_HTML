if (window.File && window.FileReader && window.FileList && window.Blob) {
    function handleFileSelect(evt) {
        let file = evt.target.files[0];

        if (!file.type.match('video.*')) {
            return;
        }

        let reader = new FileReader();

        reader.onload = (function (theFile) {
            return function (e) {
                let videoDiv = document.getElementsByClassName('video-container');

                if (videoDiv[0] != null) {
                    videoDiv[0].parentNode.removeChild(videoDiv[0]);
                }

                let div = document.createElement('div');
                div.id = "video-div";
                div.className = "video-container";
                div.innerHTML = '<video controls id="video" class="thumb" src="' + e.target.result + '" title="' + escape(theFile.name) + '"/>';

                document.getElementById('video-output').insertBefore(div, null);

                let loadingMessage = document.createElement('p');

                loadingMessage.id = "loading";
                loadingMessage.className = "loading-message";
                loadingMessage.innerHTML = 'Vídeo Cargando';

                document.getElementById('video-output').insertBefore(loadingMessage, null);

                let playB = document.getElementById('play');
                let pauseB = document.getElementById('pause');
                let volsub = document.getElementById('up');
                let volbaj = document.getElementById('down');
                let videoElement = document.getElementById('size');

                videoElement.addEventListener('click', () => {
                    const videoElement = document.getElementById('video');
                    if (videoElement.requestFullscreen) {
                        videoElement.requestFullscreen();
                    } else if (videoElement.mozRequestFullScreen) {
                        videoElement.mozRequestFullScreen();
                    } else if (videoElement.webkitRequestFullscreen) {
                        videoElement.webkitRequestFullscreen();
                    } else if (videoElement.msRequestFullscreen) {
                        videoElement.msRequestFullscreen();
                    }
                });

                playB.addEventListener('click', () => {
                    document.getElementById('video').play();
                });

                pauseB.addEventListener('click', () => {
                    document.getElementById('video').pause();
                })

                volsub.addEventListener('click', () => {
                    document.getElementById('video').volume += 0.1;
                })

                volbaj.addEventListener('click', () => {
                    document.getElementById('video').volume -= 0.1;
                })

                document.getElementById('video').addEventListener('canplay', () => {
                    let loadingMessage = document.getElementById('loading');

                    document.getElementById('video-output').removeChild(loadingMessage);

                    document.getElementById('video').style.visibility = "visible";

                    playB.style.visibility = "visible";
                    pauseB.style.visibility = "visible";
                    volsub.style.visibility = "visible";
                    volbaj.style.visibility = "visible";
                    videoElement.style.visibility = "visible"
                });
            }
        })(file);

        reader.readAsDataURL(file);
    }

    document.getElementById('file').addEventListener('change', handleFileSelect, false);
} else {
    alert('No soportado en el navegador.')
}