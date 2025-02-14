/**
* Functions to Petal sensor by ELECFREAKS Co.,Ltd.
*/
//% color=#00B1ED  icon="\uf005" block="Petal_Base" blockId="Petal_Base"
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
        //% block="Open"
        Open,
        //% block="Off"
        Off
    }

    export enum TempAndRh{
        //% block="Temperature(℃)"
        Temperature,
        //% block="Humidity(0~100)"
        Humidity
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

    //% blockId=button block="Button sensor %port is pressed"
    //% color=#EA5532 weight=100
    export function buttonRead(port: DigitalPort): boolean {
        let pin = portToDigitalPin(port)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 1
    }

    //% blockId=hall block="Hall sensor %port is attracted"
    //% color=#EA5532 weight=95
    export function hallRead(port: DigitalPort): boolean {
        let pin = portToDigitalPin(port)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 1
    }

    //% blockId=pir block="PIR sensor %port detects motion"
    //% color=#EA5532 weight=90
    export function pirRead(port: DigitalPort): boolean {
        let pin = portToDigitalPin(port)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 1
    }

    //% blockId=buzzer block="Buzzer sensor %port play ring tone (Hz)|%note=device_note" blockGap=8
    //% help=music/ring-tone
    //% color=#EA5532 weight=85
    //% parts="headphone"
    //% useEnumVal=1
    export function buzzerWrite(port: AnalogPort, frequency: number): void {
        let pin = portToAnalogPin(port);
        let periodUs = 1000000 / frequency;
        pins.analogWritePin(pin, 0);
        pins.analogSetPeriod(pin, Math.idiv(periodUs, 2));
        let dutyCycle = 512;
        pins.analogWritePin(pin, dutyCycle);
    }

    //% blockId="trimpot" block="Trimpot sensor %port analog value"
    //% color=#E2C438 weight=40
    export function trimpotRead(port: AnalogPort): number {
        let pin = portToAnalogPin(port)
        return pins.analogReadPin(pin)
    }

    //% blockId="noise" block="Noise sensor %port analog value"
    //% color=#E2C438 weight=35
    export function noiseRead(port: AnalogPort): number {
        let pin = portToAnalogPin(port)
        return pins.analogReadPin(pin)
    }

    //% blockId="photocell" block="Photocell sensor %port light intensity(lux)"
    //% color=#E2C438 weight=35
    export function photocellRead(port: AnalogPort): number {
        let pin = portToAnalogPin(port)
        let voltage = 0
        for (let index = 0; index < 100; index++) {
            voltage = voltage + pins.analogReadPin(pin)
        }
        voltage = voltage / 100
        if (voltage < 200) {
            voltage = Math.map(voltage, 0, 200, 0, 1600)
        }
        else {
            voltage = Math.map(voltage, 200, 1023, 1600, 14000)
        }
        if (voltage < 0) {
            voltage = 0
        }
        return Math.round(voltage)
    }

    //% blockId="redled" block="Red led sensor %port %state"
    //% color=#EA5532 weight=80
    export function redLedWritr(port: DigitalPort, state: SwitchState): void {
        let pin = portToDigitalPin(port)
        switch (state) {
            case SwitchState.Open:
                pins.digitalWritePin(pin, 1)
                break;
            case SwitchState.Off:
                pins.digitalWritePin(pin, 0)
                break;
        }
    }

    //% blockId="uvLevel" block="UV sensor %Rjpin level(0~15)"
    //% color=#E2C438 weight=30
    export function uvLevelRead(port: AnalogPort): number {
        let pin = portToAnalogPin(port)
        let UVlevel = pins.analogReadPin(pin);
        if (UVlevel > 625) {
            UVlevel = 625
        }
        UVlevel = pins.map(
            UVlevel,
            0,
            625,
            0,
            15
        );
        return Math.round(UVlevel)
    }

    //% blockId=vibrationDetection block="Vibration detection sensor %port vibration detected"
    //% color=#EA5532 weight=75
    export function vibrationDetectionRead(port: DigitalPort): boolean {
        let pin = portToDigitalPin(port)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 1
    }

    //todo RGB

    //% blockId=tilt block="Tilt sensor %port Tilt detected"
    //% color=#EA5532 weight=70
    export function tiltRead(port: DigitalPort): boolean {
        let pin = portToDigitalPin(port)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 1
    }

    //% blockId="vibratorMotor" block="Vibrator motor sensor %port %state"
    //% color=#EA5532 weight=65
    export function vibratorMotorWritr(port: DigitalPort, state: SwitchState): void {
        let pin = portToDigitalPin(port)
        switch (state) {
            case SwitchState.Open:
                pins.digitalWritePin(pin, 1)
                break;
            case SwitchState.Off:
                pins.digitalWritePin(pin, 0)
                break;
        }
    }

    //todu Petal Temp and RH Sensor
    let aht20Address = 0x38;
    let humidity = 0.0;
    let temperature = 0.0;

    // 初始化AHT20
    function initAHT20() {
        pins.i2cWriteNumber(aht20Address, 0xE1, NumberFormat.UInt8BE);
        pins.i2cWriteNumber(aht20Address, 0x08, NumberFormat.UInt8BE);
        pins.i2cWriteNumber(aht20Address, 0x00, NumberFormat.UInt8BE);
        basic.pause(10); // 等待初始化完成
    }

    // 读取AHT20数据
    function readAHT20() {
        pins.i2cWriteNumber(aht20Address, 0xAC, NumberFormat.UInt8BE);
        pins.i2cWriteNumber(aht20Address, 0x33, NumberFormat.UInt8BE);
        pins.i2cWriteNumber(aht20Address, 0x00, NumberFormat.UInt8BE);
        basic.pause(80); // 等待测量完成

        let data = pins.i2cReadBuffer(aht20Address, 6);

        if (data.length == 6) {
            let raw_humidity = ((data.getNumber(NumberFormat.UInt8BE, 1) << 12) |
                (data.getNumber(NumberFormat.UInt8BE, 2) << 4) |
                (data.getNumber(NumberFormat.UInt8BE, 3) >> 4));
            humidity = (raw_humidity * 100 / 1048576);

            let raw_temperature = (((data[3] & 0xF) << 16) |
                (data.getNumber(NumberFormat.UInt8BE, 4) << 8) |
                data.getNumber(NumberFormat.UInt8BE, 5));
            temperature = (raw_temperature * 200 / 1048576 - 50);

            return true;
        }
        return false;
    }
    //% blockId="petalTempRH" block="Petal Temp and RH sensor %state value"
    //% color=#00B1ED weight=20
    export function petalTempRHRead(state:TempAndRh): number {
        initAHT20()
        let flagCnt = 3
        while (flagCnt > 0 && !readAHT20()) { flagCnt-- }
        if (temperature <= -50)
            return -1

        switch (state) {
            case TempAndRh.Temperature:
                return Math.round(temperature * 10) / 10
            case TempAndRh.Humidity:
                return Math.round(humidity)
        }
    }


    //% blockId=optoelectronic block="Optoelectronic sensor %port Obstruction detected"
    //% color=#EA5532 weight=60
    export function optoelectronicRead(port: DigitalPort): boolean {
        let pin = portToDigitalPin(port)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 1
    }
}
