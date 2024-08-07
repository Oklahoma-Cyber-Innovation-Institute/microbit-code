// Add "A" or a left pixel to your key
input.onButtonPressed(Button.A, function () {
    if (CHAR_COUNT < 5) {
        MY_KEY = "" + MY_KEY + "A"
        led.plot(1, CHAR_COUNT)
        CHAR_COUNT += 1
    }
})
// Play "giggle" if you receive a key that matches your own
radio.onReceivedString(function (receivedString) {
    if (MY_KEY == receivedString) {
        music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.UntilDone)
    }
})
// Add "B" or a right pixel to your key
input.onButtonPressed(Button.B, function () {
    if (CHAR_COUNT < 5) {
        MY_KEY = "" + MY_KEY + "B"
        led.plot(3, CHAR_COUNT)
        CHAR_COUNT += 1
    }
})
// Reset your key
input.onGesture(Gesture.Shake, function () {
    MY_KEY = ""
    CHAR_COUNT = 0
    basic.showLeds(`
        . . # . .
        . . # . .
        . . # . .
        . . # . .
        . . # . .
        `)
})
// Broadcast your key
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendString(MY_KEY)
})
let CHAR_COUNT = 0
let MY_KEY = ""
music.play(music.tonePlayable(554, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
music.play(music.tonePlayable(784, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
MY_KEY = ""
CHAR_COUNT = 0
radio.setGroup(1)
basic.showLeds(`
    . . # . .
    . . # . .
    . . # . .
    . . # . .
    . . # . .
    `)
