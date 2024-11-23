namespace SpriteKind {
    export const option = SpriteKind.create()
    export const user = SpriteKind.create()
}

let levelsPass = [true, false, false]
function play() {
    
    RecPlay = sprites.create(assets.image`
        blink
    `, SpriteKind.option)
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
            `, SpriteKind.option)
    LevelOne.setPosition(88, 90)
    if (levelsPass[1]) {
        LevelTwo = sprites.create(assets.image`
                LevelTwo
            `, SpriteKind.option)
        LevelTwo.setPosition(40, 65)
    } else {
        LevelTwoBlock = sprites.create(assets.image`
                        LevelBlock
                    `, SpriteKind.option)
        LevelTwoBlock.setPosition(40, 65)
    }
    
    if (levelsPass[2]) {
        LevelThree = sprites.create(assets.image`
                        LevelThree
                    `, SpriteKind.option)
        LevelThree.setPosition(73, 35)
    } else {
        LevelThreeBlock = sprites.create(assets.image`
                        LevelBlock
                    `, SpriteKind.option)
        LevelThreeBlock.setPosition(73, 35)
    }
    
    EON = sprites.create(assets.image`
                    EON
                `, SpriteKind.user)
    EON.setPosition(88, 90)
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

let EON : Sprite = null
let RecPlay : Sprite = null
let LevelOne : Sprite = null
let LevelTwo : Sprite = null
let LevelThree : Sprite = null
let LevelTwoBlock : Sprite = null
let LevelThreeBlock : Sprite = null
let lookLeft : Image[] = []
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
game.onUpdate(function on_on_update() {
    if (controller.left.isPressed()) {
        animation.runImageAnimation(EON, lookLeft, 200, true)
    } else if (controller.right.isPressed()) {
        animation.runImageAnimation(EON, lookRight, 200, true)
    }
    
})
sprites.onOverlap(SpriteKind.user, SpriteKind.option, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.startEffect(effects.bubbles, 21)
    if (otherSprite == LevelOne) {
        EON.sayText("Level One", 100, false)
        if (controller.A.isPressed()) {
            effects.clearParticles(otherSprite)
        }
        
    } else if (otherSprite == LevelTwo) {
        EON.sayText("Level Two", 100, false)
        if (controller.A.isPressed()) {
            effects.clearParticles(otherSprite)
        }
        
    } else if (otherSprite == LevelThree) {
        EON.sayText("Level Three", 100, false)
        if (controller.A.isPressed()) {
            effects.clearParticles(otherSprite)
        }
        
    } else if (otherSprite == LevelTwoBlock || otherSprite == LevelThreeBlock) {
        EON.sayText("Has de passar-te l'anterior nivell!", 100, false)
        if (controller.A.isPressed()) {
            effects.clearParticles(otherSprite)
        }
        
    }
    
})
