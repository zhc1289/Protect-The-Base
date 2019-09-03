var canvas = document.getElementById('wall');
var wall = canvas.getContext('2d');

wall.fillStyle = 'rgb(147, 58, 22)';

for (let j = 0; j < 61; j += 10) {
    for (let i = 0; i < 565; i += 12) {
        wall.fillRect(i, j, 10, 4);
        wall.fillRect(i + 2, j + 5, 10, 4);
    }
}

var gold = document.getElementById('drawGold');
var goldBars = gold.getContext('2d');

goldBars.fillStyle = 'rgb(255, 215, 0)';
goldBars.fillRect(7, 0, 12, 4);
goldBars.fillRect(0, 5, 12, 4);
goldBars.fillRect(13, 5, 12, 4)