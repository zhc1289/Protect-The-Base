var canvas = document.getElementById('drawHero');
var heroArt = canvas.getContext('2d');

heroArt.fillStyle = 'rgb(0, 250, 0)';
heroArt.fillRect(0, 20, 35, 50);

function drawLine(x1, y1, x2, y2){
    heroArt.beginPath();
    heroArt.moveTo(x1, y1);
    heroArt.lineTo(x2, y2);
    heroArt.stroke();
};

// hero head
heroArt.beginPath();
// (centerX, centerY, radius, startAngle in radians, endAngle in radians, counterclockwise or clockwise boolean)
heroArt.arc(canvas.width / 2, canvas.height / 2, 3, 0, 2 * Math.PI, false);
heroArt.fillStyle = 'red';
heroArt.fill();
heroArt.lineWidth = 3;
heroArt.strokeStyle = '#003300';
heroArt.stroke();

// hero body
heroArt.beginPath();
heroArt.arc(canvas.width / 2, canvas.height / 2 + 9, 4, 0, 2 * Math.PI, false);
heroArt.fillStyle = 'red';
heroArt.fill();
heroArt.lineWidth = 3.5;
heroArt.strokeStyle = '#003300';
heroArt.stroke();

// hero legs?
heroArt.beginPath();
heroArt.arc(canvas.width / 2, canvas.height / 2 + 18.5, 3, 0, 2 * Math.PI, false);
heroArt.fillStyle = 'blue';
heroArt.fill();
heroArt.lineWidth = 4;
heroArt.strokeStyle = '#003300';
heroArt.stroke();