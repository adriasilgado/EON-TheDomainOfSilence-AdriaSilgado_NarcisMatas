namespace SpriteKind {
    export const option = SpriteKind.create()
    export const user = SpriteKind.create()
}
function play () {
    RecPlay = sprites.create(assets.image`blink`, SpriteKind.option)
    RecPlay.setPosition(99, 76)
    while (!(controller.A.isPressed())) {
        RecPlay.setFlag(SpriteFlag.Invisible, true)
        pause(250)
        RecPlay.setFlag(SpriteFlag.Invisible, false)
        pause(250)
    }
    history()
}
function history () {
    console.log("historia")
}
let RecPlay: Sprite = null
scene.setBackgroundImage(assets.image`myImage`)
play()
