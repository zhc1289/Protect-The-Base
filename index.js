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
                if (y > 530) {
                    y = 530
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

function heroAttack(e) {
    var key = e.keyCode
    heroId = document.getElementById('hero')
    creepId = document.getElementById('creep')
    dx = Math.abs(parseInt(getComputedStyle(creepBoxId).left) - parseInt(getComputedStyle(heroId).left))
    dy = Math.abs(Math.abs(parseInt(getComputedStyle(creepBoxId).top) - parseInt(getComputedStyle(heroId).top)) - 38)

    if (key == 32) {
        if ((dx < 9) && (dy <9)) {
            creepHp.innerHTML --
        }
        if (creepHp.innerHTML < 1) {
            clearInterval(creepAdvancing)
            creepHp.innerHTML = ""
            creepId.innerHTML = ""
        }
    }
}

function creepMove() {
    creepBoxId = document.getElementById('creepBox'),
    baseId = document.getElementById('base'),
    baseY = parseInt(getComputedStyle(baseId).top),
    creep = {
        vertical: function() {
            var y = parseInt(getComputedStyle(creepBoxId).top);
            if (y < baseY - 57) {
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
    creepBoxId.style.top = (creep.vertical()) + "px";
}

function creepAttack() {
    baseId = document.getElementById('base'),
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
        clearInterval(baseRetaliate);
        baseId.innerHTML = "BASE DESTROYED";
        baseHealth.innerHTML = "GAME OVER";
    }
}

function baseAttack() {
    creepId = document.getElementById('creep'),
    creepHp = document.getElementById('creepHp'),
    base = {
        attackCreep: function() {
            if ((creepHp.innerHTML < 5) && ((getComputedStyle(creepHp).visibility) == 'hidden')) {
                creepHp.style.visibility = "visible"
            }   
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

document.addEventListener('keydown', heroAttack);
document.addEventListener('keydown', heroMove);
creepAdvancing = setInterval(creepMove, 100);
