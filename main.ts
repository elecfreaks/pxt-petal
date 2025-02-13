/**
* Functions to Petal sensor by ELECFREAKS Co.,Ltd.
*/
//% color=#00B1ED  icon="\uf005" block="Petal_Base" blockId="Petal_Base"
namespace petal {
    export enum DigitalRJPin {
        //% block="J1"
        J1,
        //% block="J2"
        J2,
        //% block="J3"
        J3,
        //% block="J4"
        J4
    }
    export enum AnalogRJPin {
        //% block="J1"
        J1,
        //% block="J2"
        J2
    }

    ///////////////////////////////////////////////////////RJpin_to_pin
    function RJpin_to_analog(Rjpin: AnalogRJPin): any {
        let pin = AnalogPin.P1
        switch (Rjpin) {
            case AnalogRJPin.J1:
                pin = AnalogPin.P1
                break;
            case AnalogRJPin.J2:
                pin = AnalogPin.P2
                break;
        }
        return pin
    }
    function RJpin_to_digital(Rjpin: DigitalRJPin): any {
        let pin = DigitalPin.P1
        switch (Rjpin) {
            case DigitalRJPin.J1:
                pin = DigitalPin.P1
                break;
            case DigitalRJPin.J2:
                pin = DigitalPin.P2
                break;
            case DigitalRJPin.J3:
                pin = DigitalPin.P13
                break;
            case DigitalRJPin.J4:
                pin = DigitalPin.P15
                break;
        }
        return pin
    }

    //% blockId=button block="Button %Rjpin is pressed"
    //% color=#EA5532
    export function button_state_read(Rjpin: DigitalRJPin): boolean {
        let pin = RJpin_to_digital(Rjpin)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 1
    }

}
