function heroMove(e) {
    var key = e.keyCode;
    var heroId = document.getElementById('drawHero');
    var creepBoxId = document.getElementById('creepBox');
    var heroY = parseInt(getComputedStyle(heroId).top);
    var heroX = parseInt(getComputedStyle(heroId).left);
    var creepY = parseInt(getComputedStyle(creepBoxId).top);
    var creepX = parseInt(getComputedStyle(creepBoxId).left);

    hero = {
        vertical: function() {
            if (key == 38) {
                if (heroY <= 0) {
                    return 0
                }
                else if ((creepY - heroY <= -80) && (creepY - heroY > -84) && (Math.abs(creepX - heroX) < 11)) {
                    return heroY
                }
                heroY -= 4;

            } else if (key == 40) {
                if (heroY >= 534) {
                    return 534
                }
                else if ((creepY - heroY >= -34) && (creepY - heroY < -30) && (Math.abs(creepX - heroX) < 12)) {
                    return heroY
                }
                heroY += 4;
            }
            return heroY
        },
        horizontal: function() {
            if (key == 37) {
                if (heroX < 0) {
                    heroX = 0
                }
                else if ((creepX - heroX > -16) && (creepX - heroX <= -12) && (creepY - heroY < -32) && (creepY - heroY > -77)) {
                    return heroX
                } 
                heroX -= 4;
            } else if (key == 39) {
                if (heroX >= 536) {
                    heroX = 537
                }
                else if ((creepX - heroX >= 12) && (creepX - heroX < 16) && (creepY - heroY < -32) && (creepY - heroY > -77)) {
                    return heroX
                }
                heroX += 4;
            }
            return heroX
        }
    };
    heroId.style.top = (hero.vertical()) + "px";
    heroId.style.left = (hero.horizontal()) + "px";
}

function heroAttack(e) {
    var key = e.keyCode
    var heroId = document.getElementById('drawHero')
    var creepId = document.getElementById('drawCreep')
    var creepBoxId = document.getElementById('creepBox')
    var creepHpBar = document.getElementById('creepHpBar')
    var goldAmount = document.getElementById('goldAmount')
    if (typeof(creepMaxHp) == 'undefined') {
        creepMaxHp = getCreepMaxHp()
    }
    currentCreepHp = creepHp.innerHTML
    creepMaxHp = parseInt(creepMaxHp)

    dx = Math.abs(parseInt(getComputedStyle(creepBoxId).left) - parseInt(getComputedStyle(heroId).left))
    dy = parseInt(getComputedStyle(creepBoxId).top) - parseInt(getComputedStyle(heroId).top) - 38   

    if (key == 32) {
        if ((dx <= 12) && (dy <= -70) && (dy > -122)) {
            creepHp.innerHTML --
            creepHpBar.style.width = currentCreepHp/creepMaxHp * 30 + "px"
        }
        if (creepHp.innerHTML == 1) {
            creepHp.innerHTML --
            clearInterval(creepAdvancing);
            clearInterval(creepSiege);
            clearInterval(baseRetaliate);
            creepId.style.visibility = "hidden"
            goldAmount.innerHTML = parseInt(goldAmount.innerHTML) + 1
        }
    }
}

function creepMove() {
    var creepBoxId = document.getElementById('creepBox')
    var baseId = document.getElementById('base')
    var baseY = parseInt(getComputedStyle(baseId).top)
    var creep = {
        vertical: function() {
            var y = parseInt(getComputedStyle(creepBoxId).top);
            if (y < baseY - 76) {
                y += 4;
            } else {
                baseId.innerHTML = "BASE UNDER ATTACK"
                clearInterval(creepAdvancing)
                clearInterval(collide)
                creepSiege = setInterval(creepAttack, 1000)
                baseRetaliate = setInterval(baseAttack, 1000)
            }
            return y
        }

    };
    creepBoxId.style.top = (creep.vertical()) + "px";
}

function creepAttack() {
    var baseId = document.getElementById('base')
    var baseHealth = document.getElementById('health')
    var creep = {
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
    var creepId = document.getElementById('drawCreep')
    var creepHp = document.getElementById('creepHp')
    var creepHpBar = document.getElementById('creepHpBar')
    var base = {
        attackCreep: function() {
            currentCreepHp = creepHp.innerHTML
            creepMaxHp = parseInt(creepMaxHp)
            creepHp.innerHTML --;
            creepHpBar.style.width = currentCreepHp/creepMaxHp * 30 + "px"

            if (creepHp.innerHTML < 1) {
                clearInterval(creepSiege);
                clearInterval(baseRetaliate);
                
                creepId.style.visibility = "hidden";
            }

            return creepHp.innerHTML
        }
    }
    creepHp.innerHTML = base.attackCreep()
}

function getCreepMaxHp() {
    var creepMaxHp = document.getElementById('creepHp').innerHTML
    return creepMaxHp
}

function avoidCollision() {
    var heroId = document.getElementById('drawHero');
    var heroX = parseInt(getComputedStyle(heroId).left);
    var heroY = parseInt(getComputedStyle(heroId).top);
    var creepX = parseInt(getComputedStyle(creepBoxId).left);
    var creepY = parseInt(getComputedStyle(creepBoxId).top);
    var dx = creepX - heroX

    if ((creepY - heroY <= -80) && (creepY - heroY >= -84)) {
        if (dx == 0) {
            creepX += 16
        } else if ((dx > 0) && (dx <= 12)) {
            creepX += 8
        } else if ((dx < 0) && (dx >= -12)) {
            creepX -= 8
        }
    } 

    creepBoxId.style.left = creepX + "px"
}

function spawnCreep() {
    var baseHealth = document.getElementById('health')
    var creepId = document.getElementById('drawCreep')
    var creepHp = document.getElementById('creepHp')
    var creepHpBar = document.getElementById('creepHpBar')
    var creepBoxId = document.getElementById('creepBox')
    
    if ((baseHealth.innerHTML > 0) && (creepHp.innerHTML < 1)) {
        clearInterval(creepSiege);
        clearInterval(baseRetaliate);
        creepBoxId.style.left = "300px"
        creepBoxId.style.top = "0px"
        creepHp.innerHTML = 13
        creepHpBar.style.width = "30px"
        creepId.style.visibility = "visible"
        creepAdvancing = setInterval(creepMove, 100);
        collide = setInterval(avoidCollision, 100);
    }
}

var creepBoxId = document.getElementById('creepBox');

document.addEventListener('keyup', heroAttack);
document.addEventListener('keydown', heroMove);
creepAdvancing = setInterval(creepMove, 100);
collide = setInterval(avoidCollision, 100);
setInterval(spawnCreep, 1000);