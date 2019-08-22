function heroMove(e) {
    var key = e.keyCode,
    heroId = document.getElementById('hero'),
    hero = {
        vertical: function() {
            var y = parseInt(getComputedStyle(heroId).top);
            if (key == 38) {
                if (y < 0) {
                    y = 0
                }
                y -= 4;
            } else if (key == 40) {
                if (y > 520) {
                    y = 520
                }
                y += 4;
            }
            return y
        },
        horizontal: function() {
            var x = parseInt(getComputedStyle(heroId).left);
            if (key == 37) {
                if (x < 0) {
                    x = 0
                }
                x -= 4;
            } else if (key == 39) {
                if (x > 555) {
                    x = 555
                }
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
    baseY = parseInt(getComputedStyle(baseId).top),
    creep = {
        vertical: function() {
            var y = parseInt(getComputedStyle(creepId).top);
            if (y < baseY) {
                y += 4;
            } else {
                baseId.innerHTML = "BASE UNDER ATTACK"
                clearInterval(creepAdvancing)
                creepSiege = setInterval(creepAttack, 750)
                baseRetaliate = setInterval(baseAttack, 750)
            }
            return y
        },
    };
    creepId.style.top = (creep.vertical()) + "px";
}

function creepAttack() {
    creepId = document.getElementById('creep'),
    baseId = document.getElementById('base'),
    baseY = parseInt(getComputedStyle(baseId).top),
    creepY = parseInt(getComputedStyle(creepId)),
    baseHealth = document.getElementById('health'),
    creep = {
        attackBase: function() {
            baseHealth.innerHTML --;
            return baseHealth.innerHTML
        }
    }
    baseHealth.innerHTML = creep.attackBase()
    if (baseHealth.innerHTML < 1) {
        clearInterval(creepSiege);
        baseId.innerHTML = "BASE DESTROYED";
        baseHealth.innerHTML = "GAME OVER";
    }
}

function baseAttack() {
    creepId = document.getElementById('creep'),
    baseId = document.getElementById('base'),
    creepHp = document.getElementById('creepHp'),
    baseY = parseInt(getComputedStyle(baseId).top),
    creepY = parseInt(getComputedStyle(creepId)),
    base = {
        attackCreep: function() {   
            creepHp.innerHTML --;
            return creepHp.innerHTML
        }
    }
    creepHp.innerHTML = base.attackCreep()
    if (creepHp.innerHTML < 1) {
        clearInterval(baseRetaliate);
        clearInterval(creepSiege)
        creepHp.innerHTML = ""
        creepId.innerHTML = ""
    }
}

document.addEventListener('keydown', heroMove);
creepAdvancing = setInterval(creepMove, 100);
