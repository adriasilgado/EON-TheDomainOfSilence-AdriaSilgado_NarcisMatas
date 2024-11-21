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

function levelSelector() {
    scene.setBackgroundImage(img`
        6666666666666666666669919666666666666666666666666666666666666666666666666666666666666666666666666666666666bd11b66666666666d1b666666666d1d66666666666666666666666
                6666666666666666666dddd119d666666666666666666bbd19b666666666666666666666666666d6666666666dd6666666d1d6666119d111b66666666b11d66666bddd111d6666666666666666666666
                6666666666666666666dddd119d666666666666666666bbd19b666666666666666666666666666d6666666666dd6666666d1d6666119d111b66666666b11d66666bddd111d6666666666666666666666
                6666666666666666666d1991dd166666666ddb666666b111191166666611bc666666111d6666cd1166666666d111666666d1b666b1191191966666c66cbbcc6666111d119b1199666666666666666666
                6666666666666666666b999999966666dbd111b66666d1191d19666c6b11dc66661d911d1d66cd1db6666cd19119dd166666666669999999666666ddc6666666d19911dd911199666666666666666666
                6666666666666666666cccc6cc66666111d11d999b666666b66666666cccc6666d11911911666cccc6666611dddddd1d666666666c6c66cc6666dd19d666666611d91111199d111b6666666666666666
                6666666666666666666cccc6cc66666111d11d999b666666b66666666cccc6666d11911911666cccc6666611dddddd1d666666666c6c66cc6666dd19d666666611d91111199d111b6666666666666666
                66666666666666666666666666666bd9911999119d6666666cc6666666666666669991199bc66666666666d199191119666666666666666666b111199dc666669991119dd11ddd9b6666666666666666
                66666666666666666666666bd6666d19d1111ddd91d66666666666bd6666666666666bb6c6666666666666b96996bb966666666666666666c6d1991999b66666696d1dd1911bbbb66666666666666666
                6666666666666666666666611d66691111999d1191d6666666666d1199666666666666666666cccccc666666cccccc6666d1dd6666666666b1d9dddb96b966666b669bddb96666c66666666666666666
                6666666666666666666666611d66691111999d1191d6666666666d1199666666666666666666cccccc666666cccccc6666d1dd6666666666b1d9dddb96b966666b669bddb96666c66666666666666666
                666666666666666666666ccbdb66669991d91d1969b666666666d11111b6666666666666666cccccccc66666666666666d1111b666666cbd1111dd19b96996c66666cccccbcccc666666666666666666
                66666666666666666666666cc666666669bddb9bcb666666666669969966666666666666666ccffcccc666666666666666b99966666ccbd1d11111d69999bddcc6666666666666666666666666666666
                66666666666666666666666666666666c66ccc6c6c6666666666cc6c6666666666666666666ccceeecc6666666666666666c666666cbebbb1111111999b9bccccc666666666666666666666666666666
                66666666666666666666666666666666c66ccc6c6c6666666666cc6c6666666666666666666ccceeecc6666666666666666c666666cbebbb1111111999b9bccccc666666666666666666666666666666
                666666666666666666666666666c6666666666666666666666666666666666666666666666ccbeeeecc6666666666666666666666cbebecd1b1d111999bb9cffffcc66666666ccc66666666666666666
                666666666666666666666666666666666666666666666666666666666666666666666666666cbcccccc66666666666666c7c666674eeecddbbddddb69bbc69cffffcc666c666666c6666666666666666
                6666666666666666666cccc6ccc66ccccc6c6c6666ccc66ccccccccccccc6666666c66666666bcbcfcc666c666666666cc6cccceeeeccbbcb111dd1d699bcccffffffcccc6cccc8c6666666666666666
                6666666666666666666cccc6ccc66ccccc6c6c6666ccc66ccccccccccccc6666666c66666666bcbcfcc666c666666666cc6cccceeeeccbbcb111dd1d699bcccffffffcccc6cccc8c6666666666666666
                666666666666666666ccccc6cccccccccccccccccccccccccccccccccfcccc666cc76cc6666cdcccfcccc666ccc66666cc6ccceeeefbdccdbddd11199bbcbcffffffffccc6fcccccc666666666666666
                666666666666666666c7fcc6c7f7f7f7f6f6f7c7777fcccc6ccccf7f7fcfcfccc777fccc76fcbbbbccc7c666ccc66666cccffcbeccb4ecbbcbb1111999cbcbcfffffffff8cf888cfc666666666666666
                666666666666666666c7fcc6c7f7f7f7f6f6f7c7777fcccc6ccccf7f7fcfcfccc777fccc76fcbbbbccc7c666ccc66666cccffcbeccb4ecbbcbb1111999cbcbcfffffffff8cf888cfc666666666666666
                6666666666666666667ffffffcfcfcf6fffffcfe776fcfffffcfcf6fcfcfffedb7f68ccfccfcbbbcccfcf666c6cc66666cfffcffeeeeebecbc1ddddbb9bcffffffffffff8f88888fc666666666666666
                666666666666666666b7ccc7c7c7c7c7c7c7c7fcf77f766c7c7f7f7f7f7ccc4dd7effccffffcbbbbccfcccffbccc66666ccccfcebeefbeefbddcbb1dccdbffffffffffffffffffffc666666666666666
                666666666666666666effffffffffffffffffcfe77ffcfffffffcfcfffffff4dd77ecccfcebcbbbbccfccbccbe66666666c6cceefeebeecbb3ecbbbccfbccffffffffccffff888ffc666666666666666
                666666666666666666effffffffffffffffffcfe77ffcfffffffcfcfffffff4dd77ecccfcebcbbbbccfccbccbe66666666c6cceefeebeecbb3ecbbbccfbccffffffffccffff888ffc666666666666666
                666666666666666666b7ccc7c7c7c7c7c7c7c7fe777c766c7c7f7f7f7c7c7c4dd77efccecbbfdbbbccffff7eeeec6666ccccccffe4cecbcebefceebeffecffffffffb1dcfff8888ccc66666666666666
                6666666666666666667efffffffcfffffcfcfcfe77ffefffffffff6fffffcfedd7ee777cccccdbcccccfcffeedd4eeeebddbccce4efe4efbeefceeecffcefffffffb1199cfffff8cc666666666666666
                666666666666666666b76cc7c7f7f7f7c7f7f7ccf77f766c7c7c7f7f7f7cc6edd7ee777bbccbccccfcbffcfcee7ecccce7ebcceeeeceefeecefeeefcfffecfffffcdd19bbcffffccc666666666666666
                666666666666666666b76cc7c7f7f7f7c7f7f7ccf77f766c7c7c7f7f7f7cc6edd7ee777bbccbccccfcbffcfcee7ecccce7ebcceeeeceefeecefeeefcfffecfffffcdd19bbcffffccc666666666666666
                6666666666666666667efccffcfcfcfcfffcfcfe77ffcffcffff6f6fcfcfcfedd7767eeccbcfbccccbcfcffc667c8886c6c4ccecfcbbefefebfcffbefffffffffcddd1dbccfffffcc666666666666666
                666666666666666666b76cc7c7f7f7c6f6f7f7fe777cc66c6c7f7f7f7f7ccfbdd7fffccbccbcccffbccbfffcffec666666c4ecc66ceefeef44ffcc4efffffffbcbbbbbbccffffffcc666666666666666
                6666666666666666667efff6fcfcfccffffffcfe77ffcffffc6f6f6fcfcfcfedd77ccbbccccbccfcccccfffccf7c666666c468666fffcbce4effeeeeffffffbcbbbdcdcffffffffcc666666666666666
                6666666666666666667efff6fcfcfccffffffcfe77ffcffffc6f6f6fcfcfcfedd77ccbbccccbccfcccccfffccf7c666666c468666fffcbce4effeeeeffffffbcbbbdcdcffffffffcc666666666666666
                666666666666666666b7ccc7c7f7cccffffffffe77ccc66c6c6c6f7fcfccc6edd7777eebbcccccccccfcccffcc7c6666c6c4e66668feeefeecffeeecfffffbbbddbbbbccffffffffc666666666666666
                6666666666666666667efee6fcfcfcfceeeeeee777eeffffff6fcf6fcfcfcfedd7ff7eebcbcbfcccffbcbfcfee7c66666cce4cccffcef7ceccffccccffffccbbbbbcbcccffffffffc666666666666666
                666666666666666666b76cc7c7f7c7ce777777777777effcfefefcfcccc7cfbdd7777eeccccbcfcccbbfcfffeeec6666c6ccee6cffccc6cf66fccc66fcfccdbbdccccccfffffffffc666666666666666
                666666666666666666b76cc7c7f7c7ce777777777777effcfefefcfcccc7cfbdd7777eeccccbcfcccbbfcfffeeec6666c6ccee6cffccc6cf66fccc66fcfccdbbdccccccfffffffffc666666666666666
                6666666666666666667efeeffcfcfcfcf777766667777ee7e7eeee7eeff6fe7dd76f777ccccccccbcccfcffcfccc6666b6c6feeee6ccc68f6cc6cc66fffcbdcbbccfcdccffffffffc666666666666666
                666666666666666666b7ccc7c7f7cc6ee777eeeeee777777777777e7eccfc77dd7ff7fffccccfcbbbfcffc7ffc7c66666ccffce44eccfccffcf6ffc8cccbbbcbcffcdbccffffffffc666666666666666
                666666666666666666b7ccc7c7f7cc6ee777eeeeee777777777777e7eccfc77dd7ff7fffccccfcbbbfcffc7ffc7c66666ccffce44eccfccffcf6ffc8cccbbbcbcffcdbccffffffffc666666666666666
                6666666666666666667efee6fcfcfcfe7777eeeeee77777777ffe7e77eee777dd7767eee77bcccbbcffc766e777c66666668c6c6cbe6cfffffc6fffffcbbccbcfccdbbcfcfffffffc666666666666666
                666666666666666666b7ccc7f7f7fc6e7e77cefcee7cccc777eee7777ee7777dd7eff77776667e7b777e7ffc66cc6666cccfc6fcfc4cccccccc8ffccccbccccccdbbbbccffffffffc666666666666666
                6666666666666666667eeee6c6f6f6fe7ee7ceeeee7eeee777777777777777edbe7ec7777977777767eff7eeefcc66666c6ff8fc6c4e6c6c6cccffcccccccbdcbbbbccfcffffffffc666666666666666
                6666666666666666667eeee6c6f6f6fe7ee7ceeeee7eeee777777777777777edbe7ec7777977777767eff7eeefcc66666c6ff8fc6c4e6c6c6cccffcccccccbdcbbbbccfcffffffffc666666666666666
                666666666666666666b7eee7f7fcfcce7777effff7777777777eeeeeeeeeeeb6deeeeeeeeeeeee76efecc444ee7c6666ccfffcfcffeeeeeeeeeeccccccccdbbccccccccfffffffffc666666666666666
                66666666666666666676eee6f6f6f6fe7777777777e77777777cceeeeeeeecb69bceeeeeeeeeee77fc777447eeec6666c777cccccc7eeeee4444eeeccccbbbcccccccdcfffffffffc666666666666666
                666666666666666666b7eeecf7c7ccce7777ee7777e7777eeeec66666666666666666666666666e77e77447ceecb6666beeeeeeeeee6ccc6cc7c44ccccbbbbfccccbdbcfcfffffffc666666666666666
                666666666666666666b7eeecf7c7ccce7777ee7777e7777eeeec66666666666666666666666666e77e77447ceecb6666beeeeeeeeee6ccc6cc7c44ccccbbbbfccccbdbcfcfffffffc666666666666666
                666666666666666666e6eee6f6f6f6fcccc777777777777effc666666666666666666666666666e4e7d777bcc66666669ccccfcccfcccccfccfcbbc6cbbccccccdcbbccdcfcfffffc666666666666666
                66666666666666666c7efccfcfcffcfeee77777e77747777666666666666666666666666666666beedee7ee6666666666666666666668cc66bfcbbccccccccfbdcbcccbbcfcfffffc666666666666666
                666666666666666666ee777777777777777777777dd77eee66666b777bbbb777666666666b7b66666beeeec6666666666666666666666886666c44eccc6ccccbccccbdcbcfffffffc666666666666666
                666666666666666666ee777777777777777777777dd77eee66666b777bbbb777666666666b7b66666beeeec6666666666666666666666886666c44eccc6ccccbccccbdcbcfffffffc666666666666666
                666666666666666666ceeeeeeeeeeeeeee7777777d777ee76667777777777777d666666bb7777b66666cc666666b77ee6c766666666666666ccc44cccccfccccccfcdcbbcfffffffc666666666666666
                666666666666666666bcccccccccccccce7777ddd77ee77b6667cf776666f7777eccccc776ccf76666666666bcb777efffcffccb7cc7b66667ee44ecccfccc8cbcbbccccfcffffffc666666666666666
                666666666666666666666666666666666cb7dddd77ef7eeb6667eccffcfffee77eeeeeebfffccc666666666bcfcc66cccc66f8fe776fc6666ceeeee4eccc8ccccbcccccdbfffffffc666666666666666
                666666666666666666666666666666666cb7dddd77ef7eeb6667eccffcfffee77eeeeeebfffccc666666666bcfcc66cccc66f8fe776fc6666ceeeee4eccc8ccccbcccccdbfffffffc666666666666666
                666666666666666666666666666666666cbbbddee77eeee766677e7777ee77777ccccffbffc66fb66666666bffe4ffffefffcffcfccfc6666677cccce4eccfcccc7cfcd19bffffffc666666666666666
                6666666666666666666666666666666666cbcddf77eeeeec666eeeceeeeeeeeeec88888b77cffc7c6666666b76b4eee7fcfffc7eefffcc8c8ccfffccffee7cc6cfffcd1199bfffffc666666666666666
                6666666666666666666bdddddddbbddbe77ecdbc77ccfeec666cfffcfcfccfcec666666c66feff6fc66666b66fe4eef6ffcc777ee7777eeebddeccfbc77c6fce6cfcddd19bccffffc666666666666666
                6666666666666666666bdddddddbbddbe77ecdbc77ccfeec666cfffcfcfccfcec666666c66feff6fc66666b66fe4eef6ffcc777ee7777eeebddeccfbc77c6fce6cfcddd19bccffffc666666666666666
                66666666666666666c7777777777f77fef77edde7768666666666666666666666666666bfffccccccf6cd7ffcce4eefcfc7eeeeeeeeeecfcf7cc66ccfcff6fee68cbbbbd66ccccffc666666666666666
                666666666666666666777777f77fc777ee77fdbfe766666666666666666666666666666bec66ff6fcfcf77cfc6e4eefccc7cccccccccc6666b77cccccccfcfcbecbbccbdcfffffffc666666666666666
                666666666666666666777777f77fc777ee77fdbfe766666666666666666666666666666bec66ff6fcfcf77cfc6e4eefccc7cccccccccc6666b77cccccccfcfcbecbbccbdcfffffffc666666666666666
                666666666666666666776ffee76f7ff77777eb4e7766666666666666666666666666666beeffccffccef76ccffc4776cfcc66666666666666beeeee7cffffffeebcccbddcfffffffc666666666666666
                66666666666666666677effe77ffff7eeeeeeeeee77bbbb7cbb7cfb7ffbb7b666666666beecfccefcfcccfffcfe4fffceec666666666666666cccccbeeccccccbcccbbbbcfffffffc666666666666666
                6666666666666666667777777777ec7ecccffeefee7e77766e77766776fffb666666666beeffffccffcfffcc7ce4eeccee66666666666b666666666b7ccccccbccbbbbcbffffffffc666666666666666
                6666666666666666667777777777ec7ecccffeefee7e77766e77766776fffb666666666beeffffccffcfffcc7ce4eeccee66666666666b666666666b7ccccccbccbbbbcbffffffffc666666666666666
                666666666666666666776cc7c7c7777c6668ceefceeeeeeffc77efcccffec7666666666cc66c66c666c6ccf66fb4eecc666666c6c66666666666666beeee77cccbbcbcbbcfffffffc666666666666666
                6666666666666666667ffffffff7eee66666ceec6666bbb7eeeeefcfcccecb666666666cff888888cff6fcccff4466e666666beffc6666666666666becccb77cbdcbcdcbcfffffffc666666666666666
                666666666666666666befeefefceeec66666ceec6666bee667777ee777fecb6666bb688886fffffff8c66cfccce4fffc666667cccc6666666bc666666666b777bbccdcbbcfffffffc666666666666666
                666666666666666666befeefefceeec66666ceec6666bee667777ee777fecb6666bb688886fffffff8c66cfccce4fffc666667cccc6666666bc666666666b777bbccdcbbcfffffffc666666666666666
                666666666666666666777777777cc6666666cee66666bbbffc7eeeeeee7eeb6666668cc6f8eddbdddcfc8ffceebdeeeeccccc7eeeeecccccbc6cccb66666b7bbccdbbcbcdfffffffc666666666666666
                666666666666666666eeeeeeeeec666666666ee666666bb6fceceeeeee7ffb66bcffc66cc8cdd6ccdeffffcbddddddddeeeeedddddeeeeee7cccffb66666bebccbbccccdbccfffffc666666666666666
                666666666666666666ceeccccec666666666ceec6666bbb6fccc8ccccc76fe66ccc8f66cf8fdbfcfbdddb3dddeeeeeeeccccc7c6cbeccccc7c77ccc66666bbccbbccccddccffffffc666666666666666
                666666666666666666ceeccccec666666666ceec6666bbb6fccc8ccccc76fe66ccc8f66cf8fdbfcfbdddb3dddeeeeeeeccccc7c6cbeccccc7c77ccc66666bbccbbccccddccffffffc666666666666666
                6666666666666666666cccccc6666b6bdbbbdddddbbdb77777c666666ceeee66b6c8f66cc6fdbf68ceb767bddfeeeee7ccc8c7ecfcc88c8c7c77ccb7bbcbcccccccccddcccffffffc666666666666666
                66666666666666666666666ccc66cb8cdbfeddddd6fbbbb77cc6666666cccc66ccf8c668fcfdb68f86f6ffcddf77ccfc8888877cfc668666bcbeeeccccccccc76cccdbbccccfffffc666666666666666
                666666666666666666666ccccc66cbfcbdeeeddedbcbb77beccc666666666666bc88f88ff8fdbf6f8ff8ccfbdf68fffc66666beeee666666cfccccccc6cccf776fcbbbcccccfffcfc666666666666666
                666666666666666666666ccccc66cbfcbdeeeddedbcbb77beccc666666666666bc88f88ff8fdbf6f8ff8ccfbdf68fffc66666beeee666666cfccccccc6cccf776fcbbbcccccfffcfc666666666666666
                666666666666666666666666c666cdbc6cddfbbfbdddbccccfccd6bd66666666cf6cfffffffdd6868fff66fbdfffffcc66666beeec666666cfccccccffc777ffffccccffccffffcfc666666666666666
                666666666666666666cb6cccbbbbdddbfcdbcbbcbdbcbbbbccbb66f4b6666666b6ff4bbdddbdb6ff866688cdbec6cc6c6666666666666666bcc77776ccc776cccb1bccfcccccffcfc666666666666666
                666666666666666666cb6cccbbbbdddbfcdbcbbcbdbcbbbbccbb66f4b6666666b6ff4bbdddbdb6ff866688cdbec6cc6c6666666666666666bcc77776ccc776cccb1bccfcccccffcfc666666666666666
                66666666666666666cbd666cdd67d76beeecccccbddcbddddddb688bb66666666ccceeebddcc6cfccff686fbbf8fff8c6666666666666666cccccccccbcfc77cb119bcffcfcfffcfc666666666666666
                66666666666666666cbdefffeb6cbcfedddbccccbdddddddddd7668fb6666666ccff6ffcbdffc88888f668fbbcccccfc666666666669c6cc77cc777cc66fc6cb11199bcfcfcfccccc666666666666666
                666666666666666666bdbeeed668cdc7dddbccccbddddbbeddd666cfeccceeeeeee8866fedcfcccfffc666fddbbbddddbb6b6666666dcccc77fcccfffcfcccbddd19bccffffccccfc666666666666666
                666666666666666666bdbeeed668cdc7dddbccccbddddbbeddd666cfeccceeeeeee8866fedcfcccfffc666fddbbbddddbb6b6666666dcccc77fcccfffcfcccbddd19bccffffccccfc666666666666666
                666666666666666666b77dddd666cddcbdbdccccbbbddddbdddc8866ecceeeeee6cf8cc8cdbddbdbbdef6ffbd777ccb76cfcb6666bd777ccccfccccccccccbbbd1b6bcfffffccccfc666666666666666
                666666666666666666b8f66bd668fbdddbfbbbcccccdddddddddef68cccccccccc8f8888fb6dd6b7cdef8cfbd676ffc76cccc66ccc777777cfcccccccbbbcbdd11dcfcffffffffffc666666666666666
                6666666666666666c6bc666cbcffc43ddcccbccccccbddddddddddefc8888888ccccc668fefbdfcffbbbbbbdde66ffc76c776cb7cc77777777777777bcccbd11111bffcfffffcccfc666666666666666
                6666666666666666c6bc666cbcffc43ddcccbccccccbddddddddddefc8888888ccccc668fefbdfcffbbbbbbdde66ffc76c776cb7cc77777777777777bcccbd11111bffcfffffcccfc666666666666666
                6666666666666666c6bb688fedee44dddbcbcccccccbdddddbddd6cbb6666666c6cff66886fbd6ccc6cd7bbcb6c6ffc6cc776c7777d3ddddddb77777bcccdddd1dcccfffffffffcfc666666666666666
                666666666666666666b76ff6cbddddbddccccccccfcbdddbdebd76fdb6666666c8ff688fff8bdfffccf66cf88688ffc7ccccfcb7c7dd7777bdd7777bbcbbbbbdbb1cfffcffffffccc666666666666666
                666666666666666666b66668ccddd6fddbcccccccccbd66fbddd666eb6666666cccc866fccfbdff888f66fcccc86ccccccccfccfc7dd7cccbdd777bccbbbcbcbb1d9bfffffffffffc666666666666666
                666666666666666666b66668ccddd6fddbcccccccccbd66fbddd666eb6666666cccc866fccfbdff888f66fcccc86ccccccccfccfc7dd7cccbdd777bccbbbcbcbb1d9bfffffffffffc666666666666666
                666666666666666666b6666f66cdd8fbdbcccfccccfbb66fbddd666cb6666666ccc8c886fc6eddef8ff8ccf88888888ccccccccfc7dd7cc7bdd7cccccbcbccbd11199cffffffffffc666666666666666
                666666666666666666b6688c686bdffbdbcbfffcccebdeefeb6b666cc6669666cccff66fccf67defffffffffffffffffcc7777cccbdddbdddddcccccbcccfcbdd1196cccffffffffc666666666666666
                6666666666666666c6b6666ff66cdbe4ddbcceeccebbdbbeb66c668fc6669666ccfcc66cc8cffdddbdbbbbdbbddddddb7bddddd77cdddbbdd77777cbbccccbbbbbdbccccffffffffc666666666666666
                6666666666666666c6b6666ff66cdbe4ddbcceeccebbdbbeb66c668fc6669666ccfcc66cc8cffdddbdbbbbdbbddddddb7bddddd77cdddbbdd77777cbbccccbbbbbdbccccffffffffc666666666666666
                666666666666666666b66ccff66cbddddddbbceebdddddddb66cf6cfc6669666c6ccc66cc6fcfb7b7ddb6cb7cb7777d767d77bbeccdd77c7776766bcccccbcccbcdcffffffffffffc666666666666666
                666666666666666666b6666ff668cddddd76dddddddd766d6668868cc6669666ccccc886c6f86f6c6ed6ccc6fc6ccc7cfcc77f7cce4b676f66fcccccccdbbccccdccffffffffffffc666666666666666
                666666666666666666b6666ff668cddddd76dddddddd766d6668868cc6669666ccccc886c6f86f6c6ed6ccc6fc6ccc7cfcc77f7cce4b676f66fcccccccdbbccccdccffffffffffffc666666666666666
                666666666666666666b66888c68ffbd7cd66cd77dddb688bcc8f6c8cc6666666bcffccc8f86fc6fffedffffc8ffc99cccfc76ccbbeddcffffffccccccbbbbffccbccffffffffffffc666666666666666
                66666666666666666cb68ccc6cfc66bdd768cbbbb6b68fffbcf668cfc6666666c6ccfcccc6f68c6cfbdf6f88cc6c66f77ccfcccc7bdd7cfccffc7777bdcbccfcfccccfffffffffffc666666666666666
                666666666666666666bcc88c8ceb6ccdb68c8cddc8c68cc8cdb6cccfc6666666c6c8f668f68cf6fffbd68fc6f8ffbbfb7cbccccbddddddddddddbb77dcccfcbbfffcccffffffffffc666666666666666
                666666666666666666bcc88c8ceb6ccdb68c8cddc8c68cc8cdb6cccfc6666666c6c8f668f68cf6fffbd68fc6f8ffbbfb7cbccccbddddddddddddbb77dcccfcbbfffcccffffffffffc666666666666666
                66666666666666666cb66cc6cf6cc6f66c6cc6b76c6cc66f6cc6686cc6666666cfccf66ccfc8f8ffcbdfcff8cfccccfccc7777c77bdddddb77bb777bbffcbcdbcfffcccfffffffffc666666666666666
                666666666666666666b68cc6fc6c66f68c6866f68c6c666f68f66f68cccccccce6cff66ffc6f88ccfbdfcfc6cc8ccccccccc77c7767b77777cccccbccccbbbbcfffffccffcffccffc666666666666666
                666666666666666666b6c886fc868c88c6cc6cc886ccc666ccc66ccccceeeeeeeec8c668c6c6cc68fbd68ff6fc8c777777cc76cc76c776c77cccbbcccbbcbbbcffffffcffcfcccffc666666666666666
                666666666666666666b6c886fc868c88c6cc6cc886ccc666ccc66ccccceeeeeeeec8c668c6c6cc68fbd68ff6fc8c777777cc76cc76c776c77cccbbcccbbcbbbcffffffcffcfcccffc666666666666666
                666666666666666666b686668c8666866c68c6866866666866866866cfceeeece6888cccf8cff688cbd88ff6cf8ccceee77ccccfffc676fc7ccbccccbccbbcbccffffffcffccccffc666666666666666
                666666666666666666c8fff8fff8f8f8ff8ff8f8cfcff88fc8ffcfcfccccccccccfffcc8ff8ff8fffbbf8fff8f8ccccceb7ccfccccccffcccccccccccccbcccccffffffcccccccfcc666666666666666
                666666666666666666cfffffffffffffffffffffffffffffffffffffc6888886bcfffffffffffffffbdfffffffcc66666b77b7777777cc77cccccc77ccbccccfffffffffffffcccbc666666666666666
                666666666666666666cfffffffffffffffffffffffffffffffffffffc6888886bcfffffffffffffffbdfffffffcc66666b77b7777777cc77cccccc77ccbccccfffffffffffffcccbc666666666666666
                666666666666666666eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeec6666666beeeeeeeeeeeeeeeeeeeeeeeeeec66666bbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeec666666666666666
                666666666666666666ceecccceeccecccccccccccceeecccccceecce66666666bccccccccceeccccccfcccccccc6666666efcccccccccceccccccccccccfccccccccccccccccccccc666666666666666
                666666666666666666666ccccccc6ccc6cccccccccccccccc6ccc66666666666666cccccccccccccccccc66ccc666666666cccccccccccccccccccc6666666666666cccc666666666666666666666666
                666666666666666666666ccccccc6ccc6cccccccccccccccc6ccc66666666666666cccccccccccccccccc66ccc666666666cccccccccccccccccccc6666666666666cccc666666666666666666666666
                6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
                6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
    `)
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

let RecPlay : Sprite = null
scene.setBackgroundImage(assets.image`
    myImage
`)
play()
