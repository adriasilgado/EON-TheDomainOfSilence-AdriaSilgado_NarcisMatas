@namespace
class SpriteKind:
    option = SpriteKind.create()
    user = SpriteKind.create()
def play():
    global RecPlay
    RecPlay = sprites.create(assets.image("""
        blink
    """), SpriteKind.option)
    RecPlay.set_position(99, 76)
    while not (controller.A.is_pressed()):
        RecPlay.set_flag(SpriteFlag.INVISIBLE, True)
        pause(250)
        RecPlay.set_flag(SpriteFlag.INVISIBLE, False)
        pause(250)
    RecPlay.set_flag(SpriteFlag.INVISIBLE, True)
    sceneOne()
def sceneTwo():
    scene.set_background_image(assets.image("""
        SceneTwo
    """))
    game.show_long_text("Serà EON capaç de retonar la claredat en aquest món? 'Echo' i 'Quietus' ho evitaran a tota costa!",
        DialogLayout.BOTTOM)
def sceneOne():
    scene.set_background_image(assets.image("""
        SceneOne
    """))
    game.show_long_text("Després de la victoria a The Land Of The Forgotten, EON pren camí en una nou aventura, un regne on els germans del silenci 'Echo' i 'Quietus' tenen el control total del mon The Domain Of Silence",
        DialogLayout.BOTTOM)
    sceneTwo()
RecPlay: Sprite = None
scene.set_background_image(assets.image("""
    myImage
"""))
play()