function move(e) {
    var key = e.keyCode,
    heroId = document.getElementById('hero'),
    hero = {
        vertical: function() {
            var y = parseInt(getComputedStyle(heroId).top);
            if (key == 38) {
                y -= 4;
            } else if (key == 40) {
                y += 4;
            }
            return y
        },
        horizontal: function() {
            var x = parseInt(getComputedStyle(heroId).left);
            if (key == 37) {
                x -= 4;
            } else if (key == 39) {
                x += 4;
            }
            return x
        }
    };
    heroId.style.top = (hero.vertical()) + "px";
    heroId.style.left = (hero.horizontal()) + "px";
}
function creepMove() {
    creepId = document.getElementById('creep'),
    baseId = document.getElementById('base'),
    creep = {
        vertical: function() {
            var y = parseInt(getComputedStyle(creepId).top);
            if (y < parseInt(getComputedStyle(baseId).top)) {
                y += 4;
            }
            return y
        }
    };
    creepId.style.top = (creep.vertical()) + "px";
}

document.addEventListener('keydown', move);
setInterval(creepMove, 100)