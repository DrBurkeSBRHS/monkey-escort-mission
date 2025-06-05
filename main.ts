function midPoint (mySprite: Sprite, mySprite2: Sprite) {
    mid_x = (mySprite.x + mySprite2.x) / 2
    mid_y = (mySprite.y + mySprite2.y) / 2
}
function sightCheck (loc0: tiles.Location, loc1: tiles.Location) {
    dx = Math.abs(loc1.column - loc0.column)
    dy = Math.abs(loc1.row - loc0.row)
    let sx = loc0.x < loc1.x ? 1 : -1;
let sy = loc0.y < loc1.y ? 1 : -1;
x = loc0.column
    y = loc0.row
    steps = Math.max(dx, dy)
    let err = dx > dy ? dx / 2 : dy / 2;
allClear = true
    for (let i = 0; i <= steps; i++) {
        if (tilecheck(tiles.getTileLocation(x, y))) {
            allClear = false
        }
        if (dx > dy) {
            err += 0 - dy
            if (err < 0) {
                y += sy
                err += dx
            }
            x += sx
        } else {
            err += 0 - dx
            if (err < 0) {
                x += sx
                err += dy
            }
            y += sy
        }
    }
    return allClear
}
function tilecheck (aloc: tiles.Location) {
    if (tiles.tileAtLocationIsWall(aloc)) {
        return false
    } else {
        return true
    }
    return true
}
function monkeyMove () {
    if (!(sightCheck(player_1.tilemapLocation(), player_2.tilemapLocation()))) {
        dx = player_2.tilemapLocation().x - player_1.tilemapLocation().x
        dy = player_2.tilemapLocation().y - player_1.tilemapLocation().y
        player_1.setVelocity((dx + randint(10, dx / 3)) * (randint(1, 4) / 4), (dy + randint(10, dy / 3)) * (randint(1, 4) / 4))
    } else {
        player_1.setVelocity(randint(-50, 50), randint(-50, 50))
    }
}
let allClear = false
let steps = 0
let player_2: Sprite = null
let player_1: Sprite = null
let mid_y = 0
let mid_x = 0
let y = 0
let x = 0
let dx = 0
let dy = 0
mid_x = 0
mid_y = 0
tiles.setCurrentTilemap(tilemap`level1`)
player_1 = sprites.create(img`
    . . . . f f f f f . . . . . . . 
    . . . f e e e e e f . . . . . . 
    . . f d d d d e e e f . . . . . 
    . c d f d d f d e e f f . . . . 
    . c d f d d f d e e d d f . . . 
    c d e e d d d d e e b d c . . . 
    c d d d d c d d e e b d c . f f 
    c c c c c d d d e e f c . f e f 
    . f d d d d d e e f f . . f e f 
    . . f f f f f e e e e f . f e f 
    . . . . f e e e e e e e f f e f 
    . . . f e f f e f e e e e f f . 
    . . . f e f f e f e e e e f . . 
    . . . f d b f d b f f e f . . . 
    . . . f d d c d d b b d f . . . 
    . . . . f f f f f f f f f . . . 
    `, SpriteKind.Player)
player_2 = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
player_2.setStayInScreen(true)
player_1.setStayInScreen(true)
player_1.setPosition(330, 20)
player_2.setPosition(360, 10)
controller.moveSprite(player_2)
game.onUpdateInterval(50, function () {
    midPoint(player_1, player_2)
    scene.centerCameraAt(mid_x, mid_y)
})
game.onUpdateInterval(500, function () {
    monkeyMove()
})
