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

    //% blockId=button block="Button sensor %Rjpin is pressed"
    //% color=#EA5532 weight=100
    export function buttonRead(Rjpin: DigitalRJPin): boolean {
        let pin = RJpin_to_digital(Rjpin)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 1
    }

    //% blockId=hall block="hall sensor %Rjpin is attracted"
    //% color=#EA5532 weight=95
    export function hallRead(Rjpin: DigitalRJPin): boolean {
        let pin = RJpin_to_digital(Rjpin)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 1
    }

    //% blockId=PIR block="PIR sensor %Rjpin detects motion"
    //% color=#EA5532 weight=90
    export function PIRRead(Rjpin: DigitalRJPin): boolean {
        let pin = RJpin_to_digital(Rjpin)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 1
    }

    //% blockId=buzzer block="buzzer sensor %Rjpin play ring tone (Hz)|%note=device_note" blockGap=8
    //% help=music/ring-tone
    //% color=#EA5532 weight=85
    //% parts="headphone"
    //% useEnumVal=1
    export function buzzerWrite(Rjpin: AnalogRJPin,frequency: number): void {
        let pin = RJpin_to_analog(Rjpin)
        pins.analogWritePin(pin, frequency)
    }

    //% blockId="trimpot" block="Trimpot sensor %Rjpin analog value"
    //% color=#E2C438 weight=40
    export function trimpot(Rjpin: AnalogRJPin): number {
        let pin = RJpin_to_analog(Rjpin)
        return pins.analogReadPin(pin)
    }
}
