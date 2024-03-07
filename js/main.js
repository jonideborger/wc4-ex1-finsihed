//Globals
const video = document.getElementById("webcam");
console.log(video);
//const ModelURL = './models/zalmofguy/model.json';
//const ModelURL = 'Darknet';
const ModelURL = 'MobileNet';

const classifier = ml5.imageClassifier(ModelURL, function () {
    document.querySelector('#loader').classList.add('loaded');
    document.querySelector('#loadingText').innerHTML = 'LOADED';
});


function addPredictionHandler() {
    document.querySelector('#predict').addEventListener('click', function () {
        // Make a prediction with a selected image
        classifier.classify(video, (err, results) => {
            console.log(results);
            if (results.length) {
                const label = results[0].label;
                const conf = Math.round(results[0].confidence * 100);
                let className = 'bad';
                if (conf > 0.6) {
                    className = 'good';
                }
                document.querySelector('#prediction').innerHTML = `
                    <p>This is a <span class="${className}">${label}</span> with <span class="${className}">${conf}% certainty</span></p>

                `
            }
        });
    })
}

function checkForDevices() {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            console.log(devices);
        })
}

function loadWebcamStream() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    facingMode: 'user'
                }
            })
            .then(stream => {
                console.log("Sream available");
                console.log(stream);
                video.srcObject = stream;
                video.play();
            })
            .catch(error => {
                console.error("Error accessing webcam:", error);
            });
    }
}

//checkForDevices();
loadWebcamStream();
addPredictionHandler();