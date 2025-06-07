// Run this code forever in a loop
basic.forever(function () {
    // Check if the button on digital port J1 is pressed
    if (petal.buttonRead(petal.DigitalPort.J1)) {
        // Play a musical note (C4 for a whole beat)
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    }

    // Read the light sensor value; if it's greater than 500, show a "Yes" icon
    if (petal.digitalLightRead() > 500) {
        basic.showIcon(IconNames.Yes)
    } else {  // Otherwise, show a "No" icon
        basic.showIcon(IconNames.No)
    }

    // Read the trimpot (potentiometer) on analog port J1; if the value is over 500, show a heart icon
    if (petal.trimpotRead(petal.AnalogPort.J1) > 500) {
        basic.showIcon(IconNames.Heart)
    }
})
