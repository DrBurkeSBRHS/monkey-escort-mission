function midPoint (mySprite: Sprite, mySprite2: Sprite) {
    mid_x = (mySprite.x + mySprite2.x) / 2
    mid_y = (mySprite.y + mySprite2.y) / 2
}
function sightCheck (loc1: tiles.Location, loc2: tiles.Location) {
    return false
}
function tilecheck (aloc: tiles.Location) {
    return false
}
function monkeyMove () {
    player_1.setVelocity(randint(-50, 50), randint(-50, 50))
}
let player_1: Sprite = null
let mid_y = 0
let mid_x = 0
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
let player_2 = sprites.create(img`
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
player_1.setPosition(330, 10)
player_2.setPosition(360, 10)
controller.moveSprite(player_2)
game.onUpdateInterval(50, function () {
    midPoint(player_1, player_2)
    scene.centerCameraAt(mid_x, mid_y)
})
game.onUpdateInterval(500, function () {
    monkeyMove()
})
