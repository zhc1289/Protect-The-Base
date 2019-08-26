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
    creepHpBar = document.getElementById('creepHpBar')
    if (typeof(creepMaxHp) == 'undefined') {
        creepMaxHp = getCreepMaxHp()
    }
    currentCreepHp = creepHp.innerHTML
    creepMaxHp = parseInt(creepMaxHp)

    dx = Math.abs(parseInt(getComputedStyle(creepBoxId).left) - parseInt(getComputedStyle(heroId).left))
    dy = Math.abs(Math.abs(parseInt(getComputedStyle(creepBoxId).top) - parseInt(getComputedStyle(heroId).top)) - 38)
    
    if ((creepHp.innerHTML < 13) && ((getComputedStyle(creepHp).visibility) == 'hidden')) {
        creepHp.style.visibility = "visible"
    }   

    if (key == 32) {
        if ((dx < 9) && (dy <9)) {
            creepHp.innerHTML --
            creepHpBar.style.width = currentCreepHp/creepMaxHp * 30 + "px"
        }
        if (creepHp.innerHTML == 1) {
            creepHp.innerHTML --
            clearInterval(creepAdvancing);
            clearInterval(creepSiege);
            clearInterval(baseRetaliate);
            creepHp.style.visibility = "hidden"
            creepId.innerHTML = ""
            console.log("LAST HIT!")
        }
        if (creepHp.innerHTML < 1) {
            creepHp.innerHTML = "";
        }
    }
}

function creepMove() {
    heroId = document.getElementById('hero'),
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
        horizontal: function() {
            var heroX = parseInt(getComputedStyle(heroId).left);
            var heroY = parseInt(getComputedStyle(heroId).top);
            var creepX = parseInt(getComputedStyle(creepBoxId).left);
            var creepY = parseInt(getComputedStyle(creepBoxId).top);
            var dx = Math.abs(creepX - heroX)
            
            if (((creepY - heroY) == -40) && (dx < 9)) {
                var decide = Math.random()
                if (decide <= 0.5) {
                    creepX -= 8
                }
                else {
                    creepX += 8
                }
                return creepX
            }
        }
    };
    creepBoxId.style.top = (creep.vertical()) + "px";
    creepBoxId.style.left = (creep.horizontal()) + "px";
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
    creepHpBar = document.getElementById('creepHpBar'),
    base = {
        attackCreep: function() {
            if ((creepHp.innerHTML < 13) && ((getComputedStyle(creepHp).visibility) == 'hidden')) {
                creepHp.style.visibility = "visible"
            }
            currentCreepHp = creepHp.innerHTML
            creepMaxHp = parseInt(creepMaxHp)
            creepHp.innerHTML --;
            creepHpBar.style.width = currentCreepHp/creepMaxHp * 30 + "px"
            return creepHp.innerHTML
        }
    }
    creepHp.innerHTML = base.attackCreep()
    if (creepHp.innerHTML == 1) {
        creepHp.innerHTML --
        clearInterval(creepSiege);
        clearInterval(baseRetaliate);
        
        if (creepHp.innerHTML < 1) {
            creepHpBar.style.width = 0 + "px"
            creepHp.innerHTML = "";
        }
        
        creepId.innerHTML = "";
        console.log("Missed Last Hit")
    }
}

function getCreepMaxHp() {
    creepMaxHp = document.getElementById('creepHp').innerHTML
    return creepMaxHp
}

document.addEventListener('keydown', heroAttack);
document.addEventListener('keydown', heroMove);
creepAdvancing = setInterval(creepMove, 100);
