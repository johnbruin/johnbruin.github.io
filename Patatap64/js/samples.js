var Sample = function () {
    loadSounds(this, {
        A: 'sounds/breakdown.wav',
        B: 'sounds/effect vibupftl low.wav',
        C: 'sounds/game arkanoid  dead.wav',
        D: 'sounds/kick filterfunnythingie2.wav',
        E: 'sounds/Metal effect 211123.wav',
        F: 'sounds/SimpleSnare3.wav',
        G: 'sounds/basshihatloop.wav',
        H: 'sounds/arni cong1.wav',
        I: 'sounds/galancy arploop.wav',
        J: 'sounds/galancy basskickloop.wav',
        K: 'sounds/kick and bass.wav',
        L: 'sounds/coolloopwithbass.wav',
        M: 'sounds/longtikloop.wav',
        N: 'sounds/nonamex.wav',
        N: 'sounds/tikkiekickie.wav',
        O: 'sounds/bigbassloop.wav',
        P: 'sounds/pitchbass.wav',
        Q: 'sounds/game arkaniod start3.wav',
        R: 'sounds/game zig zag.wav',
        S: 'sounds/spaceinvaders.wav',
        T: 'sounds/NaNaan.wav',
        U: 'sounds/PacManWinsAgain.wav',
        V: 'sounds/ZApperGoesUp.wav',
        W: 'sounds/3chanel3.wav',
        X: 'sounds/ending effet.wav',
        Y: 'sounds/woodentom.wav',
        Z: 'sounds/effect weet ik nie.wav',
        SPACE: 'sounds/roffel.wav',
        ENTER: 'sounds/loop11.wav'
    });
};

Sample.prototype.play = function (key)
{
    idleTime = 0;

    switch (key) {
        case 'A':
            playSound(this.A, 0);
            animations[3].Play(80);
            break;
        case 'B':
            playSound(this.B, 0);
            animations[13].Play(25);
            break;
        case 'C':
            playSound(this.C, 0);
            bganimationsfull[0].Play(80);
            break;
        case 'D':
            playSound(this.D, 0);
            animations[8].Play(25);
            break;
        case 'E':
            playSound(this.E, 0);
            animations[15].Play(100);
            break;
        case 'F':
            playSound(this.F, 0);
            animations[17].Play(120);
            break;
        case 'G':
            playSound(this.G, 0);
            animations[7].Play(150);
            break;
        case 'H':
            playSound(this.H, 0);
            animations[16].Play(80);
            break;
        case 'I':
            playSound(this.I, 0);
            bganimations[5].Play(80);
            break;
        case 'J':
            playSound(this.J, 0);
            animations[12].Play(150);
            break;
        case 'K':
            playSound(this.K, 0);
            animations[9].Play(25);
            break;
        case 'L':
            playSound(this.L, 0);
            animations[2].Play(150);
            break;
        case 'M':
            playSound(this.M, 0);
            bganimations[4].Play(80);
            break;
        case 'N':
            playSound(this.N, 0);
            bganimations[3].Play(50);
            break;
        case 'O':
            playSound(this.O, 0);
            animations[10].Play(200);
            break;
        case 'P':
            playSound(this.P, 0);
            animations[5].Play(120);
            break;
        case 'Q':
            playSound(this.Q, 0);
            animations[14].Play(120);
            break;
        case 'R':
            playSound(this.R, 0);
            bganimationsfull[1].Play(80);
            break;
        case 'S':
            playSound(this.S, 0);
            bganimations[1].Play(100);
            break;
        case 'T':
            playSound(this.T, 0);
            animations[18].Play(100);
            break;
        case 'U':
            playSound(this.U, 0);
            break;
        case 'V':
            playSound(this.V, 0);
            bganimations[0].Play(180);
            break;
        case 'W':
            playSound(this.W, 0);
            bganimations[2].Play(60);
            break;
        case 'X':
            playSound(this.X, 0);
            animations[4].Play(80);
            break;
        case 'Y':
            playSound(this.Y, 0);
            animations[11].Play(200);
            break;
        case 'Z':
            animations[6].Play(80);
            playSound(this.Z, 0);
            break;
        case 'SPACE':
            playSound(this.SPACE, 0);
            animations[0].Play(40);
            break;
        case 'ENTER':
            playSound(this.ENTER, 0);
            animations[1].Play(150);
            break;
        default:
            break;        
    }
};