@namespace
class SpriteKind:
    level = SpriteKind.create()
    EON = SpriteKind.create()
    soul = SpriteKind.create()
    powerup = SpriteKind.create()
    enemy = SpriteKind.create()
levelsPass = [True, False, False]
def play():
    global RecPlay
    RecPlay = sprites.create(assets.image("""
        blink
    """))
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
            """), SpriteKind.level)
    LevelOne.set_position(88, 90)
    if levelsPass[1]:
        LevelTwo = sprites.create(assets.image("""
                LevelTwo
            """), SpriteKind.level)
        LevelTwo.set_position(40, 65)
    else:
        LevelTwoBlock = sprites.create(assets.image("""
                        LevelBlock
                    """), SpriteKind.level)
        LevelTwoBlock.set_position(40, 65)
    if levelsPass[2]:
        LevelThree = sprites.create(assets.image("""
                        LevelThree
                    """), SpriteKind.level)
        LevelThree.set_position(73, 35)
    else:
        LevelThreeBlock = sprites.create(assets.image("""
                        LevelBlock
                    """), SpriteKind.level)
        LevelThreeBlock.set_position(73, 35)
    EON = sprites.create(assets.image("""
                    EON
                """), SpriteKind.EON)
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
    global EON, Soul, LevelTwoBlock, LevelThreeBlock, DoubleJump, MaxStrenght, DoubleJump2, isDoubleJump
    update_score()
    Soul = sprites.create(assets.image("""
            SoulStatic
        """), SpriteKind.soul)
    DoubleJump = sprites.create(assets.image("""
            DoubleJump
        """), SpriteKind.powerup)
    DoubleJump2 = sprites.create(assets.image("""
                DoubleJump
            """), SpriteKind.powerup)
    MaxStrenght = sprites.create(assets.image("""
            MaxStrenght
        """), SpriteKind.powerup)
    Soul.set_position(80, 160)
    DoubleJump.set_position(100, 150)
    DoubleJump2.set_position(60, 120)
    MaxStrenght.set_position(140, 150)
    animation.run_image_animation(Soul, soulMovement, 200, True)
    animation.run_image_animation(DoubleJump, jumpMovement, 200, True)
    animation.run_image_animation(DoubleJump2, jumpMovement, 200, True)
    animation.run_image_animation(MaxStrenght, strenghtMovement, 200, True)
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
        global canDoubleJump, isDoubleJump
        if EON.is_hitting_tile(CollisionDirection.BOTTOM):
            EON.vy = -150
            canDoubleJump = True
        elif canDoubleJump and isDoubleJump:
            EON.vy = -150
            canDoubleJump = False
    controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

    def on_up_pressed():
        global canDoubleJump, isDoubleJump
        if EON.is_hitting_tile(CollisionDirection.BOTTOM):
            EON.vy = -150
        elif canDoubleJump and isDoubleJump:
            EON.vy = -150
            canDoubleJump = False
    controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def update_score():
    global score_label, score_sprite
    if score_label is None:
        score_label = textsprite.create("0", 3, 6)
        score_label.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
        
        score_sprite = sprites.create(assets.image("""
                    SoulStatic
            """))
        score_sprite.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
        
        center_score()
    else:
        score_label.set_text(str(score))
        center_score()
def center_score():
    total_width = score_sprite.width + 5 + score_label.width
    center_x = (screen.width // 2) - (total_width // 2)
    
    score_sprite.set_position(center_x, 8)
    score_label.set_position(center_x + score_sprite.width + 5, 11)
EON: Sprite = None
RecPlay: Sprite = None
LevelOne:Sprite = None
LevelTwo:Sprite = None
LevelThree:Sprite = None
LevelTwoBlock:Sprite = None
LevelThreeBlock:Sprite = None
Soul:Sprite = None
DoubleJump:Sprite = None
DoubleJump2:Sprite = None
MaxStrenght:Sprite = None
lookLeft: List[Image] = []
score = 0
score_label:TextSprite = None
score_sprite:Sprite = None
DJ_time = 5
DJ_label:Sprite = None
countdown_active_DJ = False
isDoubleJump = False
canDoubleJump = False
MS_time = 5
MS_label:Sprite = None
countdown_active_MS = False

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
jumpMovement = assets.animation("""
    PotionJump
""")
strenghtMovement = assets.animation("""
    PotionStrength
""")
DJBarMovement = assets.animation("""
    BarraFX1
""")
MSBarMovement = assets.animation("""
    BarraFX2
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
sprites.on_overlap(SpriteKind.EON, SpriteKind.level, on_on_overlap)

def on_on_overlap2(sprite2, otherSprite2):
    global score
    if otherSprite2 == Soul:
        otherSprite2.destroy()
        score += 1
        update_score()
sprites.on_overlap(SpriteKind.EON, SpriteKind.soul, on_on_overlap2)

def on_on_overlap3(sprite3, otherSprite3):
    global DJ_time, MS_time, countdown_active_DJ, countdown_active_MS, DJ_label, MS_label, isDoubleJump
    if otherSprite3 == DoubleJump or otherSprite3 == DoubleJump2:
        otherSprite3.destroy()
        DJ_label = sprites.create(assets.image("""
                                            DJBar
                    """))
        DJ_label.set_position(30, 20)
        DJ_label.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
        DJ_time = 5
        animation.run_image_animation(DJ_label, DJBarMovement, 1000, True)
        isDoubleJump = True
        countdown_active_DJ = True
    elif otherSprite3 == MaxStrenght:
        otherSprite3.destroy()
        MS_label = sprites.create(assets.image("""
                MSBar
                """))
        MS_label.set_position(30, 10)
        MS_label.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
        MS_time = 5
        animation.run_image_animation(MS_label, MSBarMovement, 1000, True)
        countdown_active_MS = True
sprites.on_overlap(SpriteKind.EON, SpriteKind.powerup, on_on_overlap3)

def update_timer_DJ():
    global DJ_time, countdown_active_DJ, DJ_label, isDoubleJump
    print("Salto: " + DJ_time)
    if countdown_active_DJ:
        if DJ_time > 0:
            DJ_time -= 1
        if DJ_time == 0:
            #game.splash("¡Tiempo terminado!")
            DJ_label.destroy()
            countdown_active_DJ = False
            isDoubleJump = False
            DJ_time = -1 
game.on_update_interval(1000, update_timer_DJ)

def update_timer_MS():
    global MS_time, countdown_active_MS, MS_label
    print("Fuerza: " + MS_time)
    if countdown_active_MS:
        if MS_time > 0:
            MS_time -= 1
        if MS_time == 0:
            #game.splash("¡Tiempo terminado!")
            MS_label.destroy()
            countdown_active_MS = False
            MS_time = -1
game.on_update_interval(1000, update_timer_MS)
