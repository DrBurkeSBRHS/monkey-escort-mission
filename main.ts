namespace SpriteKind {
    export const Escort = SpriteKind.create()
}
function setBaddieVel (mySprite: Sprite) {
    mySprite.setVelocity(randint(-30, 30), randint(-30, 30))
    bdx = monkey.tilemapLocation().x - mySprite.tilemapLocation().x
    bdy = monkey.tilemapLocation().y - mySprite.tilemapLocation().y
    mySprite.setVelocity((bdx + randint(10, bdx / 3)) * (randint(1, 4) / 6), (bdy + randint(10, bdy / 3)) * (randint(1, 4) / 6))
}
function midPoint (mySprite: Sprite, mySprite2: Sprite) {
    mid_x = (mySprite.x + mySprite2.x) / 2
    mid_y = (mySprite.y + mySprite2.y) / 2
}
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.left.isPressed() || controller.right.isPressed()) {
        lastshotx = controller.dx(10000)
        lastshoty = controller.dy(10000)
    }
    if (controller.up.isPressed() || controller.down.isPressed()) {
        lastshotx = controller.dx(10000)
        lastshoty = controller.dy(10000)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    music.play(music.createSoundEffect(WaveShape.Noise, 5000, 0, 165, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    if (controller.dx() + controller.dy() != 0) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 5 4 . . . . . . 
            . . . . . . 2 5 5 2 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, player_2, controller.dx(10000), controller.dy(10000))
    } else {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 5 4 . . . . . . 
            . . . . . . 2 5 5 2 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, player_2, lastshotx, lastshoty)
    }
})
scene.onOverlapTile(SpriteKind.Escort, assets.tile`myTile`, function (sprite, location) {
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Escort, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
    monkeyToSpawn()
})
function monkeyToSpawn () {
    tiles.placeOnRandomTile(monkey, sprites.castle.tileDarkGrass2)
    tiles.placeOnRandomTile(player_2, sprites.castle.tileDarkGrass2)
}
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    setBaddieVel(sprite)
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    music.play(music.melodyPlayable(music.thump), music.PlaybackMode.InBackground)
    sprite.startEffect(effects.fire)
})
function monkeyMove () {
    dx = player_2.tilemapLocation().x - monkey.tilemapLocation().x
    dy = player_2.tilemapLocation().y - monkey.tilemapLocation().y
    monkey.setVelocity((dx + randint(10, dx / 3)) * (randint(1, 4) / 4), (dy + randint(10, dy / 3)) * (randint(1, 4) / 4))
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    music.play(music.createSoundEffect(WaveShape.Sine, 160, 0, 191, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.UntilDone)
    info.changeLifeBy(-1)
    start_score += -2000
})
let a_baddie: Sprite = null
let dy = 0
let dx = 0
let projectile: Sprite = null
let lastshoty = 0
let lastshotx = 0
let bdy = 0
let bdx = 0
let monkey: Sprite = null
let player_2: Sprite = null
let mid_y = 0
let mid_x = 0
let x = 0
let y = 0
info.setLife(5)
let maxbaddie = 12
mid_x = 0
mid_y = 0
tiles.setCurrentTilemap(tilemap`level1`)
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
tiles.placeOnRandomTile(player_2, sprites.castle.tileDarkGrass2)
monkey = sprites.create(img`
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
    `, SpriteKind.Escort)
tiles.placeOnRandomTile(monkey, sprites.castle.tileDarkGrass2)
controller.moveSprite(player_2)
monkeyToSpawn()
scene.centerCameraAt(320, 0)
music.setVolume(35)
music.play(music.createSong(assets.song`Tales`), music.PlaybackMode.LoopingInBackground)
game.setDialogCursor(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . b 5 b . . . 
    . . . . . . . . . b 5 b . . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . b b b b b 5 5 5 5 5 5 5 b . . 
    . b d 5 b 5 5 5 5 5 5 5 5 b . . 
    . . b 5 5 b 5 d 1 f 5 d 4 f . . 
    . . b d 5 5 b 1 f f 5 4 4 c . . 
    b b d b 5 5 5 d f b 4 4 4 4 4 b 
    b d d c d 5 5 b 5 4 4 4 4 4 b . 
    c d d d c c b 5 5 5 5 5 5 5 b . 
    c b d d d d d 5 5 5 5 5 5 5 b . 
    . c d d d d d d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    `)
game.showLongText("Welcome to Monkey Escort Mission, I am the Duck of Wisdom", DialogLayout.Bottom)
game.showLongText("Here you are at the starting point of this mission.", DialogLayout.Bottom)
game.showLongText("Your goal is to navigate the maze and get the monkey to the golden area safely.", DialogLayout.Top)
game.setDialogCursor(img`
    ........................
    ........................
    ........................
    ........................
    ..........ffff..........
    ........ff1111ff........
    .......fb111111bf.......
    .......f11111111f.......
    ......fd11111111df......
    ......fd11111111df......
    ......fddd1111dddf......
    ......fbdbfddfbdbf......
    ......fcdcf11fcdcf......
    .......fb111111bf.......
    ......fffcdb1bdffff.....
    ....fc111cbfbfc111cf....
    ....f1b1b1ffff1b1b1f....
    ....fbfbffffffbfbfbf....
    .........ffffff.........
    ...........fff..........
    ........................
    ........................
    ........................
    ........................
    `)
game.showLongText("The monkey will follow you. Mostly! You must avoid the ghosts who look like this. If a ghost touches the monkey, you both warp back to the starting point. ", DialogLayout.Full)
game.setDialogCursor(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . b 5 b . . . 
    . . . . . . . . . b 5 b . . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . b b b b b 5 5 5 5 5 5 5 b . . 
    . b d 5 b 5 5 5 5 5 5 5 5 b . . 
    . . b 5 5 b 5 d 1 f 5 d 4 f . . 
    . . b d 5 5 b 1 f f 5 4 4 c . . 
    b b d b 5 5 5 d f b 4 4 4 4 4 b 
    b d d c d 5 5 b 5 4 4 4 4 4 b . 
    c d d d c c b 5 5 5 5 5 5 5 b . 
    c b d d d d d 5 5 5 5 5 5 5 b . 
    . c d d d d d d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    `)
game.showLongText("You can shoot the ghosts to clear them out. If you run into a ghost, you lose a life. The faster you complete the maze with the fewest lives lost, the greater will be your score.", DialogLayout.Full)
game.showLongText("Ghosts spawn when you get near their blue spawn tile, so keep your distance", DialogLayout.Bottom)
game.showLongText("Are you ready? Go!", DialogLayout.Center)
music.stopAllSounds()
music.setVolume(60)
let start_score = 30000 + game.runtime() / 50
game.onUpdateInterval(50, function () {
    midPoint(monkey, player_2)
    scene.centerCameraAt(mid_x, mid_y)
    info.setScore(start_score - game.runtime() / 50)
})
game.onUpdateInterval(2000, function () {
    if (sprites.allOfKind(SpriteKind.Enemy).length < maxbaddie) {
        for (let value of tiles.getTilesByType(sprites.dungeon.collectibleInsignia)) {
            if (Math.sqrt(Math.abs(value.x - player_2.x) ** 2 + Math.abs(value.y - player_2.y) ** 2) < 65) {
                music.play(music.createSoundEffect(WaveShape.Sine, 774, 1, 150, 0, 100, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
                a_baddie = sprites.create(img`
                    ........................
                    ........................
                    ........................
                    ........................
                    ..........ffff..........
                    ........ff1111ff........
                    .......fb111111bf.......
                    .......f11111111f.......
                    ......fd11111111df......
                    ......fd11111111df......
                    ......fddd1111dddf......
                    ......fbdbfddfbdbf......
                    ......fcdcf11fcdcf......
                    .......fb111111bf.......
                    ......fffcdb1bdffff.....
                    ....fc111cbfbfc111cf....
                    ....f1b1b1ffff1b1b1f....
                    ....fbfbffffffbfbfbf....
                    .........ffffff.........
                    ...........fff..........
                    ........................
                    ........................
                    ........................
                    ........................
                    `, SpriteKind.Enemy)
                tiles.placeOnTile(a_baddie, tiles.getTileLocation(value.column, value.row))
                a_baddie.setFlag(SpriteFlag.BounceOnWall, true)
                setBaddieVel(a_baddie)
            }
        }
    }
})
game.onUpdateInterval(500, function () {
    monkeyMove()
})
