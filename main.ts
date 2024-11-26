namespace SpriteKind {
    export const level = SpriteKind.create()
    export const EON = SpriteKind.create()
    export const soul = SpriteKind.create()
    export const powerup = SpriteKind.create()
    export const enemy = SpriteKind.create()
}

let levelsPass = [true, false, false]
function play() {
    
    RecPlay = sprites.create(assets.image`
        blink
    `)
    RecPlay.setPosition(99, 76)
    while (!controller.A.isPressed()) {
        RecPlay.setFlag(SpriteFlag.Invisible, true)
        pause(250)
        RecPlay.setFlag(SpriteFlag.Invisible, false)
        pause(250)
    }
    RecPlay.setFlag(SpriteFlag.Invisible, true)
    sceneOne()
}

function levelSelector() {
    
    scene.setBackgroundImage(assets.image`
            LevelSelector
        `)
    LevelOne = sprites.create(assets.image`
                LevelOne
            `, SpriteKind.level)
    LevelOne.setPosition(88, 90)
    if (levelsPass[1]) {
        LevelTwo = sprites.create(assets.image`
                LevelTwo
            `, SpriteKind.level)
        LevelTwo.setPosition(40, 65)
    } else {
        LevelTwoBlock = sprites.create(assets.image`
                        LevelBlock
                    `, SpriteKind.level)
        LevelTwoBlock.setPosition(40, 65)
    }
    
    if (levelsPass[2]) {
        LevelThree = sprites.create(assets.image`
                        LevelThree
                    `, SpriteKind.level)
        LevelThree.setPosition(73, 35)
    } else {
        LevelThreeBlock = sprites.create(assets.image`
                        LevelBlock
                    `, SpriteKind.level)
        LevelThreeBlock.setPosition(73, 35)
    }
    
    EON = sprites.create(assets.image`
                    EON
                `, SpriteKind.EON)
    EON.setPosition(95, 55)
    animation.runImageAnimation(EON, lookLeft, 200, true)
    EON.setBounceOnWall(true)
    EON.setStayInScreen(true)
    controller.moveSprite(EON)
}

function sceneTwo() {
    scene.setBackgroundImage(assets.image`
        SceneTwo
    `)
    game.showLongText("Serà EON capaç de retonar la claredat en aquest món? 'Echo' i 'Quietus' ho evitaran a tota costa!", DialogLayout.Bottom)
    levelSelector()
}

function sceneOne() {
    scene.setBackgroundImage(assets.image`
        SceneOne
    `)
    game.showLongText("Després de la victoria a The Land Of The Forgotten, EON pren camí en una nova aventura, un regne on els germans del silenci 'Echo' i 'Quietus' tenen el control total, The Domain Of Silence", DialogLayout.Bottom)
    sceneTwo()
}

function FirstLevel() {
    
    update_score()
    Soul = sprites.create(assets.image`
            SoulStatic
        `, SpriteKind.soul)
    DoubleJump = sprites.create(assets.image`
            DoubleJump
        `, SpriteKind.powerup)
    MaxStrenght = sprites.create(assets.image`
            MaxStrenght
        `, SpriteKind.powerup)
    Soul.setPosition(80, 160)
    DoubleJump.setPosition(100, 150)
    MaxStrenght.setPosition(140, 150)
    animation.runImageAnimation(Soul, soulMovement, 200, true)
    animation.runImageAnimation(DoubleJump, jumpMovement, 200, true)
    animation.runImageAnimation(MaxStrenght, strenghtMovement, 200, true)
    EON.ay = 300
    EON.setBounceOnWall(false)
    controller.moveSprite(EON, 100, 0)
    scene.cameraFollowSprite(EON)
    scene.setBackgroundImage(assets.image`
                SceneOne
    `)
    tiles.setCurrentTilemap(tilemap`
        Level1
    `)
    tiles.placeOnTile(EON, tiles.getTileLocation(0, 11))
    LevelTwoBlock.destroy()
    LevelThreeBlock.destroy()
    controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
        if (EON.isHittingTile(CollisionDirection.Bottom)) {
            EON.vy = -150
        }
        
    })
    controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
        if (EON.isHittingTile(CollisionDirection.Bottom)) {
            EON.vy = -150
        }
        
    })
}

function update_score() {
    
    if (score_label === null) {
        score_label = textsprite.create("0", 3, 6)
        score_label.setFlag(SpriteFlag.RelativeToCamera, true)
        score_sprite = sprites.create(assets.image`
                    SoulStatic
            `)
        score_sprite.setFlag(SpriteFlag.RelativeToCamera, true)
        center_score()
    } else {
        score_label.setText("" + score)
        center_score()
    }
    
}

function center_score() {
    let total_width = score_sprite.width + 5 + score_label.width
    let center_x = Math.idiv(screen.width, 2) - Math.idiv(total_width, 2)
    score_sprite.setPosition(center_x, 8)
    score_label.setPosition(center_x + score_sprite.width + 5, 11)
}

function update_DJ() {
    
    if (DJ_label === null) {
        DJ_label = textsprite.create("0", 3, 6)
        DJ_label.setFlag(SpriteFlag.RelativeToCamera, true)
    } else if (DJ_time == 0) {
        DJ_label.setText("")
    } else {
        DJ_label.setText("" + DJ_time)
    }
    
}

function update_MS() {
    
    if (MS_label === null) {
        MS_label = textsprite.create("0", 3, 6)
        MS_label.setFlag(SpriteFlag.RelativeToCamera, true)
    } else if (MS_time == 0) {
        MS_label.setText("")
        MS_label.setPosition(30, 20)
    } else {
        MS_label.setText("" + MS_time)
        MS_label.setPosition(30, 20)
    }
    
}

let EON : Sprite = null
let RecPlay : Sprite = null
let LevelOne : Sprite = null
let LevelTwo : Sprite = null
let LevelThree : Sprite = null
let LevelTwoBlock : Sprite = null
let LevelThreeBlock : Sprite = null
let Soul : Sprite = null
let DoubleJump : Sprite = null
let MaxStrenght : Sprite = null
let lookLeft : Image[] = []
let score = 0
let score_label : TextSprite = null
let score_sprite : Sprite = null
let DJ_time = 5
let DJ_label : TextSprite = null
let countdown_active_DJ = false
let MS_time = 5
let MS_label : TextSprite = null
let countdown_active_MS = false
scene.setBackgroundImage(assets.image`
    myImage
`)
play()
let lookRight = assets.animation`
    LookingRight
`
lookLeft = assets.animation`
    LookingLeft
`
let soulMovement = assets.animation`
    Soul
`
let jumpMovement = assets.animation`
    PotionJump
`
let strenghtMovement = assets.animation`
    PotionStrength
`
game.onUpdate(function on_on_update() {
    let currentAnimation: string;
    if (controller.left.isPressed()) {
        currentAnimation = "Left"
        animation.runImageAnimation(EON, lookLeft, 200, true)
    } else if (controller.right.isPressed()) {
        currentAnimation = "Right"
        animation.runImageAnimation(EON, lookRight, 200, true)
    }
    
})
sprites.onOverlap(SpriteKind.EON, SpriteKind.level, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.startEffect(effects.bubbles, 21)
    if (otherSprite == LevelOne) {
        EON.sayText("Level One", 100, false)
        if (controller.A.isPressed()) {
            otherSprite.destroy()
            effects.clearParticles(otherSprite)
            FirstLevel()
        }
        
    } else if (otherSprite == LevelTwo) {
        EON.sayText("Level Two", 100, false)
        if (controller.A.isPressed()) {
            otherSprite.destroy()
            effects.clearParticles(otherSprite)
        }
        
    } else if (otherSprite == LevelThree) {
        EON.sayText("Level Three", 100, false)
        if (controller.A.isPressed()) {
            otherSprite.destroy()
            effects.clearParticles(otherSprite)
        }
        
    } else if (otherSprite == LevelTwoBlock || otherSprite == LevelThreeBlock) {
        EON.sayText("Has de passar-te l'anterior nivell!", 100, false)
        if (controller.A.isPressed()) {
            effects.clearParticles(otherSprite)
        }
        
    }
    
})
sprites.onOverlap(SpriteKind.EON, SpriteKind.soul, function on_on_overlap2(sprite2: Sprite, otherSprite2: Sprite) {
    
    if (otherSprite2 == Soul) {
        otherSprite2.destroy()
        score += 1
        update_score()
    }
    
})
sprites.onOverlap(SpriteKind.EON, SpriteKind.powerup, function on_on_overlap3(sprite3: Sprite, otherSprite3: Sprite) {
    
    if (otherSprite3 == DoubleJump) {
        otherSprite3.destroy()
        DJ_time = 5
        countdown_active_DJ = true
    } else if (otherSprite3 == MaxStrenght) {
        otherSprite3.destroy()
        MS_time = 5
        countdown_active_MS = true
    }
    
})
game.onUpdateInterval(1000, function update_timer_DJ() {
    
    console.log(DJ_time)
    if (countdown_active_DJ) {
        if (DJ_time > 0) {
            DJ_time -= 1
            update_DJ()
        }
        
        if (DJ_time == 0) {
            game.splash("¡Tiempo terminado!")
            update_DJ()
            countdown_active_DJ = false
            DJ_time = -1
        }
        
    }
    
})
game.onUpdateInterval(1000, function update_timer_MS() {
    
    if (countdown_active_MS) {
        if (MS_time > 0) {
            MS_time -= 1
            update_MS()
        }
        
        if (MS_time == 0) {
            game.splash("¡Tiempo terminado!")
            update_MS()
            countdown_active_MS = false
            MS_time = -1
        }
        
    }
    
})
