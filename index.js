function heroMove(e) {
    var key = e.keyCode;
    var heroId = document.getElementById('hero');
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
                else if ((creepY - heroY >= -46) && (creepY - heroY < -42) && (Math.abs(creepX - heroX) <= 7)) {
                    return heroY
                }
                heroY -= 4;

            } else if (key == 40) {
                if (heroY >= 534) {
                    return 534
                }
                else if ((creepY - heroY >= -30) && (creepY - heroY < -26) && (Math.abs(creepX - heroX) <= 7)) {
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
                heroX -= 4;
            } else if (key == 39) {
                if (heroX > 555) {
                    heroX = 555
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
    var heroId = document.getElementById('hero')
    var creepId = document.getElementById('creep')
    var creepBoxId = document.getElementById('creepBox')
    var creepHpBar = document.getElementById('creepHpBar')
    var goldAmount = document.getElementById('goldAmount')
    if (typeof(creepMaxHp) == 'undefined') {
        creepMaxHp = getCreepMaxHp()
    }
    currentCreepHp = creepHp.innerHTML
    creepMaxHp = parseInt(creepMaxHp)

    dx = Math.abs(parseInt(getComputedStyle(creepBoxId).left) - parseInt(getComputedStyle(heroId).left))
    dy = Math.abs(Math.abs(parseInt(getComputedStyle(creepBoxId).top) - parseInt(getComputedStyle(heroId).top)) - 38)   

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
            creepId.style.visibility = "hidden"
            goldAmount.innerHTML = parseInt(goldAmount.innerHTML) + 1
            console.log("LAST HIT!")
        }
        if (creepHp.innerHTML < 1) {
            creepHp.style.visibility = "hidden";
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
            if (y < baseY - 57) {
                y += 4;
            } else {
                baseId.innerHTML = "BASE UNDER ATTACK"
                clearInterval(creepAdvancing)
                clearInterval(collide)
                creepSiege = setInterval(creepAttack, 750)
                baseRetaliate = setInterval(baseAttack, 750)
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
    var creepId = document.getElementById('creep')
    var creepHp = document.getElementById('creepHp')
    var creepHpBar = document.getElementById('creepHpBar')
    var base = {
        attackCreep: function() {
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
            creepHp.style.visibility = "hidden";
        }
        
        creepId.style.visibility = "hidden";
        console.log("Missed Last Hit")
    }
}

function getCreepMaxHp() {
    var creepMaxHp = document.getElementById('creepHp').innerHTML
    return creepMaxHp
}

function avoidCollision() {
    var heroId = document.getElementById('hero');
    var heroX = parseInt(getComputedStyle(heroId).left);
    var heroY = parseInt(getComputedStyle(heroId).top);
    var creepX = parseInt(getComputedStyle(creepBoxId).left);
    var creepY = parseInt(getComputedStyle(creepBoxId).top);
    var dx = Math.abs(creepX - heroX)

    if (((creepY - heroY == -38) || (creepY - heroY) == -40) && (dx < 7)) {
        var decide = Math.random()
        if (decide <= 0.5) {
            creepX -= 8
        }
        else {
            creepX += 8
        }
        creepBoxId.style.left = creepX + "px"
    }
}

function spawnCreep() {
    var baseHealth = document.getElementById('health')
    var creepId = document.getElementById('creep')
    var creepHp = document.getElementById('creepHp')
    var creepHpBar = document.getElementById('creepHpBar')
    var creepBoxId = document.getElementById('creepBox')
    
    if ((baseHealth.innerHTML > 0) && (creepHp.innerHTML < 1)) {
        creepBoxId.style.left = "300px"
        creepBoxId.style.top = "0px"
        creepHp.innerHTML = 13
        creepHpBar.style.width = "30px"
        creepHp.style.visibility = "visible"
        creepId.style.visibility = "visible"
        creepAdvancing = setInterval(creepMove, 100);
        collide = setInterval(avoidCollision, 100)
    }
}

var creepBoxId = document.getElementById('creepBox')

document.addEventListener('keydown', heroAttack);
document.addEventListener('keydown', heroMove);
creepAdvancing = setInterval(creepMove, 100);
collide = setInterval(avoidCollision, 100)
setInterval(spawnCreep, 1000)