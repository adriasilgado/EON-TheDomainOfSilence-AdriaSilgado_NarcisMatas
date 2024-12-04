@namespace
class SpriteKind:
    level = SpriteKind.create()
    EON = SpriteKind.create()
    soul = SpriteKind.create()
    powerup = SpriteKind.create()
    enemy = SpriteKind.create()
    projectile = SpriteKind.create()
    UI = SpriteKind.create()
    portal = SpriteKind.create()
    boss = SpriteKind.create()
levelsPass = [True, False, True]
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
    tiles.set_current_tilemap(tilemap("""
            CleanLevel
        """))
        
    scene.center_camera_at(80, 60)
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
    EON.z = 100
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
    global EON, LevelOne, LevelTwo, LevelThree, LevelTwoBlock, LevelThreeBlock, DoubleJump, MaxStrenght, isDoubleJump, isLevel, Portal, memoryScore, score, Soul, Soul2, Soul3, Soul4, Soul5, whatLevel
    whatLevel = 1
    memoryScore = score
    isLevel = True
    update_score()
    create_hearts()
    Soul = sprites.create(assets.image("""
            SoulStatic
        """), SpriteKind.soul)
    Soul2 = sprites.create(assets.image("""
            SoulStatic
        """), SpriteKind.soul)
    Soul3 = sprites.create(assets.image("""
                SoulStatic
            """), SpriteKind.soul)
    Soul4 = sprites.create(assets.image("""
                SoulStatic
            """), SpriteKind.soul)
    Soul5 = sprites.create(assets.image("""
                    SoulStatic
                """), SpriteKind.soul)                
    DoubleJump = sprites.create(assets.image("""
            DoubleJump
        """), SpriteKind.powerup)
    MaxStrenght = sprites.create(assets.image("""
            MaxStrenght
        """), SpriteKind.powerup)
    Portal = sprites.create(assets.image("""
                Portal
            """), SpriteKind.portal)
    Portal.z = 1
    Portal.set_position(1950, 140)
    Portal.ay = 200
    Soul.set_position(136, 130)
    Soul2.set_position(808,184)
    Soul3.set_position(1200,152)
    Soul4.set_position(1656,200)
    Soul5.set_position(1808,40)
    DoubleJump.set_position(1704,200)
    MaxStrenght.set_position(440,136)
    animation.run_image_animation(Soul, soulMovement, 200, True)
    animation.run_image_animation(Soul2, soulMovement, 200, True)
    animation.run_image_animation(Soul3, soulMovement, 200, True)
    animation.run_image_animation(Soul4, soulMovement, 200, True)
    animation.run_image_animation(Soul5, soulMovement, 200, True)
    animation.run_image_animation(DoubleJump, jumpMovement, 200, True)
    animation.run_image_animation(MaxStrenght, strenghtMovement, 200, True)
    animation.run_image_animation(Portal, PortalAnim, 200, True)
    EON.ay = 300
    EON.set_bounce_on_wall(False)
    controller.move_sprite(EON, 100, 0)
    scene.camera_follow_sprite(EON)
    scene.set_background_image(assets.image("""
            Back
    """))
    tiles.set_current_tilemap(tilemap("""
        nivel1
    """))
    tiles.place_on_tile(EON, tiles.get_tile_location(2, 8))
    if LevelOne != None:
        LevelOne.destroy()
    if LevelTwo != None:
        LevelTwo.destroy()
    if LevelThree != None:
        LevelThree.destroy()
    if LevelTwoBlock != None:
        LevelTwoBlock.destroy()
    if LevelThreeBlock != None:
        LevelThreeBlock.destroy()
    create_enemy(800, 50)
    create_skull(1350, 50)

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

def SecondLevel():
    global EON, LevelOne, LevelTwo, LevelThree, LevelTwoBlock, LevelThreeBlock, DoubleJump, MaxStrenght, isDoubleJump, isLevel, Portal, memoryScore, score, Soul, Soul2, Soul3, Soul4, Soul5, whatLevel 
    whatLevel = 2
    memoryScore = score
    isLevel = True
    update_score()
    create_hearts()
    Soul = sprites.create(assets.image("""
            SoulStatic
        """), SpriteKind.soul)
    Soul2 = sprites.create(assets.image("""
                SoulStatic
            """), SpriteKind.soul)
    Soul3 = sprites.create(assets.image("""
                SoulStatic
            """), SpriteKind.soul)
    Soul4 = sprites.create(assets.image("""
                SoulStatic
            """), SpriteKind.soul)
    Soul5 = sprites.create(assets.image("""
                    SoulStatic
                """), SpriteKind.soul)    
    DoubleJump = sprites.create(assets.image("""
            DoubleJump
        """), SpriteKind.powerup)
    MaxStrenght = sprites.create(assets.image("""
            MaxStrenght
        """), SpriteKind.powerup)
    Portal = sprites.create(assets.image("""Portal"""), SpriteKind.portal)
    Portal.z = 1
    Portal.set_position(1950, 140)
    Portal.ay = 200
    Soul.set_position(80, 160)
    Soul2.set_position(100, 160)
    Soul3.set_position(120, 160)
    Soul4.set_position(140, 160)
    Soul5.set_position(160, 160)
    DoubleJump.set_position(100, 150)
    MaxStrenght.set_position(140, 150)
    animation.run_image_animation(Soul, soulMovement, 200, True)
    animation.run_image_animation(Soul2, soulMovement, 200, True)
    animation.run_image_animation(Soul3, soulMovement, 200, True)
    animation.run_image_animation(Soul4, soulMovement, 200, True)
    animation.run_image_animation(Soul5, soulMovement, 200, True)
    animation.run_image_animation(DoubleJump, jumpMovement, 200, True)
    animation.run_image_animation(MaxStrenght, strenghtMovement, 200, True)
    animation.run_image_animation(Portal, PortalAnim, 200, True)
    EON.ay = 300
    EON.set_bounce_on_wall(False)
    controller.move_sprite(EON, 100, 0)
    scene.camera_follow_sprite(EON)
    scene.set_background_image(assets.image("""
            Back
    """))
    tiles.set_current_tilemap(tilemap("""
        nivel2
    """))
    tiles.place_on_tile(EON, tiles.get_tile_location(2, 8))
    if LevelOne != None:
        LevelOne.destroy()
    if LevelTwo != None:
        LevelTwo.destroy()
    if LevelThree != None:
        LevelThree.destroy()
    if LevelTwoBlock != None:
        LevelTwoBlock.destroy()
    if LevelThreeBlock != None:
        LevelThreeBlock.destroy()
    create_enemy(800, 50)
    create_skull(1350, 50)    
    
    
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

def ThirdLevel():
    global EON, LevelOne, LevelTwo, LevelThree, LevelTwoBlock, LevelThreeBlock, DoubleJump, MaxStrenght, isDoubleJump, isLevel, Portal, memoryScore, score, Soul, Soul2, Soul3, Soul4, Soul5
    memoryScore = score
    isLevel = True
    update_score()
    create_hearts()
    Soul = sprites.create(assets.image("""
            SoulStatic
        """), SpriteKind.soul)
    Soul2 = sprites.create(assets.image("""
                SoulStatic
            """), SpriteKind.soul)
    Soul3 = sprites.create(assets.image("""
                SoulStatic
            """), SpriteKind.soul)
    Soul4 = sprites.create(assets.image("""
                SoulStatic
            """), SpriteKind.soul)
    Soul5 = sprites.create(assets.image("""
                    SoulStatic
                """), SpriteKind.soul)
    DoubleJump = sprites.create(assets.image("""
            DoubleJump
        """), SpriteKind.powerup)
    MaxStrenght = sprites.create(assets.image("""
            MaxStrenght
        """), SpriteKind.powerup)
    Portal = sprites.create(assets.image("""Portal"""), SpriteKind.portal)
    Portal.z = 1
    #NO TOQUES ESTA POSICION DEL PORTAL
    Portal.set_position(1950, 140)
    Portal.ay = 200
    Soul.set_position(80, 160)
    Soul2.set_position(100, 160)
    Soul3.set_position(120, 160)
    Soul4.set_position(140, 160)
    Soul5.set_position(160, 160)
    DoubleJump.set_position(100, 150)
    MaxStrenght.set_position(140, 150)
    animation.run_image_animation(Soul, soulMovement, 200, True)
    animation.run_image_animation(Soul2, soulMovement, 200, True)
    animation.run_image_animation(Soul3, soulMovement, 200, True)
    animation.run_image_animation(Soul4, soulMovement, 200, True)
    animation.run_image_animation(Soul5, soulMovement, 200, True)
    animation.run_image_animation(DoubleJump, jumpMovement, 200, True)
    animation.run_image_animation(MaxStrenght, strenghtMovement, 200, True)
    animation.run_image_animation(Portal, PortalAnim, 200, True)
    EON.ay = 300
    EON.set_bounce_on_wall(False)
    controller.move_sprite(EON, 100, 0)
    scene.camera_follow_sprite(EON)
    scene.set_background_image(assets.image("""
            Back
    """))
    tiles.set_current_tilemap(tilemap("""
        nivel3
    """))
    tiles.place_on_tile(EON, tiles.get_tile_location(5, 8))
    if LevelOne != None:
        LevelOne.destroy()
    if LevelTwo != None:
        LevelTwo.destroy()
    if LevelThree != None:
        LevelThree.destroy()
    if LevelTwoBlock != None:
        LevelTwoBlock.destroy()
    if LevelThreeBlock != None:
        LevelThreeBlock.destroy()
    create_boss()
    
    
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

    def endMap():
        global memoryScore
        if tiles.tile_at_location_equals(EON.tilemap_location(), assets.tile("""
                EndMap
                """)):
            returnLevelSelector(memoryScore)
    game.on_update(endMap)


def create_boss():
    global Boss, boss_health, boss_is_attacking, boss_last_attack_time, boss_current_animation

    # Inicialización de variables globales
    boss_health = 10
    boss_is_attacking = False
    boss_last_attack_time = 0
    boss_current_animation = ""

    # Crear el sprite del jefe
    Boss = sprites.create(assets.image("""
        Boss1
    """), SpriteKind.boss)
    Boss.set_position(1800, 140)  # Posición inicial
    Boss.ay = 200  # Gravedad aplicada al jefe

    # Establecer hitbox fija
    Boss.set_hitbox()

    # Animación por defecto: IdleLeft
    animation.run_image_animation(Boss, BossIdleLeft, 1000, True)
    boss_current_animation = "IdleLeft"

    # Detectar y perseguir a EON
    def boss_behaviour():
        global boss_is_attacking, boss_current_animation, boss_last_attack_time

        distance_to_player = Math.abs(Boss.x - EON.x)  # Distancia horizontal entre Boss y EON

        if distance_to_player > 100:  # Zona de patrullaje (fuera de la detección de EON)
            boss_is_attacking = False
            Boss.vx = -30  # Velocidad baja para patrullaje
            if boss_current_animation != "RunLeft":
                animation.run_image_animation(Boss, BossRunLeft, 500, True)
                boss_current_animation = "RunLeft"

        elif 30 < distance_to_player <= 100:  # Zona de detección (persecución)
            boss_is_attacking = False
            Boss.vx = 60 if Boss.x < EON.x else -60  # Aumentar velocidad en persecución
            if Boss.vx > 0 and boss_current_animation != "RunRight":
                animation.run_image_animation(Boss, BossRunRight, 500, True)
                boss_current_animation = "RunRight"
            elif Boss.vx < 0 and boss_current_animation != "RunLeft":
                animation.run_image_animation(Boss, BossRunLeft, 500, True)
                boss_current_animation = "RunLeft"

        elif distance_to_player <= 30:  # Zona de ataque
            boss_is_attacking = True
            Boss.vx = 0  # El jefe se detiene para atacar
            current_time = game.runtime()
            if current_time - boss_last_attack_time > 1000:  # Delay entre ataques (1 segundo)
                # Mantener al jefe en la posición vertical actual
                Boss.y = 155  # Ajustar según el tamaño del sprite

                # Configurar animación de ataque
                if Boss.x < EON.x and boss_current_animation != "AttackRight":
                    animation.run_image_animation(Boss, BossAttackRight, 300, True)
                    boss_current_animation = "AttackRight"
                elif Boss.x > EON.x and boss_current_animation != "AttackLeft":
                    animation.run_image_animation(Boss, BossAttackLeft, 300, True)
                    boss_current_animation = "AttackLeft"

                # Aplicar daño a EON si está cerca
                if Boss.overlaps_with(EON):
                    lose_heart()
                boss_last_attack_time = current_time

    # Registrar la función para ejecutarse en cada actualización
    game.on_update(boss_behaviour)

def update_score():
    global score_label, score_sprite, score
    if score_label is None:
        score_label = textsprite.create(str(score), 3, 6) # el 3 (fondo) y el 6(fuente) cambian colores
        score_label.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
        
        score_sprite = sprites.create(assets.image("""
                    SoulStatic
            """), SpriteKind.UI)
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

def create_enemy(x, y):
    global Mago, is_attacking, patrol_direction, last_shot_time
    is_attacking = False
    patrol_direction = -1
    last_shot_time = game.runtime()  # 1 para la derecha, -1 para la izquierda

    # Crear el enemigo
    Mago = sprites.create(assets.image("""
        Mago
    """), SpriteKind.enemy)
    Mago.set_position(x, y)
    Mago.ay = 200

    # Configurar el comportamiento del enemigo
    def patrol():
        global patrol_direction
        if not is_attacking:  # Solo patrulla si no está atacando
            Mago.vx = patrol_direction * 50  # Velocidad de patrullaje
            if tiles.tile_at_location_equals(Mago.tilemap_location(), assets.tile("""
                            PatrolStopMago
                        """)):
                patrol_direction *= -1  # Cambiar dirección
                Mago.vx = patrol_direction * 50
                

    def detect_player():
        global is_attacking
        distance_to_player = Math.abs(Mago.x - EON.x)  # Distancia horizontal
        if distance_to_player < 80:  # Detecta al jugador si está cerca
            is_attacking = True
            attack_player()
        else:
            is_attacking = False  # Vuelve al modo patrulla si el jugador se aleja

    def attack_player():
        global last_shot_time, current_animation, projectile, isDead, score
        if is_attacking:
            Mago.vx = 0  # Detener el movimiento
            current_time = game.runtime()  # Tiempo actual del juego
            if current_time - last_shot_time > 1000 and current_animation != "" and not isDead:  # Dispara cada 1 segundo
                # Crear un proyectil
                projectile = sprites.create_projectile_from_sprite(
                    assets.image("""
                        Bola
                    """),  # Imagen del proyectil
                    Mago,  # El enemigo dispara
                    (EON.x - Mago.x) / abs(EON.x - Mago.x) * 100,  # Velocidad en X dirigida al jugador
                    0  # Velocidad en Y (horizontal)
                )
                projectile.set_kind(SpriteKind.projectile)
                if (EON.x - Mago.x) < 0:  # Jugador a la izquierda
                    animation.run_image_animation(projectile, BallLeft, 250, True)
                else:  # Jugador a la derecha
                    animation.run_image_animation(projectile, BallRight, 250, True)
                last_shot_time = current_time
    # Comportamiento continuo
    game.on_update(patrol)
    game.on_update(detect_player)

    def endMap():
        global memoryScore
        if tiles.tile_at_location_equals(EON.tilemap_location(), assets.tile("""
                EndMap
                """)):
            returnLevelSelector(memoryScore)
    game.on_update(endMap)

    def on_on_update2():
        global patrol_direction, is_attacking, current_animation
        if not is_attacking and isLevel:  # Solo anima en patrullaje si no está atacando
            if patrol_direction == -1 and current_animation != "MageLeft":
                animation.run_image_animation(Mago, MageLeft, 1000, True)
                current_animation = "MageLeft"
            elif patrol_direction == 1 and current_animation != "MageRight":
                animation.run_image_animation(Mago, MageRight, 1000, True)
                current_animation = "MageRight"
    game.on_update(on_on_update2)

    def on_on_update3():
        global patrol_direction, is_attacking, current_animation, isLevel
        if is_attacking and isLevel:  # Solo anima si está atacando
            if (EON.x - Mago.x) < 0 and current_animation != "MageLeftAttack":  # Jugador a la izquierda
                animation.run_image_animation(Mago, MageLeftAttack, 250, True)
                current_animation = "MageLeftAttack"
            elif (EON.x - Mago.x) > 0 and current_animation != "MageRightAttack":  # Jugador a la derecha
                animation.run_image_animation(Mago, MageRightAttack, 250, True)
                current_animation = "MageRightAttack"
    game.on_update(on_on_update3)


def create_skull(x, y):
    global Skull, skull_is_attacking, skull_patrol_direction, skull_last_attack_time, skull_current_animation

    skull_is_attacking = False
    skull_patrol_direction = -1  # Dirección inicial de patrullaje (-1: izquierda, 1: derecha)
    skull_last_attack_time = game.runtime()
    skull_current_animation = ""

    # Crear el enemigo Skull
    Skull = sprites.create(assets.image("""
        Skull
    """), SpriteKind.enemy)
    Skull.set_position(x, y)  # Posición inicial del enemigo
    Skull.ay = 200  # Gravedad para mantener al enemigo en el suelo

    # Configurar patrullaje
    def skull_patrol():
        global skull_patrol_direction
        if not skull_is_attacking:  # Solo patrulla si no está atacando
            Skull.vx = skull_patrol_direction * 50  # Velocidad de patrullaje

            # Detectar si está en un tile de borde y cambiar de dirección
            if tiles.tile_at_location_equals(Skull.tilemap_location(), assets.tile("""
                PatrolStopMago
            """)):
                skull_patrol_direction *= -1  # Cambiar dirección
                Skull.vx = skull_patrol_direction * 50

    # Detectar a EON y entrar en modo ataque
    def skull_detect_and_chase():
        global skull_is_attacking
        distance_to_player = Math.abs(Skull.x - EON.x)  # Distancia horizontal entre Skull y EON
        if distance_to_player < 50:  # Detecta a EON dentro de un rango
            skull_is_attacking = True
        elif distance_to_player > 80:  # Si se aleja mucho, vuelve a patrullar
            skull_is_attacking = False

        # Si está atacando, perseguir a EON
        if skull_is_attacking:
            Skull.vx = 80 if Skull.x < EON.x else -80

    # Atacar a EON
    def skull_attack_player():
        global skull_last_attack_time, skull_current_animation
        if skull_is_attacking and Math.abs(Skull.x - EON.x) < 10:  # Si está cerca del jugador
            Skull.vx = 0  # Detener el movimiento para atacar
            current_time = game.runtime()
            if current_time - skull_last_attack_time > 1000:  # 1 segundo entre ataques
                # Determinar la dirección de ataque
                if Skull.x > EON.x:  # Jugador a la izquierda
                    if skull_current_animation != "SkullLeftAttack":
                        animation.run_image_animation(Skull, SkullLeftAttack, 250, True)
                        skull_current_animation = "SkullLeftAttack"
                elif Skull.x < EON.x:  # Jugador a la derecha
                    if skull_current_animation != "SkullRightAttack":
                        animation.run_image_animation(Skull, SkullRightAttack, 250, True)
                        skull_current_animation = "SkullRightAttack"

                # Aplicar daño si está en contacto con EON
                if Skull.overlaps_with(EON):
                    lose_heart()
                skull_last_attack_time = current_time
        else:
            if skull_is_attacking and Skull.vx != 0:  # Mantener dirección correcta mientras persigue
                if Skull.vx > 0 and skull_current_animation != "SkullRightAttack":
                    animation.run_image_animation(Skull, SkullRightAttack, 250, True)
                    skull_current_animation = "SkullRightAttack"
                elif Skull.vx < 0 and skull_current_animation != "SkullLeftAttack":
                    animation.run_image_animation(Skull, SkullLeftAttack, 250, True)
                    skull_current_animation = "SkullLeftAttack"

    # Animaciones de patrullaje
    def skull_animations():
        global skull_patrol_direction, skull_is_attacking, skull_current_animation
        if not skull_is_attacking:  # Solo anima en patrullaje si no está atacando
            if skull_patrol_direction == -1 and skull_current_animation != "SkullLeft":
                animation.run_image_animation(Skull, SkullLeft, 1000, True)
                skull_current_animation = "SkullLeft"
            elif skull_patrol_direction == 1 and skull_current_animation != "SkullRight":
                animation.run_image_animation(Skull, SkullRight, 1000, True)
                skull_current_animation = "SkullRight"

    # Registrar funciones de actualización
    game.on_update(skull_patrol)
    game.on_update(skull_detect_and_chase)
    game.on_update(skull_attack_player)
    game.on_update(skull_animations)


def create_hearts():
    global hearts
    for i in range(3):
        heart = sprites.create(assets.image("""
            Corazon
        """), SpriteKind.UI)
        scaling.scale_to_percent(heart, 50, ScaleDirection.UNIFORMLY, ScaleAnchor.MIDDLE)
        heart.set_position(120 + i * 15, 10)
        hearts.append(heart)
        heart.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)

def lose_heart():
    global heart_count, memoryScore
    if heart_count > 0:
        # Quitar un corazón visualmente
        hearts[heart_count - 1].destroy()
        heart_count -= 1
        is_taking_damage = True
        damage_time = game.runtime()

        # Configurar animación de daño dependiendo de la dirección actual
        if currentAnimationEON == "Left":
            animation.stop_animation(animation.AnimationTypes.ALL, EON)
            animation.run_image_animation(EON, DamageLeft, 200, False)
        elif currentAnimationEON == "Right":
            animation.stop_animation(animation.AnimationTypes.ALL, EON)
            animation.run_image_animation(EON, DamageRight, 200, False)
        if heart_count == 0:
            returnLevelSelector(memoryScore)

def check_collision_with_projectile():
    global heart_count
    for projectile in sprites.all_of_kind(SpriteKind.projectile):
        if projectile.overlaps_with(EON):
            projectile.destroy()  # Eliminar el proyectil
            lose_heart()
game.on_update(check_collision_with_projectile)

def returnLevelSelector(setScore):
    global score, patrol_direction, last_shot_time, current_animation, heart_count, hearts, isLevel, score_label, currentAnimationEON, damage_time, is_taking_damage
    isLevel = False
    sprites.destroy_all_sprites_of_kind(SpriteKind.EON)
    sprites.destroy_all_sprites_of_kind(SpriteKind.soul)
    sprites.destroy_all_sprites_of_kind(SpriteKind.powerup)
    sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
    sprites.destroy_all_sprites_of_kind(SpriteKind.projectile)
    sprites.destroy_all_sprites_of_kind(SpriteKind.UI)
    score_label.set_text("")
    score_label = None
    score = setScore
    patrol_direction = 1
    last_shot_time = 0
    current_animation = ""
    heart_count = 3
    hearts = []
    tiles.set_current_tilemap(tilemap("""
        CleanLevel
    """))
    levelSelector()

EON: Sprite = None
RecPlay: Sprite = None
LevelOne:Sprite = None
LevelTwo:Sprite = None
LevelThree:Sprite = None
LevelTwoBlock:Sprite = None
LevelThreeBlock:Sprite = None
Soul:Sprite = None
Soul2:Sprite = None
Soul3:Sprite = None
Soul4:Sprite = None
Soul5:Sprite = None
DoubleJump:Sprite = None
MaxStrenght:Sprite = None
lookLeft: List[Image] = []
score = 5
memoryScore = score
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
Mago:Sprite = None
is_attacking = False
patrol_direction = 1
last_shot_time = 0
current_animation = ""
currentAnimationEON = ""
heart_count = 3
hearts: List[Sprite] = []
isLevel = False
projectile:Sprite = None
is_taking_damage = False
damage_time = 0
Portal:Sprite = None
canAttack = False
isDead = False
Skull:Sprite = None
skull_is_attacking = False
skull_patrol_direction = 1
skull_last_attack_time = 0
skull_current_animation = ""
skull_live = 2
whatLevel = 0
Boss:Sprite = None  # El sprite del jefe
boss_health = 10  # Vida del jefe
boss_is_attacking = False  # Indica si el jefe está atacando
boss_last_attack_time = 0  # Último momento en el que el jefe atacó
boss_current_animation = ""  # Animación actual del jefe
last_attack_time = 0

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
attackLeft = assets.animation("""
    AttackingLeft
""")
attackRight = assets.animation("""
    AttackingRight
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
MageRight = assets.animation("""
    MageIdleRight
""")
MageLeft = assets.animation("""
    MageIdleLeft
""")
MageRightAttack = assets.animation("""
    MageAttackRight
""")
MageLeftAttack = assets.animation("""
    MageAttackLeft
""")
SkullRight = assets.animation("""
    SkullIdleRight
""")
SkullLeft = assets.animation("""
    SkullIdleLeft
""")
SkullRightAttack = assets.animation("""
    SkullAttackRight
""")
SkullLeftAttack = assets.animation("""
    SkullAttackLeft
""")
BallLeft = assets.animation("""
    BolaAnimLeft
""")
BallRight = assets.animation("""
    BolaAnimRight
""")
DamageRight = assets.animation("""
    DamageRight
""")
DamageLeft = assets.animation("""
    DamageLeft
""")
PortalAnim = assets.animation("""
    PortalFinal
""")
BossIdleLeft = assets.animation("""
    Boss1IdleLeft
""")
BossRunLeft = assets.animation("""
    Boss1RunLeft
""")
BossRunRight = assets.animation("""
    Boss1RunRight
""")
BossAttackLeft = assets.animation("""
    Boss1AttackLeft
""")
BossAttackRight = assets.animation("""
    Boss1AttackRight
""")

def on_on_update():
    global is_taking_damage, damage_time, currentAnimationEON, isLevel, canAttack
    if is_taking_damage:
        canAttack = False
        # Calcular tiempo transcurrido desde el daño
        elapsed_time = game.runtime() - damage_time
        if elapsed_time < 500:  # Estado de daño dura 500 ms
            return  # Evitar ejecutar otras animaciones
        else:
            # Terminar el estado de daño después de 500 ms
            is_taking_damage = False

    # Si no está en daño, manejar animaciones normales

    if controller.A.is_pressed() and isLevel:
        if currentAnimationEON == "Left":
            animation.run_image_animation(EON, attackLeft, 50, False)
        elif currentAnimationEON == "Right":
            animation.run_image_animation(EON, attackRight, 50, False)
        canAttack = True
    if controller.left.is_pressed():
        currentAnimationEON = "Left"
        animation.run_image_animation(EON, lookLeft, 200, True)
        canAttack = False
    elif controller.right.is_pressed():
        currentAnimationEON = "Right"
        animation.run_image_animation(EON, lookRight, 200, True)
        canAttack = False
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
            SecondLevel()
    elif otherSprite == LevelThree:
        EON.say_text("Level Three", 100, False)
        if controller.A.is_pressed():
            otherSprite.destroy()
            effects.clear_particles(otherSprite)
            ThirdLevel()
    elif otherSprite == LevelTwoBlock or otherSprite == LevelThreeBlock:
        EON.say_text("Has de passar-te l'anterior nivell!", 100, False)
        if controller.A.is_pressed():
            effects.clear_particles(otherSprite)
sprites.on_overlap(SpriteKind.EON, SpriteKind.level, on_on_overlap)

def on_on_overlap2(sprite2, otherSprite2):
    global score
    if otherSprite2 == Soul or otherSprite2 == Soul2 or otherSprite2 == Soul3 or otherSprite2 == Soul4 or otherSprite2 == Soul5:
        otherSprite2.destroy()
        score += 1
        update_score()
sprites.on_overlap(SpriteKind.EON, SpriteKind.soul, on_on_overlap2)

def on_on_overlap3(sprite3, otherSprite3):
    global DJ_time, MS_time, countdown_active_DJ, countdown_active_MS, DJ_label, MS_label, isDoubleJump
    if otherSprite3 == DoubleJump:
        otherSprite3.destroy()
        DJ_label = sprites.create(assets.image("""
                                            DJBar
                    """), SpriteKind.UI)
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
                """), SpriteKind.UI)
        MS_label.set_position(30, 10)
        MS_label.set_flag(SpriteFlag.RELATIVE_TO_CAMERA, True)
        MS_time = 5
        animation.run_image_animation(MS_label, MSBarMovement, 1000, True)
        countdown_active_MS = True
sprites.on_overlap(SpriteKind.EON, SpriteKind.powerup, on_on_overlap3)

def on_on_overlap4(sprite4, otherSprite4):
    global levelsPass, score, whatLevel
    if otherSprite4 == Portal and controller.A.is_pressed():
        levelsPass[whatLevel] = True
        otherSprite4.destroy()
        returnLevelSelector(score)
sprites.on_overlap(SpriteKind.EON, SpriteKind.portal, on_on_overlap4)

def on_on_overlap5(sprite5, otherSprite5):
    global canAttack, current_animation, isDead
    if otherSprite5 == Mago and canAttack:
        otherSprite5.destroy()
        isDead = True
        current_animation = ""
sprites.on_overlap(SpriteKind.EON, SpriteKind.enemy, on_on_overlap5)

def on_on_overlap6(sprite6, otherSprite6):
    global canAttack, skull_live
    if otherSprite6 == Skull and canAttack:
        skull_live -= 1
        if skull_live <= 0:
            otherSprite6.destroy()
sprites.on_overlap(SpriteKind.EON, SpriteKind.enemy, on_on_overlap6)

def on_on_overlap7(sprite7, otherSprite7):
    global canAttack, boss_health
    current_time = game.runtime()
    print("Vida boss: " + boss_health)
    if otherSprite7 == Boss and canAttack:
        boss_health -= 1
        print("Vida boss: " + str(boss_health))  # Imprimir la vida para ver el cambio
        last_attack_time = current_time  # Actualizar el tiempo del último ataque

        if boss_health <= 0:
            print("El jefe ha sido derrotado")
            Boss.destroy()  # 500 ms de cooldown entre ataques (ajustable)
            
sprites.on_overlap(SpriteKind.EON, SpriteKind.boss, on_on_overlap7)

skull_is_attacking

def update_timer_DJ():
    global DJ_time, countdown_active_DJ, DJ_label, isDoubleJump
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
    if countdown_active_MS:
        if MS_time > 0:
            MS_time -= 1
        if MS_time == 0:
            #game.splash("¡Tiempo terminado!")
            MS_label.destroy()
            countdown_active_MS = False
            MS_time = -1
game.on_update_interval(1000, update_timer_MS)
