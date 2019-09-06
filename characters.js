var canvas = document.getElementById('drawHero');
var heroArt = canvas.getContext('2d');

heroArt.fillStyle = 'rgb(0, 250, 0)';
heroArt.fillRect(0, 0, 35, 25);

// hero head
heroArt.beginPath();
// (centerX, centerY, radius, startAngle in radians, endAngle in radians, counterclockwise or clockwise boolean)
heroArt.arc(canvas.width / 2, canvas.height / 5, 3, 0, 2 * Math.PI, false);
heroArt.fillStyle = 'red';
heroArt.fill();
heroArt.lineWidth = 3;
heroArt.strokeStyle = '#003300';
heroArt.stroke();

// hero body
heroArt.beginPath();
heroArt.arc(canvas.width / 2, canvas.height / 2 + 1, 4, 0, 2 * Math.PI, false);
heroArt.fillStyle = 'red';
heroArt.fill();
heroArt.lineWidth = 3.5;
heroArt.strokeStyle = '#003300';
heroArt.stroke();

// hero legs?
heroArt.beginPath();
heroArt.arc(canvas.width / 2, canvas.height / 2 + 9, 3, 0, 2 * Math.PI, false);
heroArt.fillStyle = 'blue';
heroArt.fill();
heroArt.lineWidth = 4;
heroArt.strokeStyle = '#003300';
heroArt.stroke();

var canvas = document.getElementById('drawCreep');
var creepArt = canvas.getContext('2d');

function drawLineCreep (x1, y1, x2, y2) {
    creepArt.beginPath();
    creepArt.moveTo(x1, y1);
    creepArt.lineTo(x2, y2);
    creepArt.stroke();
};

// creep body polygon
creepArt.fillStyle = 'rgb(210, 184, 135)';
creepArt.beginPath();
creepArt.moveTo(7, 21);
creepArt.lineTo(17, 21);
creepArt.lineTo(20, 28);
creepArt.lineTo(18, 31);
creepArt.lineTo(5, 31);
creepArt.lineTo(4, 28);
creepArt.closePath();
creepArt.fill();

// creep chicken legs
creepArt.strokeStyle = 'rgb(210, 184, 135)';
drawLineCreep(6, 31, 7, 36);
drawLineCreep(6, 33, 7, 36);
drawLineCreep(17, 31, 17, 33);
drawLineCreep(17, 33, 16, 36);

// creep head polygon
creepArt.fillStyle = 'rgb(191, 0, 0)';
creepArt.beginPath();
creepArt.moveTo(9, 8);
creepArt.lineTo(15, 8);
creepArt.lineTo(18, 18);
creepArt.lineTo(15, 28);
creepArt.lineTo(9, 28);
creepArt.lineTo(6, 18);
creepArt.closePath();
creepArt.fill();

//creep horns
creepArt.strokeStyle = 'rgb(191, 0, 0)';
drawLineCreep(8, 14, 8, 3);
drawLineCreep(8, 3, 10, 1);
drawLineCreep(16, 14, 16, 3);
drawLineCreep(16, 3, 14, 1);

// creep face
creepArt.beginPath();
creepArt.arc(9, 15, 1.5, 0, 2 * Math.PI, false);
creepArt.fillStyle = 'rgb(255, 211, 0)';
creepArt.fill();

creepArt.beginPath();
creepArt.arc(16, 15, 1.5, 0, 2 * Math.PI, false);
creepArt.fillStyle = 'rgb(255, 211, 0)';
creepArt.fill();

creepArt.strokeStyle = 'black';
drawLineCreep(9, 19, 11, 26);
drawLineCreep(11, 26, 12, 21);
drawLineCreep(12, 21, 14, 26);
drawLineCreep(14, 26, 16, 19);