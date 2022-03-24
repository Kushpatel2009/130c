leftwristX = 0
rightwristY = 0
rightwristx = 0
leftwristY = 0
song = "music.mp3";

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#00CED1");
    strock("00CED1");
    if (scoreRightwrist > 0.2) {

        circle(rightwristX, rightwristY, 20);
        if (rightwristY > 0 && rightwristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed = .5x"
            song.rate(0.5);
        } else if (rightwristY > 100 && rightwristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x"
            song.rate(1);
        } else if (rightwristY > 200 && rightwristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x"
            song.rate(1.5);
        } else if (rightwristY > 300 && rightwristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2x"
            song.rate(2);
        } else if (rightwristY > 400 && rightwristY <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x"
            song.rate(2.5);
        }
    }
    if (scoreLeftwrist > 0.2) {
        circle(leftwristX, leftwristY, 20);
        InnumberleftwristY = Number(leftwristY);
        remove_decimal = floor(InnumberleftwristY);
        volume = remove_decimal / 500;
        document.getElementById("volume").innerHTML = "Volume =" + volume;
        song.setVolume(volume);
        leftwristY_divide_1000 = remove_decimal / 1000
    }
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.posenet(video.modelLoaded);
    posenet.on('pose', gotPoses);
}

function preload() {
    song = loadsound("music.mp3");
    song.play();
    song.setVolume(1);
    song.rate(1.123456789);
}

function modelloaded() {
    console.log('poseNet is intiazied')
}

function gotPoses(results) {
    if (results.lenght > 0) {
        console.log(results);
        scoreRightwrist = results[0].pose.keypoints[10].score;
        scoreLeftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist =" + scoreLeftwrist + "scorerightwrist" + scoreRightwrist);
        leftwristX = results[0].pose.leftwristX.x;
        leftwristY = results[0].pose.leftwristY.y;
        console.log("Left wrist X =" + leftwristX + "left wrist y" + leftwristY)
        rightwristx = results[0].pose.rightwrist.x;
        leftwristY = results[0].pose.rightwristY.y;
        console.log("right wrist X =" + rightwristX + "right wrist y" + rightwristY)

    }
}