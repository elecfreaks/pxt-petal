# Petal Package

This extension is designed to program and drive the sensor series Petal (Flower Petal) micro:bit expansion sensors，You can [get PlanetX from the Elecfreaks store](https://www.elecfreaks.com/)

## Code Example
```JavaScript

basic.forever(function () {
    if (petal.buttonRead(petal.DigitalPort.J1)) {
        petal.FanWrite(petal.DigitalPort.J2, petal.SwitchState.Open)
    } else {
        petal.FanWrite(petal.DigitalPort.J2, petal.SwitchState.Off)
    }
    if (petal.pirRead(petal.DigitalPort.J3)) {
        petal.redLedWrite(petal.DigitalPort.J4, petal.SwitchState.Open)
    } else {
        petal.redLedWrite(petal.DigitalPort.J4, petal.SwitchState.Off)
    }
})
```

## Supported targets

* for PXT/microbit

## License
MIT
