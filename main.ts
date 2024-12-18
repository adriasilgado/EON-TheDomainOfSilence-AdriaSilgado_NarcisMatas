// Clase per controlar els tipus d'objectes
namespace SpriteKind {
    export const level = SpriteKind.create()
    export const EON = SpriteKind.create()
    export const soul = SpriteKind.create()
    export const powerup = SpriteKind.create()
    export const enemy = SpriteKind.create()
    export const projectile = SpriteKind.create()
    export const UI = SpriteKind.create()
    export const portal = SpriteKind.create()
    export const boss = SpriteKind.create()
}

let levelsPass = [true, false, false]
// MAIN
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

// Pantalla per escollir nivell
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

// Escenes amb lore
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

// NIVELLS
// Funcions amb la generació dels 3 nivells
function FirstLevel() {
    
    whatLevel = 1
    memoryScore = score
    isLevel = true
    update_score()
    create_hearts()
    Soul = sprites.create(assets.image`
            SoulStatic
        `, SpriteKind.soul)
    Soul2 = sprites.create(assets.image`
            SoulStatic
        `, SpriteKind.soul)
    Soul3 = sprites.create(assets.image`
                SoulStatic
            `, SpriteKind.soul)
    Soul4 = sprites.create(assets.image`
                SoulStatic
            `, SpriteKind.soul)
    Soul5 = sprites.create(assets.image`
                    SoulStatic
                `, SpriteKind.soul)
    DoubleJump = sprites.create(assets.image`
            DoubleJump
        `, SpriteKind.powerup)
    MaxStrenght = sprites.create(assets.image`
            MaxStrenght
        `, SpriteKind.powerup)
    Portal = sprites.create(assets.image`
                Portal
            `, SpriteKind.portal)
    Portal.z = 1
    Portal.setPosition(1950, 140)
    Portal.ay = 200
    Soul.setPosition(136, 130)
    Soul2.setPosition(808, 184)
    Soul3.setPosition(1200, 152)
    Soul4.setPosition(1656, 200)
    Soul5.setPosition(1808, 40)
    DoubleJump.setPosition(1704, 200)
    MaxStrenght.setPosition(440, 136)
    animation.runImageAnimation(Soul, soulMovement, 200, true)
    animation.runImageAnimation(Soul2, soulMovement, 200, true)
    animation.runImageAnimation(Soul3, soulMovement, 200, true)
    animation.runImageAnimation(Soul4, soulMovement, 200, true)
    animation.runImageAnimation(Soul5, soulMovement, 200, true)
    animation.runImageAnimation(DoubleJump, jumpMovement, 200, true)
    animation.runImageAnimation(MaxStrenght, strenghtMovement, 200, true)
    animation.runImageAnimation(Portal, PortalAnim, 200, true)
    EON.ay = 300
    EON.setBounceOnWall(false)
    controller.moveSprite(EON, 100, 0)
    scene.cameraFollowSprite(EON)
    scene.setBackgroundImage(assets.image`
            Back
    `)
    tiles.setCurrentTilemap(tilemap`
        nivel1
    `)
    tiles.placeOnTile(EON, tiles.getTileLocation(2, 8))
    if (LevelOne != null) {
        LevelOne.destroy()
    }
    
    if (LevelTwo != null) {
        LevelTwo.destroy()
    }
    
    if (LevelThree != null) {
        LevelThree.destroy()
    }
    
    if (LevelTwoBlock != null) {
        LevelTwoBlock.destroy()
    }
    
    if (LevelThreeBlock != null) {
        LevelThreeBlock.destroy()
    }
    
    create_enemy(800, 50)
    create_skull(1350, 50)
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

function SecondLevel() {
    
    whatLevel = 2
    memoryScore = score
    isLevel = true
    update_score()
    create_hearts()
    Soul = sprites.create(assets.image`
            SoulStatic
        `, SpriteKind.soul)
    Soul2 = sprites.create(assets.image`
                SoulStatic
            `, SpriteKind.soul)
    Soul3 = sprites.create(assets.image`
                SoulStatic
            `, SpriteKind.soul)
    Soul4 = sprites.create(assets.image`
                SoulStatic
            `, SpriteKind.soul)
    Soul5 = sprites.create(assets.image`
                    SoulStatic
                `, SpriteKind.soul)
    DoubleJump = sprites.create(assets.image`
            DoubleJump
        `, SpriteKind.powerup)
    MaxStrenght = sprites.create(assets.image`
            MaxStrenght
        `, SpriteKind.powerup)
    Portal = sprites.create(assets.image`Portal`, SpriteKind.portal)
    Portal.z = 1
    Portal.setPosition(1472, 320)
    Portal.ay = 200
    Soul.setPosition(320, 232)
    Soul2.setPosition(472, 168)
    Soul3.setPosition(984, 280)
    Soul4.setPosition(1056, 184)
    Soul5.setPosition(712, 120)
    DoubleJump.setPosition(584, 296)
    MaxStrenght.setPosition(752, 312)
    animation.runImageAnimation(Soul, soulMovement, 200, true)
    animation.runImageAnimation(Soul2, soulMovement, 200, true)
    animation.runImageAnimation(Soul3, soulMovement, 200, true)
    animation.runImageAnimation(Soul4, soulMovement, 200, true)
    animation.runImageAnimation(Soul5, soulMovement, 200, true)
    animation.runImageAnimation(DoubleJump, jumpMovement, 200, true)
    animation.runImageAnimation(MaxStrenght, strenghtMovement, 200, true)
    animation.runImageAnimation(Portal, PortalAnim, 200, true)
    EON.ay = 300
    EON.setBounceOnWall(false)
    controller.moveSprite(EON, 100, 0)
    scene.cameraFollowSprite(EON)
    scene.setBackgroundImage(assets.image`
            Back
    `)
    tiles.setCurrentTilemap(tilemap`
        nivel2
    `)
    tiles.placeOnTile(EON, tiles.getTileLocation(6, 17))
    if (LevelOne != null) {
        LevelOne.destroy()
    }
    
    if (LevelTwo != null) {
        LevelTwo.destroy()
    }
    
    if (LevelThree != null) {
        LevelThree.destroy()
    }
    
    if (LevelTwoBlock != null) {
        LevelTwoBlock.destroy()
    }
    
    if (LevelThreeBlock != null) {
        LevelThreeBlock.destroy()
    }
    
    create_enemy(1056, 288)
    create_skull(312, 312)
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

function ThirdLevel() {
    
    whatLevel = 3
    memoryScore = score
    isLevel = true
    update_score()
    create_hearts()
    Soul = sprites.create(assets.image`
            SoulStatic
        `, SpriteKind.soul)
    Soul2 = sprites.create(assets.image`
                SoulStatic
            `, SpriteKind.soul)
    Soul3 = sprites.create(assets.image`
                SoulStatic
            `, SpriteKind.soul)
    Soul4 = sprites.create(assets.image`
                SoulStatic
            `, SpriteKind.soul)
    Soul5 = sprites.create(assets.image`
                    SoulStatic
                `, SpriteKind.soul)
    DoubleJump = sprites.create(assets.image`
            DoubleJump
        `, SpriteKind.powerup)
    MaxStrenght = sprites.create(assets.image`
            MaxStrenght
        `, SpriteKind.powerup)
    Portal = sprites.create(assets.image`Portal`, SpriteKind.portal)
    Portal.z = 1
    Portal.setPosition(1950, 140)
    Portal.ay = 200
    Soul.setPosition(304, 168)
    Soul2.setPosition(560, 184)
    Soul3.setPosition(696, 168)
    Soul4.setPosition(1200, 72)
    Soul5.setPosition(1304, 184)
    DoubleJump.setPosition(800, 168)
    MaxStrenght.setPosition(1544, 136)
    animation.runImageAnimation(Soul, soulMovement, 200, true)
    animation.runImageAnimation(Soul2, soulMovement, 200, true)
    animation.runImageAnimation(Soul3, soulMovement, 200, true)
    animation.runImageAnimation(Soul4, soulMovement, 200, true)
    animation.runImageAnimation(Soul5, soulMovement, 200, true)
    animation.runImageAnimation(DoubleJump, jumpMovement, 200, true)
    animation.runImageAnimation(MaxStrenght, strenghtMovement, 200, true)
    animation.runImageAnimation(Portal, PortalAnim, 200, true)
    EON.ay = 300
    EON.setBounceOnWall(false)
    controller.moveSprite(EON, 100, 0)
    scene.cameraFollowSprite(EON)
    scene.setBackgroundImage(assets.image`
            Back
    `)
    tiles.setCurrentTilemap(tilemap`
        nivel3
    `)
    tiles.placeOnTile(EON, tiles.getTileLocation(5, 10))
    if (LevelOne != null) {
        LevelOne.destroy()
    }
    
    if (LevelTwo != null) {
        LevelTwo.destroy()
    }
    
    if (LevelThree != null) {
        LevelThree.destroy()
    }
    
    if (LevelTwoBlock != null) {
        LevelTwoBlock.destroy()
    }
    
    if (LevelThreeBlock != null) {
        LevelThreeBlock.destroy()
    }
    
    create_boss()
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
    game.onUpdate(function endMap() {
        
        if (tiles.tileAtLocationEquals(EON.tilemapLocation(), assets.tile`
                EndMap
                `)) {
            returnLevelSelector(memoryScore)
        }
        
    })
}

// Funció per crear el boss i controlar estats i animacions
function create_boss() {
    
    boss_health = 10
    boss_is_attacking = false
    boss_last_attack_time = 0
    boss_current_animation = ""
    Boss = sprites.create(assets.image`
        Boss1
    `, SpriteKind.boss)
    Boss.setPosition(1800, 140)
    Boss.ay = 200
    Boss.setHitbox()
    animation.runImageAnimation(Boss, BossIdleLeft, 1000, true)
    boss_current_animation = "IdleLeft"
    game.onUpdate(function boss_behaviour() {
        let current_time: number;
        
        let distance_to_player = Math.abs(Boss.x - EON.x)
        if (distance_to_player > 100) {
            boss_is_attacking = false
            Boss.vx = -30
            if (boss_current_animation != "RunLeft") {
                animation.runImageAnimation(Boss, BossRunLeft, 500, true)
                boss_current_animation = "RunLeft"
            }
            
        } else if (30 < distance_to_player && distance_to_player <= 100) {
            boss_is_attacking = false
            Boss.vx = Boss.x < EON.x ? 60 : -60
            if (Boss.vx > 0 && boss_current_animation != "RunRight") {
                animation.runImageAnimation(Boss, BossRunRight, 500, true)
                boss_current_animation = "RunRight"
            } else if (Boss.vx < 0 && boss_current_animation != "RunLeft") {
                animation.runImageAnimation(Boss, BossRunLeft, 500, true)
                boss_current_animation = "RunLeft"
            }
            
        } else if (distance_to_player <= 30) {
            boss_is_attacking = true
            Boss.vx = 0
            current_time = game.runtime()
            if (current_time - boss_last_attack_time > 1000) {
                Boss.y = 155
                if (Boss.x < EON.x && boss_current_animation != "AttackRight") {
                    animation.runImageAnimation(Boss, BossAttackRight, 300, true)
                    boss_current_animation = "AttackRight"
                } else if (Boss.x > EON.x && boss_current_animation != "AttackLeft") {
                    animation.runImageAnimation(Boss, BossAttackLeft, 300, true)
                    boss_current_animation = "AttackLeft"
                }
                
                if (Boss.overlapsWith(EON)) {
                    lose_heart()
                }
                
                boss_last_attack_time = current_time
            }
            
        }
        
    })
}

// Funcio per mostrar score personalitzat i posar-ho al centre
function update_score() {
    
    if (score_label === null) {
        score_label = textsprite.create("" + score, 3, 6)
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

// Funcio per crear al mag i controlar stats i animacions
function create_enemy(x: number, y: number) {
    
    is_attacking = false
    patrol_direction = -1
    last_shot_time = game.runtime()
    Mago = sprites.create(assets.image`
        Mago
    `, SpriteKind.enemy)
    Mago.setPosition(x, y)
    Mago.ay = 200
    function attack_player() {
        let current_time: number;
        
        if (is_attacking) {
            Mago.vx = 0
            current_time = game.runtime()
            if (current_time - last_shot_time > 1000 && current_animation != "" && !isDead) {
                projectile = sprites.createProjectileFromSprite(assets.image`
                        Bola
                    `, Mago, (EON.x - Mago.x) / Math.abs(EON.x - Mago.x) * 100, 0)
                projectile.setKind(SpriteKind.projectile)
                if (EON.x - Mago.x < 0) {
                    animation.runImageAnimation(projectile, BallLeft, 250, true)
                } else {
                    animation.runImageAnimation(projectile, BallRight, 250, true)
                }
                
                last_shot_time = current_time
            }
            
        }
        
    }
    
    game.onUpdate(function patrol() {
        
        if (!is_attacking) {
            Mago.vx = patrol_direction * 50
            if (tiles.tileAtLocationEquals(Mago.tilemapLocation(), assets.tile`
                            PatrolStop
                        `)) {
                patrol_direction *= -1
                Mago.vx = patrol_direction * 50
            }
            
        }
        
    })
    game.onUpdate(function detect_player() {
        
        let distance_to_player = Math.abs(Mago.x - EON.x)
        if (distance_to_player < 80) {
            is_attacking = true
            attack_player()
        } else {
            is_attacking = false
        }
        
    })
    game.onUpdate(function endMap() {
        
        if (tiles.tileAtLocationEquals(EON.tilemapLocation(), assets.tile`
                EndMap
                `)) {
            returnLevelSelector(memoryScore)
        }
        
    })
    game.onUpdate(function on_on_update2() {
        
        if (!is_attacking && isLevel) {
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
        
        if (is_attacking && isLevel) {
            if (EON.x - Mago.x < 0 && current_animation != "MageLeftAttack") {
                animation.runImageAnimation(Mago, MageLeftAttack, 250, true)
                current_animation = "MageLeftAttack"
            } else if (EON.x - Mago.x > 0 && current_animation != "MageRightAttack") {
                animation.runImageAnimation(Mago, MageRightAttack, 250, true)
                current_animation = "MageRightAttack"
            }
            
        }
        
    })
}

// Funció per crear enemic skull, controlant stats i animacions
function create_skull(x: number, y: number) {
    
    skull_is_attacking = false
    skull_patrol_direction = -1
    skull_last_attack_time = game.runtime()
    skull_current_animation = ""
    Skull = sprites.create(assets.image`
        Skull
    `, SpriteKind.enemy)
    Skull.setPosition(x, y)
    Skull.ay = 200
    game.onUpdate(function skull_patrol() {
        
        if (!skull_is_attacking) {
            Skull.vx = skull_patrol_direction * 50
            if (tiles.tileAtLocationEquals(Skull.tilemapLocation(), assets.tile`
                PatrolStop
            `)) {
                skull_patrol_direction *= -1
                Skull.vx = skull_patrol_direction * 50
            }
            
        }
        
    })
    game.onUpdate(function skull_detect_and_chase() {
        
        let distance_to_player = Math.abs(Skull.x - EON.x)
        if (distance_to_player < 50) {
            skull_is_attacking = true
        } else if (distance_to_player > 80) {
            skull_is_attacking = false
        }
        
        if (skull_is_attacking) {
            Skull.vx = Skull.x < EON.x ? 80 : -80
        }
        
    })
    game.onUpdate(function skull_attack_player() {
        let current_time: number;
        
        if (skull_is_attacking && Math.abs(Skull.x - EON.x) < 10) {
            Skull.vx = 0
            current_time = game.runtime()
            if (current_time - skull_last_attack_time > 1000) {
                if (Skull.x > EON.x) {
                    if (skull_current_animation != "SkullLeftAttack") {
                        animation.runImageAnimation(Skull, SkullLeftAttack, 250, true)
                        skull_current_animation = "SkullLeftAttack"
                    }
                    
                } else if (Skull.x < EON.x) {
                    if (skull_current_animation != "SkullRightAttack") {
                        animation.runImageAnimation(Skull, SkullRightAttack, 250, true)
                        skull_current_animation = "SkullRightAttack"
                    }
                    
                }
                
                if (Skull.overlapsWith(EON)) {
                    lose_heart()
                }
                
                skull_last_attack_time = current_time
            }
            
        } else if (skull_is_attacking && Skull.vx != 0) {
            if (Skull.vx > 0 && skull_current_animation != "SkullRightAttack") {
                animation.runImageAnimation(Skull, SkullRightAttack, 250, true)
                skull_current_animation = "SkullRightAttack"
            } else if (Skull.vx < 0 && skull_current_animation != "SkullLeftAttack") {
                animation.runImageAnimation(Skull, SkullLeftAttack, 250, true)
                skull_current_animation = "SkullLeftAttack"
            }
            
        }
        
    })
    game.onUpdate(function skull_animations() {
        
        if (!skull_is_attacking) {
            if (skull_patrol_direction == -1 && skull_current_animation != "SkullLeft") {
                animation.runImageAnimation(Skull, SkullLeft, 1000, true)
                skull_current_animation = "SkullLeft"
            } else if (skull_patrol_direction == 1 && skull_current_animation != "SkullRight") {
                animation.runImageAnimation(Skull, SkullRight, 1000, true)
                skull_current_animation = "SkullRight"
            }
            
        }
        
    })
}

// Funcio per crear els cors
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

// Funcio per eliminar cors
function lose_heart() {
    let is_taking_damage: boolean;
    let damage_time: number;
    
    if (heart_count > 0) {
        hearts[heart_count - 1].destroy()
        heart_count -= 1
        is_taking_damage = true
        damage_time = game.runtime()
        if (currentAnimationEON == "Left") {
            animation.stopAnimation(animation.AnimationTypes.All, EON)
            animation.runImageAnimation(EON, DamageLeft, 200, false)
        } else if (currentAnimationEON == "Right") {
            animation.stopAnimation(animation.AnimationTypes.All, EON)
            animation.runImageAnimation(EON, DamageRight, 200, false)
        }
        
        if (heart_count == 0) {
            returnLevelSelector(memoryScore)
        }
        
    }
    
}

// Funcio per controlar si un projectil del mago colisiona amb EON
game.onUpdate(function check_collision_with_projectile() {
    
    for (let projectile of sprites.allOfKind(SpriteKind.projectile)) {
        if (projectile.overlapsWith(EON)) {
            projectile.destroy()
            //  Eliminar el proyectil
            lose_heart()
        }
        
    }
})
// Funcio per reiniciar valors i tornar al selector de nivells
function returnLevelSelector(setScore: number) {
    
    isLevel = false
    sprites.destroyAllSpritesOfKind(SpriteKind.EON)
    sprites.destroyAllSpritesOfKind(SpriteKind.soul)
    sprites.destroyAllSpritesOfKind(SpriteKind.powerup)
    sprites.destroyAllSpritesOfKind(SpriteKind.enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.UI)
    score_label.setText("")
    score_label = null
    score = setScore
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

// Funcio amb el lore final i el final del joc
function sceneFinal() {
    
    isLevel = false
    sprites.destroyAllSpritesOfKind(SpriteKind.EON)
    sprites.destroyAllSpritesOfKind(SpriteKind.soul)
    sprites.destroyAllSpritesOfKind(SpriteKind.powerup)
    sprites.destroyAllSpritesOfKind(SpriteKind.enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.UI)
    sprites.destroyAllSpritesOfKind(SpriteKind.EON)
    sprites.destroyAllSpritesOfKind(SpriteKind.portal)
    score_label.setText("")
    score_label = null
    patrol_direction = 1
    last_shot_time = 0
    current_animation = ""
    heart_count = 3
    hearts = []
    tiles.setCurrentTilemap(tilemap`
        CleanLevel
    `)
    scene.setBackgroundImage(assets.image`FinalScene`)
    game.showLongText("Amb aquesta victoria, EON aconsigueix aclarir el mon The Domain Of Silence, alliberant les ànimes corruptes de 'Echo' i 'Quietus'", DialogLayout.Bottom)
    game.splash("Felicitas, has guanyat amb " + ("" + score) + " ànimes recollides. Gràcies per jugar al nostre joc!")
    //  Mostrar mensaje
    game.over(true, effects.confetti)
}

// VARIABLES
let EON : Sprite = null
let RecPlay : Sprite = null
let LevelOne : Sprite = null
let LevelTwo : Sprite = null
let LevelThree : Sprite = null
let LevelTwoBlock : Sprite = null
let LevelThreeBlock : Sprite = null
let Soul : Sprite = null
let Soul2 : Sprite = null
let Soul3 : Sprite = null
let Soul4 : Sprite = null
let Soul5 : Sprite = null
let DoubleJump : Sprite = null
let MaxStrenght : Sprite = null
let lookLeft : Image[] = []
let score = 0
let memoryScore = score
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
let isLevel = false
let projectile : Sprite = null
let is_taking_damage = false
let damage_time = 0
let Portal : Sprite = null
let canAttack = false
let isDead = false
let Skull : Sprite = null
let skull_is_attacking = false
let skull_patrol_direction = 1
let skull_last_attack_time = 0
let skull_current_animation = ""
let skull_live = 2
let whatLevel = 0
let Boss : Sprite = null
//  El sprite del jefe
let boss_health = 10
//  Vida del jefe
let boss_is_attacking = false
//  Indica si el jefe está atacando
let boss_last_attack_time = 0
//  Último momento en el que el jefe atacó
let boss_current_animation = ""
//  Animación actual del jefe
let last_attack_time = 0
// ANIMACIONS
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
let SkullRight = assets.animation`
    SkullIdleRight
`
let SkullLeft = assets.animation`
    SkullIdleLeft
`
let SkullRightAttack = assets.animation`
    SkullAttackRight
`
let SkullLeftAttack = assets.animation`
    SkullAttackLeft
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
let BossIdleLeft = assets.animation`
    Boss1IdleLeft
`
let BossRunLeft = assets.animation`
    Boss1RunLeft
`
let BossRunRight = assets.animation`
    Boss1RunRight
`
let BossAttackLeft = assets.animation`
    Boss1AttackLeft
`
let BossAttackRight = assets.animation`
    Boss1AttackRight
`
// Funcio per controlar animacions de EON
game.onUpdate(function on_on_update() {
    let elapsed_time: number;
    
    if (is_taking_damage) {
        canAttack = false
        elapsed_time = game.runtime() - damage_time
        if (elapsed_time < 500) {
            return
        } else {
            is_taking_damage = false
        }
        
    }
    
    if (controller.A.isPressed() && isLevel) {
        if (currentAnimationEON == "Left") {
            animation.runImageAnimation(EON, attackLeft, 50, false)
        } else if (currentAnimationEON == "Right") {
            animation.runImageAnimation(EON, attackRight, 50, false)
        }
        
        canAttack = true
    }
    
    if (controller.left.isPressed()) {
        currentAnimationEON = "Left"
        animation.runImageAnimation(EON, lookLeft, 200, true)
        canAttack = false
    } else if (controller.right.isPressed()) {
        currentAnimationEON = "Right"
        animation.runImageAnimation(EON, lookRight, 200, true)
        canAttack = false
    }
    
})
// FUNCIOS PER CONTROLAR COLISIONS
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
            SecondLevel()
        }
        
    } else if (otherSprite == LevelThree) {
        EON.sayText("Level Three", 100, false)
        if (controller.A.isPressed()) {
            otherSprite.destroy()
            effects.clearParticles(otherSprite)
            ThirdLevel()
        }
        
    } else if (otherSprite == LevelTwoBlock || otherSprite == LevelThreeBlock) {
        EON.sayText("Has de passar-te l'anterior nivell!", 100, false)
        if (controller.A.isPressed()) {
            effects.clearParticles(otherSprite)
        }
        
    }
    
})
sprites.onOverlap(SpriteKind.EON, SpriteKind.soul, function on_on_overlap2(sprite2: Sprite, otherSprite2: Sprite) {
    
    if (otherSprite2 == Soul || otherSprite2 == Soul2 || otherSprite2 == Soul3 || otherSprite2 == Soul4 || otherSprite2 == Soul5) {
        otherSprite2.destroy()
        score += 1
        update_score()
    }
    
})
sprites.onOverlap(SpriteKind.EON, SpriteKind.powerup, function on_on_overlap3(sprite3: Sprite, otherSprite3: Sprite) {
    
    if (otherSprite3 == DoubleJump) {
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
        if (whatLevel == 3) {
            sceneFinal()
        } else {
            levelsPass[whatLevel] = true
            otherSprite4.destroy()
            returnLevelSelector(score)
        }
        
    }
    
})
sprites.onOverlap(SpriteKind.EON, SpriteKind.enemy, function on_on_overlap5(sprite5: Sprite, otherSprite5: Sprite) {
    
    if (otherSprite5 == Mago && canAttack) {
        otherSprite5.destroy()
        isDead = true
        current_animation = ""
    }
    
})
sprites.onOverlap(SpriteKind.EON, SpriteKind.enemy, function on_on_overlap6(sprite6: Sprite, otherSprite6: Sprite) {
    
    if (otherSprite6 == Skull && canAttack) {
        skull_live -= 1
        if (skull_live <= 0) {
            otherSprite6.destroy()
        }
        
    }
    
})
//  500 ms de cooldown entre ataques (ajustable)
sprites.onOverlap(SpriteKind.EON, SpriteKind.boss, function on_on_overlap7(sprite7: Sprite, otherSprite7: Sprite) {
    let last_attack_time: number;
    
    let current_time = game.runtime()
    console.log("Vida boss: " + boss_health)
    if (otherSprite7 == Boss && canAttack) {
        boss_health -= 1
        console.log("Vida boss: " + ("" + boss_health))
        //  Imprimir la vida para ver el cambio
        last_attack_time = current_time
        //  Actualizar el tiempo del último ataque
        if (boss_health <= 0) {
            console.log("El jefe ha sido derrotado")
            Boss.destroy(effects.disintegrate, 1000)
        }
        
    }
    
})
skull_is_attacking
// FUNCIONS PER CONTROLAR ELS TEMPS DELS POWERUPS
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
