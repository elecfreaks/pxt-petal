/**
* Functions to Petal sensor by ELECFREAKS Co.,Ltd.
*/
//% color=#00B1ED  icon="\uf005" block="Petal_Base" blockId="Petal_Base"
//% groups='["Digital", "Analog", "IIC"]'
namespace petal {
    export enum DigitalPort {
        //% block="J1"
        J1,
        //% block="J2"
        J2,
        //% block="J3"
        J3,
        //% block="J4"
        J4
    }
    export enum AnalogPort {
        //% block="J1"
        J1,
        //% block="J2"
        J2
    }

    export enum SwitchState {
        //% block="on"
        On,
        //% block="off"
        Off
    }

    export function portToAnalogPin(port: AnalogPort): any {
        let pin = AnalogPin.P1
        switch (port) {
            case AnalogPort.J1:
                pin = AnalogPin.P1
                break;
            case AnalogPort.J2:
                pin = AnalogPin.P2
                break;
        }
        return pin
    }

    export function portToDigitalPin(port: DigitalPort): any {
        let pin = DigitalPin.P1
        switch (port) {
            case DigitalPort.J1:
                pin = DigitalPin.P1
                break;
            case DigitalPort.J2:
                pin = DigitalPin.P2
                break;
            case DigitalPort.J3:
                pin = DigitalPin.P13
                break;
            case DigitalPort.J4:
                pin = DigitalPin.P15
                break;
        }
        return pin
    }

    /**
    * Get button state.
    * @param port select port, eg: petal.DigitalPort.J1
    */
    //% blockId=petal_button block="button sensor %port is pressed"
    //% color=#EA5532 weight=100 group="Digital"
    export function buttonRead(port: DigitalPort): boolean {
        let pin = portToDigitalPin(port)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 0
    }

    /**
    * Detect magnetic field information
    * @param port select port, eg: petal.DigitalPort.J1
    */
    //% blockId=petal_hall block="Hall sensor %port is attracted"
    //% color=#EA5532 weight=95 group="Digital"
    export function hallRead(port: DigitalPort): boolean {
        let pin = portToDigitalPin(port)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 0
    }

    /**
    * Detect the human body.
    * @param port select port, eg: petal.DigitalPort.J1
    */
    //% blockId=petal_pir block="PIR sensor %port detects motion"
    //% color=#EA5532 weight=90 group="Digital"
    export function pirRead(port: DigitalPort): boolean {
        let pin = portToDigitalPin(port)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 1
    }

    /**
    * Get trimpot analog state (0~1023).
    * @param port select port, eg: petal.AnalogPort.J1
    */
    //% blockId="petal_trimpot" block="trimpot sensor %port analog value"
    //% color=#E2C438 weight=40 group="Analog"
    export function trimpotRead(port: AnalogPort): number {
        let pin = portToAnalogPin(port)
        let voltage = 0
        for (let index = 0; index < 20; index++) {
            voltage = voltage + pins.analogReadPin(pin)
        }
        voltage = voltage / 20
        if (voltage <= 3) {
            voltage = 3
        } else if (voltage >= 1015) {
            voltage = 1015
        }
        return Math.round(Math.map(voltage, 3, 1015, 0, 1023))
    }

    /**
    * Get noise value (dB).
    * @param port select port, eg: petal.AnalogPort.J1
    */
    //% blockId="petal_noise" block="noise sensor %port value (dB)"
    //% color=#E2C438 weight=35 group="Analog"
    export function noiseRead(port: AnalogPort): number {
        let pin = portToAnalogPin(port)
        let level = 0, voltage = 0, noise = 0, h = 0, l = 0, sumh = 0, suml = 0
        for (let i = 0; i < 1000; i++) {
            level = level + pins.analogReadPin(pin)
        }
        level = level / 1000
        for (let i = 0; i < 1000; i++) {
            voltage = pins.analogReadPin(pin)
            if (voltage >= level) {
                h += 1
                sumh = sumh + voltage
            } else {
                l += 1
                suml = suml + voltage
            }
        }
        if (h == 0) {
            sumh = level
        } else {
            sumh = sumh / h
        }
        if (l == 0) {
            suml = level
        } else {
            suml = suml / l
        }
        noise = sumh - suml
        if (noise <= 4) {
            noise = pins.map(
                noise,
                0,
                4,
                30,
                50
            )
        } else if (noise <= 8) {
            noise = pins.map(
                noise,
                4,
                8,
                50,
                55
            )
        } else if (noise <= 14) {
            noise = pins.map(
                noise,
                9,
                14,
                55,
                60
            )
        } else if (noise <= 32) {
            noise = pins.map(
                noise,
                15,
                32,
                60,
                70
            )
        } else if (noise <= 60) {
            noise = pins.map(
                noise,
                33,
                60,
                70,
                75
            )
        } else if (noise <= 100) {
            noise = pins.map(
                noise,
                61,
                100,
                75,
                80
            )
        } else if (noise <= 150) {
            noise = pins.map(
                noise,
                101,
                150,
                80,
                85
            )
        } else if (noise <= 231) {
            noise = pins.map(
                noise,
                151,
                231,
                85,
                90
            )
        } else {
            noise = pins.map(
                noise,
                231,
                1023,
                90,
                120
            )
        }
        noise = Math.round(noise)
        return Math.round(noise)
        // for (let index = 0; index < 100; index++) {
        //     basic.pause(1)
        //     voltage = voltage + pins.analogReadPin(pin)
        // }
        // voltage = voltage / 100
        // return voltage
    }

    /**
    * Get soil moisture value (0~100).
    * @param port select port, eg: petal.AnalogPort.J1
    */
    //% blockId="petal_soilmoisture" block="soil moisture sensor %port value(0~100)"
    //% color=#E2C438 weight=34 group="Analog"
    export function soilHumidityRead(port: AnalogPort): number {
        let voltage = 0, soilmoisture = 0;
        let pin = AnalogPin.P1
        pin = portToAnalogPin(port)
        voltage = pins.map(
            pins.analogReadPin(pin),
            550,
            900,
            0,
            100
        );
        soilmoisture = 100 - voltage;
        return Math.round(soilmoisture >= 100 ? 100 : soilmoisture <= 0 ? 0 : soilmoisture);
    }

    /**
    * set vibrator state.
    * @param port select port, eg: petal.DigitalPort.J1
    * @param state set vibrator state, eg: petal.SwitchState.Off
    */
    //% blockId="petal_vibrator" block="vibrator motor sensor %port %state"
    //% color=#EA5532 weight=81 group="Digital"
    export function vibratorMotorWrite(port: DigitalPort, state: SwitchState): void {
        let pin = portToDigitalPin(port)
        switch (state) {
            case SwitchState.On:
                pins.digitalWritePin(pin, 1)
                break;
            case SwitchState.Off:
                pins.digitalWritePin(pin, 0)
                break;
        }
    }

    /**
    * set fan state.
    * @param port select port, eg: petal.DigitalPort.J1
    * @param state set fan state, eg: petal.SwitchState.Off
    * @param speed set fan speed, eg: 100
    */
    //% blockId="petal_fan" block="fan motor sensor %port %state  || speed %speed \\%"
    //% speed.min=0 speed.max=100 speed.defl=50
    //% color=#EA5532 weight=82 group="Digital"
    export function fanWrite(port: DigitalPort, state: SwitchState, speed: number = 100): void {
        let pin = portToDigitalPin(port)
        switch (state) {
            case SwitchState.On:
                pins.analogSetPeriod(pin, 100)
                pins.analogWritePin(pin, Math.map(speed, 0, 100, 0, 1023))
                break;
            case SwitchState.Off:
                pins.analogWritePin(pin, 0)
                speed = 0
                break;
        }
    }

    /**
    * Get light value (lux).
    */
    //% blockId="petal_digital_light" block="light sensor light value"
    //% color=#00B1ED weight=17 group="IIC"
    export function digitalLightRead(): number {
        let Address = 35
        pins.i2cWriteNumber(Address, 0x10, NumberFormat.UInt8BE)
        return Math.idiv(pins.i2cReadNumber(Address, NumberFormat.UInt16BE) * 5, 6)
    }
}
