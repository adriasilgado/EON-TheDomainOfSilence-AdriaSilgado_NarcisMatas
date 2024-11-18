namespace SpriteKind {
    export const option = SpriteKind.create()
    export const user = SpriteKind.create()
}

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

function sceneTwo() {
    scene.setBackgroundImage(assets.image`
        SceneTwo
    `)
    game.showLongText("Serà EON capaç de retonar la claredat en aquest món? 'Echo' i 'Quietus' ho evitaran a tota costa!", DialogLayout.Bottom)
}

function sceneOne() {
    scene.setBackgroundImage(assets.image`
        SceneOne
    `)
    game.showLongText("Després de la victoria a The Land Of The Forgotten, EON pren camí en una nou aventura, un regne on els germans del silenci 'Echo' i 'Quietus' tenen el control total del mon The Domain Of Silence", DialogLayout.Bottom)
    sceneTwo()
}

let RecPlay : Sprite = null
scene.setBackgroundImage(assets.image`
    myImage
`)
play()
