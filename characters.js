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

creepArt.fillStyle = 'rgb(211, 211, 211)';
creepArt.fillRect(0, 0, 24, 36);

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
creepArt.beginPath();
creepArt.moveTo(8, 14);
creepArt.lineTo(8, 3);
creepArt.strokeStyle = 'rgb(191, 0, 0)';
creepArt.stroke();

creepArt.beginPath();
creepArt.moveTo(8, 3);
creepArt.lineTo(10, 1);
creepArt.stroke();

creepArt.beginPath();
creepArt.moveTo(16, 14);
creepArt.lineTo(16, 3);
creepArt.stroke();

creepArt.beginPath();
creepArt.moveTo(16, 3);
creepArt.lineTo(14, 1);
creepArt.stroke();

// creep face
creepArt.beginPath();
creepArt.arc(9, 15, 1.5, 0, 2 * Math.PI, false);
creepArt.fillStyle = 'yellow';
creepArt.fill();

creepArt.beginPath();
creepArt.arc(16, 15, 1.5, 0, 2 * Math.PI, false);
creepArt.fillStyle = 'yellow';
creepArt.fill();

creepArt.beginPath();
creepArt.strokeStyle = 'black';
creepArt.moveTo(9, 19);
creepArt.lineTo(11, 26);
creepArt.stroke();

creepArt.beginPath();
creepArt.moveTo(11, 26);
creepArt.lineTo(12, 21);
creepArt.stroke();

creepArt.beginPath();
creepArt.moveTo(12, 21);
creepArt.lineTo(14, 26);
creepArt.stroke();

creepArt.beginPath();
creepArt.moveTo(14, 26);
creepArt.lineTo(16, 19);
creepArt.stroke();