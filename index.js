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
            goldAmount.innerHTML = parseInt(goldAmount.innerHTML) + 1
            console.log("LAST HIT!")
        }
        if (creepHp.innerHTML < 1) {
            creepHp.innerHTML = "";
        }
    }
}

function creepMove() {
    var heroId = document.getElementById('hero')
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
    var creepMaxHp = document.getElementById('creepHp').innerHTML
    return creepMaxHp
}

document.addEventListener('keydown', heroAttack);
document.addEventListener('keydown', heroMove);
creepAdvancing = setInterval(creepMove, 100);