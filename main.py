@namespace
class SpriteKind:
    option = SpriteKind.create()
    user = SpriteKind.create()
levelsPass = [True, False, False]
def play():
    global RecPlay
    info.set_score(0)
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
    EON.set_position(95, 55)
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
def FirstLevel():
    global EON, Soul, LevelTwoBlock, LevelThreeBlock
    Soul = sprites.create(assets.image("""
            SoulStatic
        """), SpriteKind.option)
    Soul.set_position(80, 160)
    animation.run_image_animation(Soul, soulMovement, 200, True)
    EON.ay = 300
    EON.set_bounce_on_wall(False)
    controller.move_sprite(EON, 100, 0)
    scene.camera_follow_sprite(EON)
    scene.set_background_image(assets.image("""
                SceneOne
    """))
    tiles.set_current_tilemap(tilemap("""
        Level1
    """))
    tiles.place_on_tile(EON, tiles.get_tile_location(0, 11))
    LevelTwoBlock.destroy()
    LevelThreeBlock.destroy()
    
    def on_b_pressed():
        if EON.is_hitting_tile(CollisionDirection.BOTTOM):
            EON.vy = -150
    controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

    def on_up_pressed():
        if EON.is_hitting_tile(CollisionDirection.BOTTOM):
            EON.vy = -150
    controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

EON: Sprite = None
RecPlay: Sprite = None
LevelOne:Sprite = None
LevelTwo:Sprite = None
LevelThree:Sprite = None
LevelTwoBlock:Sprite = None
LevelThreeBlock:Sprite = None
Soul:Sprite = None
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
soulMovement = assets.animation("""
    Soul
""")

def on_on_update(): 
    if controller.left.is_pressed():
        currentAnimation = "Left"
        animation.run_image_animation(EON, lookLeft, 200, True) 
    elif controller.right.is_pressed():
        currentAnimation = "Right"
        animation.run_image_animation(EON, lookRight, 200, True)
                
game.on_update(on_on_update)

def on_on_overlap(sprite, otherSprite):
    otherSprite.start_effect(effects.bubbles, 21)
    if otherSprite == LevelOne:
        EON.say_text("Level One", 100, False)
        if controller.A.is_pressed():
            otherSprite.destroy()
            effects.clear_particles(otherSprite)
            FirstLevel()
    elif otherSprite == LevelTwo:
        EON.say_text("Level Two", 100, False)
        if controller.A.is_pressed():
            otherSprite.destroy()
            effects.clear_particles(otherSprite)
    elif otherSprite == LevelThree:
        EON.say_text("Level Three", 100, False)
        if controller.A.is_pressed():
            otherSprite.destroy()
            effects.clear_particles(otherSprite)
    elif otherSprite == LevelTwoBlock or otherSprite == LevelThreeBlock:
        EON.say_text("Has de passar-te l'anterior nivell!", 100, False)
        if controller.A.is_pressed():
            effects.clear_particles(otherSprite)
    elif otherSprite == Soul:
        otherSprite.destroy()
        info.change_score_by(1)
sprites.on_overlap(SpriteKind.user, SpriteKind.option, on_on_overlap)