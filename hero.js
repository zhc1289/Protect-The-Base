var canvas = document.getElementById('drawHero');
var game = canvas.getContext('2d');

game.fillStyle = 'rgb(0, 250, 0)';
game.fillRect(0, 20, 35, 50);

function drawLine(x1, y1, x2, y2){
    game.beginPath();
    game.moveTo(x1, y1);
    game.lineTo(x2, y2);
    game.stroke();
};

// hero head
game.beginPath();
// (centerX, centerY, radius, startAngle in radians, endAngle in radians, counterclockwise or clockwise boolean)
game.arc(canvas.width / 2, canvas.height / 2, 3, 0, 2 * Math.PI, false);
game.fillStyle = 'red';
game.fill();
game.lineWidth = 3;
game.strokeStyle = '#003300';
game.stroke();

// hero body
game.beginPath();
game.arc(canvas.width / 2, canvas.height / 2 + 9, 4, 0, 2 * Math.PI, false);
game.fillStyle = 'red';
game.fill();
game.lineWidth = 3.5;
game.strokeStyle = '#003300';
game.stroke();

// hero legs?
game.beginPath();
game.arc(canvas.width / 2, canvas.height / 2 + 18.5, 3, 0, 2 * Math.PI, false);
game.fillStyle = 'blue';
game.fill();
game.lineWidth = 4;
game.strokeStyle = '#003300';
game.stroke();

