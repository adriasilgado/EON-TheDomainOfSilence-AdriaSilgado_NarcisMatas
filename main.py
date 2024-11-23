@namespace
class SpriteKind:
    option = SpriteKind.create()
    user = SpriteKind.create()
levelsPass = [True, False, False]
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
def levelSelector():
    global EON, LevelOne, LevelTwo, LevelThree, LevelTwoBlock, levelsPass, LevelThreeBlock
    scene.set_background_image(assets.image("""
            LevelSelector
        """))
    LevelOne = sprites.create(assets.image("""
                LevelOne
            """), SpriteKind.option)
    LevelOne.set_position(88, 90)
    if levelsPass[1]:
        LevelTwo = sprites.create(assets.image("""
                LevelTwo
            """), SpriteKind.option)
        LevelTwo.set_position(40, 65)
    else:
        LevelTwoBlock = sprites.create(assets.image("""
                        LevelBlock
                    """), SpriteKind.option)
        LevelTwoBlock.set_position(40, 65)
    if levelsPass[2]:
        LevelThree = sprites.create(assets.image("""
                        LevelThree
                    """), SpriteKind.option)
        LevelThree.set_position(73, 35)
    else:
        LevelThreeBlock = sprites.create(assets.image("""
                        LevelBlock
                    """), SpriteKind.option)
        LevelThreeBlock.set_position(73, 35)
    EON = sprites.create(assets.image("""
                    EON
                """), SpriteKind.user)
    EON.set_position(88, 90)
    animation.run_image_animation(EON, lookLeft, 200, True)
    EON.set_bounce_on_wall(True)
    EON.set_stay_in_screen(True)
    controller.move_sprite(EON)
def sceneTwo():
    scene.set_background_image(assets.image("""
        SceneTwo
    """))
    game.show_long_text("Serà EON capaç de retonar la claredat en aquest món? 'Echo' i 'Quietus' ho evitaran a tota costa!",
        DialogLayout.BOTTOM)
    levelSelector()
def sceneOne():
    scene.set_background_image(assets.image("""
        SceneOne
    """))
    game.show_long_text("Després de la victoria a The Land Of The Forgotten, EON pren camí en una nova aventura, un regne on els germans del silenci 'Echo' i 'Quietus' tenen el control total, The Domain Of Silence",
        DialogLayout.BOTTOM)
    sceneTwo()
EON: Sprite = None
RecPlay: Sprite = None
LevelOne:Sprite = None
LevelTwo:Sprite = None
LevelThree:Sprite = None
LevelTwoBlock:Sprite = None
LevelThreeBlock:Sprite = None
lookLeft: List[Image] = []
scene.set_background_image(assets.image("""
    myImage
"""))
play()
lookRight = assets.animation("""
    LookingRight
""")
lookLeft = assets.animation("""
    LookingLeft
""")

def on_on_update():
    if controller.left.is_pressed():
        animation.run_image_animation(EON, lookLeft, 200, True)
    elif controller.right.is_pressed():
        animation.run_image_animation(EON, lookRight, 200, True)
game.on_update(on_on_update)

def on_on_overlap(sprite, otherSprite):
    otherSprite.start_effect(effects.bubbles, 21)
    if otherSprite == LevelOne:
        EON.say_text("Level One", 100, False)
        if controller.A.is_pressed():
            effects.clear_particles(otherSprite)
    elif otherSprite == LevelTwo:
        EON.say_text("Level Two", 100, False)
        if controller.A.is_pressed():
            effects.clear_particles(otherSprite)
    elif otherSprite == LevelThree:
        EON.say_text("Level Three", 100, False)
        if controller.A.is_pressed():
            effects.clear_particles(otherSprite)
    elif otherSprite == LevelTwoBlock or otherSprite == LevelThreeBlock:
        EON.say_text("Has de passar-te l'anterior nivell!", 100, False)
        if controller.A.is_pressed():
            effects.clear_particles(otherSprite)
sprites.on_overlap(SpriteKind.user, SpriteKind.option, on_on_overlap)
