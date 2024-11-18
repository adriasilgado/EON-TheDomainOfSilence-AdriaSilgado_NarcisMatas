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
    history()
def history():
    print("historia")
RecPlay: Sprite = None
scene.set_background_image(assets.image("""
    myImage
"""))
play()