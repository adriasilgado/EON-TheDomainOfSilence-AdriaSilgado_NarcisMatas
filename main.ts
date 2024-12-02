namespace SpriteKind {
    export const level = SpriteKind.create()
    export const EON = SpriteKind.create()
    export const soul = SpriteKind.create()
    export const powerup = SpriteKind.create()
    export const enemy = SpriteKind.create()
    export const projectile = SpriteKind.create()
    export const UI = SpriteKind.create()
    export const portal = SpriteKind.create()
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
    
    tiles.setCurrentTilemap(tilemap`
            CleanLevel
        `)
    scene.centerCameraAt(80, 60)
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
    EON.z = 100
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
    
    isFirstLevel = true
    update_score()
    create_hearts()
    Soul = sprites.create(assets.image`
            SoulStatic
        `, SpriteKind.soul)
    DoubleJump = sprites.create(assets.image`
            DoubleJump
        `, SpriteKind.powerup)
    DoubleJump2 = sprites.create(assets.image`
                DoubleJump
            `, SpriteKind.powerup)
    MaxStrenght = sprites.create(assets.image`
            MaxStrenght
        `, SpriteKind.powerup)
    Portal = sprites.create(assets.image`
                Portal
            `, SpriteKind.portal)
    Portal.z = 1
    Portal.setPosition(450, 140)
    Soul.setPosition(80, 160)
    DoubleJump.setPosition(100, 150)
    DoubleJump2.setPosition(60, 120)
    MaxStrenght.setPosition(140, 150)
    animation.runImageAnimation(Soul, soulMovement, 200, true)
    animation.runImageAnimation(DoubleJump, jumpMovement, 200, true)
    animation.runImageAnimation(DoubleJump2, jumpMovement, 200, true)
    animation.runImageAnimation(MaxStrenght, strenghtMovement, 200, true)
    animation.runImageAnimation(Portal, PortalAnim, 200, true)
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
    create_enemy()
    controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
        
        if (EON.isHittingTile(CollisionDirection.Bottom)) {
            EON.vy = -150
            canDoubleJump = true
        } else if (canDoubleJump && isDoubleJump) {
            EON.vy = -150
            canDoubleJump = false
        }
        
    })
    controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
        
        if (EON.isHittingTile(CollisionDirection.Bottom)) {
            EON.vy = -150
        } else if (canDoubleJump && isDoubleJump) {
            EON.vy = -150
            canDoubleJump = false
        }
        
    })
}

function update_score() {
    
    if (score_label === null) {
        score_label = textsprite.create("0", 3, 6)
        //  el 3 (fondo) y el 6(fuente) cambian colores
        score_label.setFlag(SpriteFlag.RelativeToCamera, true)
        score_sprite = sprites.create(assets.image`
                    SoulStatic
            `, SpriteKind.UI)
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

function create_enemy() {
    
    is_attacking = false
    patrol_direction = -1
    last_shot_time = game.runtime()
    //  1 para la derecha, -1 para la izquierda
    //  Crear el enemigo
    Mago = sprites.create(assets.image`
        Mago
    `, SpriteKind.enemy)
    Mago.setPosition(260, 180)
    //  Configurar el comportamiento del enemigo
    //  Vuelve al modo patrulla si el jugador se aleja
    function attack_player() {
        let current_time: number;
        
        if (is_attacking) {
            Mago.vx = 0
            //  Detener el movimiento
            current_time = game.runtime()
            //  Tiempo actual del juego
            console.log(current_animation)
            if (current_time - last_shot_time > 1000 && current_animation != "") {
                //  Dispara cada 1 segundo
                //  Crear un proyectil
                projectile = sprites.createProjectileFromSprite(assets.image`
                        Bola
                    `, Mago, (EON.x - Mago.x) / Math.abs(EON.x - Mago.x) * 100, 0)
                //  Imagen del proyectil
                //  El enemigo dispara
                //  Velocidad en X dirigida al jugador
                //  Velocidad en Y (horizontal)
                projectile.setKind(SpriteKind.projectile)
                if (EON.x - Mago.x < 0) {
                    //  Jugador a la izquierda
                    animation.runImageAnimation(projectile, BallLeft, 250, true)
                } else {
                    //  Jugador a la derecha
                    animation.runImageAnimation(projectile, BallRight, 250, true)
                }
                
                last_shot_time = current_time
            }
            
        }
        
    }
    
    //  Comportamiento continuo
    game.onUpdate(function patrol() {
        
        if (!is_attacking) {
            //  Solo patrulla si no está atacando
            Mago.vx = patrol_direction * 50
            //  Velocidad de patrullaje
            if (tiles.tileAtLocationEquals(Mago.tilemapLocation(), assets.tile`
                            PatrolStopMago
                        `)) {
                patrol_direction *= -1
                //  Cambiar dirección
                Mago.vx = patrol_direction * 50
            }
            
        }
        
    })
    game.onUpdate(function detect_player() {
        
        let distance_to_player = Math.abs(Mago.x - EON.x)
        //  Distancia horizontal
        if (distance_to_player < 80) {
            //  Detecta al jugador si está cerca
            is_attacking = true
            attack_player()
        } else {
            is_attacking = false
        }
        
    })
    game.onUpdate(function on_on_update2() {
        
        if (!is_attacking && isFirstLevel) {
            //  Solo anima en patrullaje si no está atacando
            if (patrol_direction == -1 && current_animation != "MageLeft") {
                animation.runImageAnimation(Mago, MageLeft, 1000, true)
                current_animation = "MageLeft"
            } else if (patrol_direction == 1 && current_animation != "MageRight") {
                animation.runImageAnimation(Mago, MageRight, 1000, true)
                current_animation = "MageRight"
            }
            
        }
        
    })
    game.onUpdate(function on_on_update3() {
        
        if (is_attacking && isFirstLevel) {
            //  Solo anima si está atacando
            if (EON.x - Mago.x < 0 && current_animation != "MageLeftAttack") {
                //  Jugador a la izquierda
                animation.runImageAnimation(Mago, MageLeftAttack, 250, true)
                current_animation = "MageLeftAttack"
            } else if (EON.x - Mago.x > 0 && current_animation != "MageRightAttack") {
                //  Jugador a la derecha
                animation.runImageAnimation(Mago, MageRightAttack, 250, true)
                current_animation = "MageRightAttack"
            }
            
        }
        
    })
}

function create_hearts() {
    let heart: Sprite;
    
    for (let i = 0; i < 3; i++) {
        heart = sprites.create(assets.image`
            Corazon
        `, SpriteKind.UI)
        scaling.scaleToPercent(heart, 50, ScaleDirection.Uniformly, ScaleAnchor.Middle)
        heart.setPosition(120 + i * 15, 10)
        hearts.push(heart)
        heart.setFlag(SpriteFlag.RelativeToCamera, true)
    }
}

function lose_heart() {
    let is_taking_damage: boolean;
    let damage_time: number;
    
    if (heart_count > 0) {
        //  Quitar un corazón visualmente
        hearts[heart_count - 1].destroy()
        heart_count -= 1
        is_taking_damage = true
        damage_time = game.runtime()
        console.log("Estado de daño activado inmediatamente")
        //  Configurar animación de daño dependiendo de la dirección actual
        if (currentAnimationEON == "Left") {
            animation.stopAnimation(animation.AnimationTypes.All, EON)
            animation.runImageAnimation(EON, DamageLeft, 200, false)
        } else if (currentAnimationEON == "Right") {
            animation.stopAnimation(animation.AnimationTypes.All, EON)
            animation.runImageAnimation(EON, DamageRight, 200, false)
        }
        
        if (heart_count == 0) {
            returnLevelSelector()
        }
        
    }
    
}

game.onUpdate(function check_collision_with_projectile() {
    
    for (let projectile of sprites.allOfKind(SpriteKind.projectile)) {
        if (projectile.overlapsWith(EON)) {
            projectile.destroy()
            //  Eliminar el proyectil
            lose_heart()
        }
        
    }
})
function returnLevelSelector() {
    
    isFirstLevel = false
    sprites.destroyAllSpritesOfKind(SpriteKind.EON)
    sprites.destroyAllSpritesOfKind(SpriteKind.soul)
    sprites.destroyAllSpritesOfKind(SpriteKind.powerup)
    sprites.destroyAllSpritesOfKind(SpriteKind.enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.UI)
    score_label.setText("")
    score_label = null
    score = 0
    patrol_direction = 1
    last_shot_time = 0
    current_animation = ""
    heart_count = 3
    hearts = []
    tiles.setCurrentTilemap(tilemap`
        CleanLevel
    `)
    levelSelector()
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
let DoubleJump2 : Sprite = null
let MaxStrenght : Sprite = null
let lookLeft : Image[] = []
let score = 0
let score_label : TextSprite = null
let score_sprite : Sprite = null
let DJ_time = 5
let DJ_label : Sprite = null
let countdown_active_DJ = false
let isDoubleJump = false
let canDoubleJump = false
let MS_time = 5
let MS_label : Sprite = null
let countdown_active_MS = false
let Mago : Sprite = null
let is_attacking = false
let patrol_direction = 1
let last_shot_time = 0
let current_animation = ""
let currentAnimationEON = ""
let heart_count = 3
let hearts : Sprite[] = []
let isFirstLevel = false
let projectile : Sprite = null
let is_taking_damage = false
let damage_time = 0
let Portal : Sprite = null
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
let attackLeft = assets.animation`
    AttackingLeft
`
let attackRight = assets.animation`
    AttackingRight
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
let DJBarMovement = assets.animation`
    BarraFX1
`
let MSBarMovement = assets.animation`
    BarraFX2
`
let MageRight = assets.animation`
    MageIdleRight
`
let MageLeft = assets.animation`
    MageIdleLeft
`
let MageRightAttack = assets.animation`
    MageAttackRight
`
let MageLeftAttack = assets.animation`
    MageAttackLeft
`
let BallLeft = assets.animation`
    BolaAnimLeft
`
let BallRight = assets.animation`
    BolaAnimRight
`
let DamageRight = assets.animation`
    DamageRight
`
let DamageLeft = assets.animation`
    DamageLeft
`
let PortalAnim = assets.animation`
    PortalFinal
`
game.onUpdate(function on_on_update() {
    let elapsed_time: number;
    
    console.log("Update - Estado de daño: {is_taking_damage}")
    if (is_taking_damage) {
        //  Calcular tiempo transcurrido desde el daño
        elapsed_time = game.runtime() - damage_time
        if (elapsed_time < 500) {
            //  Estado de daño dura 500 ms
            return
        } else {
            //  Evitar ejecutar otras animaciones
            //  Terminar el estado de daño después de 500 ms
            is_taking_damage = false
            console.log("Estado de daño desactivado")
        }
        
    }
    
    //  Si no está en daño, manejar animaciones normales
    if (controller.A.isPressed() && isFirstLevel) {
        if (currentAnimationEON == "Left") {
            animation.runImageAnimation(EON, attackLeft, 50, false)
        } else if (currentAnimationEON == "Right") {
            animation.runImageAnimation(EON, attackRight, 50, false)
        }
        
    }
    
    if (controller.left.isPressed()) {
        currentAnimationEON = "Left"
        animation.runImageAnimation(EON, lookLeft, 200, true)
    } else if (controller.right.isPressed()) {
        currentAnimationEON = "Right"
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
    
    if (otherSprite3 == DoubleJump || otherSprite3 == DoubleJump2) {
        otherSprite3.destroy()
        DJ_label = sprites.create(assets.image`
                                            DJBar
                    `, SpriteKind.UI)
        DJ_label.setPosition(30, 20)
        DJ_label.setFlag(SpriteFlag.RelativeToCamera, true)
        DJ_time = 5
        animation.runImageAnimation(DJ_label, DJBarMovement, 1000, true)
        isDoubleJump = true
        countdown_active_DJ = true
    } else if (otherSprite3 == MaxStrenght) {
        otherSprite3.destroy()
        MS_label = sprites.create(assets.image`
                MSBar
                `, SpriteKind.UI)
        MS_label.setPosition(30, 10)
        MS_label.setFlag(SpriteFlag.RelativeToCamera, true)
        MS_time = 5
        animation.runImageAnimation(MS_label, MSBarMovement, 1000, true)
        countdown_active_MS = true
    }
    
})
sprites.onOverlap(SpriteKind.EON, SpriteKind.portal, function on_on_overlap4(sprite4: Sprite, otherSprite4: Sprite) {
    
    if (otherSprite4 == Portal && controller.A.isPressed()) {
        levelsPass[1] = true
        otherSprite4.destroy()
        returnLevelSelector()
    }
    
})
game.onUpdateInterval(1000, function update_timer_DJ() {
    
    if (countdown_active_DJ) {
        if (DJ_time > 0) {
            DJ_time -= 1
        }
        
        if (DJ_time == 0) {
            // game.splash("¡Tiempo terminado!")
            DJ_label.destroy()
            countdown_active_DJ = false
            isDoubleJump = false
            DJ_time = -1
        }
        
    }
    
})
game.onUpdateInterval(1000, function update_timer_MS() {
    
    if (countdown_active_MS) {
        if (MS_time > 0) {
            MS_time -= 1
        }
        
        if (MS_time == 0) {
            // game.splash("¡Tiempo terminado!")
            MS_label.destroy()
            countdown_active_MS = false
            MS_time = -1
        }
        
    }
    
})
