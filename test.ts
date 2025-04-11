// Continuously runs the code inside this block in a loop forever.
basic.forever(function () {

    // Checks if the button connected to port J1 on the Petal sensor is pressed.
    // If the button is pressed, the condition evaluates to true.
    if (petal.buttonRead(petal.DigitalPort.J1)) {
        // Displays a checkmark ("Yes") icon on the micro:bit LED screen
        // to indicate that the button is pressed.
        basic.showIcon(IconNames.Yes)
    // If the button is not pressed, this block of code will execute.
    } else {
        // Displays a cross ("No") icon on the micro:bit LED screen
        // to indicate that the button is not pressed.
        basic.showIcon(IconNames.No)
    }
})