var canvas = document.getElementById('wall');
var wall = canvas.getContext('2d');

wall.fillStyle = 'rgb(147, 58, 22)';

for (let j = 0; j < 121; j += 24) {
    for (let i = 0; i < 126; i += 5) {
        wall.fillRect(i, j, 4, 10);
    }
}

for (let j = 12; j < 121; j += 24) {
    for (let i = 0; i < 126; i += 5) {
        wall.fillRect(i + 2, j, 4, 10);
    }
}