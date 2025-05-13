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
        //% block="Open"
        Open,
        //% block="Off"
        Off
    }

    export enum Distance_Unit_List {
        //% block="mm" 
        Distance_Unit_mm,
        //% block="cm" 
        Distance_Unit_cm,
        //% block="foot"
        Distance_Unit_foot,
    }

    export enum Sever_Type {
        //% block="180°" 
        S180 = 180,
        //% block="270°"
        S270 = 270,
        //% block="360°"
        S360 = 360,
    }

    export enum Sever_List {
        //% block="S1" 
        S1,
        //% block="S2"
        S2,
    }

    export enum TempAndRh {
        //% block="Temperature(℃)"
        Temperature,
        //% block="Humidity(0~100)"
        Humidity
    }

    export enum DS18B20ValType {
        //% block="temperature(℃)" enumval=0
        DS18B20_temperature_C,

        //% block="temperature(℉)" enumval=1
        DS18B20_temperature_F
    }

    export enum TrackingStateType {
        //% block="● ●" enumval=0
        Tracking_State_0,

        //% block="● ◌" enumval=1
        Tracking_State_1,

        //% block="◌ ●" enumval=2
        Tracking_State_2,

        //% block="◌ ◌" enumval=3
        Tracking_State_3
    }

    export enum _6AxisState {
        //% block="AX(g)"
        AX,
        //% block="AY(g)"
        AY,
        //% block="AZ(g)"
        AZ,
        //% block="GX(°/s)"
        GX,
        //% block="GY(°/s)"
        GY,
        //% block="GZ(°/s)"
        GZ,
        //% block="temperature(℃)"
        _6Temperature
    }

    export enum AccelerometerState {
        //% block="X(mg)"
        X,
        //% block="Y(mg)"
        Y,
        //% block="Z(mg)"
        Z
    }

    export enum ScaleRange {
        //% block="(±2g)"
        Range_2G = 2,
        //% block="(±4g)"
        Range_4G = 4,
        //% block="(±8g)"
        Range_8G = 8,
        //% block="(±16g)"
        Range_16G = 16
    }

    export enum AccelScale6 {
        //% block="(±2g)"
        Range_2G = 2,
        //% block="(±4g)"
        Range_4G = 4,
        //% block="(±8g)"
        Range_8G = 8,
        //% block="(±16g)"
        Range_16G = 16
    }
    export enum GyroRange6 {
        //% block="±512(°/s)"
        Range512dps = 512,
        //% block="±16(°/s)"
        Range16dps = 16,
        //% block="±32(°/s)"
        Range32dps = 32,
        //% block="±64(°/s)"
        Range64dps = 64,
        //% block="±128(°/s)"
        Range128dps = 128,
        //% block="±256(°/s)"
        Range256dps = 256,
        //% block="±1024(°/s)"
        Range1024dps = 1024,
        //% block="±2048(°/s)"
        Range2048dps = 2048
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

    export function portToDigitalPin2(port: DigitalPort): any {
        let pin = DigitalPin.P8
        switch (port) {
            case DigitalPort.J1:
                pin = DigitalPin.P8
                break;
            case DigitalPort.J2:
                pin = DigitalPin.P12
                break;
            case DigitalPort.J3:
                pin = DigitalPin.P14
                break;
            case DigitalPort.J4:
                pin = DigitalPin.P16
                break;
        }
        return pin
    }

    //% blockId=button block="Button sensor %port is pressed"
    //% color=#EA5532 weight=100 group="Digital"
    export function buttonRead(port: DigitalPort): boolean {
        let pin = portToDigitalPin(port)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 0
    }

    //% blockId=hall block="Hall sensor %port is attracted"
    //% color=#EA5532 weight=95 group="Digital"
    export function hallRead(port: DigitalPort): boolean {
        let pin = portToDigitalPin(port)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 0
    }

    //% blockId=pir block="PIR sensor %port detects motion"
    //% color=#EA5532 weight=90 group="Digital"
    export function pirRead(port: DigitalPort): boolean {
        let pin = portToDigitalPin(port)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 1
    }

    export enum PlaybackMode {
        //% block="UntilDone"
        UntilDone,
        //% block="InBackground"
        InBackground,
        //% block="LoopingInBackground"
        LoopingInBackground
    }

    enum BeatFraction {
        //% block=1
        Whole = 1,
        //% block="1/2"
        Half = 2,
        //% block="1/4"
        Quarter = 4,
        //% block="1/8"
        Eighth = 8,
        //% block="1/16"
        Sixteenth = 16,
        //% block="2"
        Double = 32,
        //% block="4",
        Breve = 64
    }

    let currentBPM: number = 120;

    //% blockId=set_bpm_block
    //% block="set rhythm %bpm bpm"
    //% bpm.min=40 bpm.max=500 bpm.defl=120
    //% color=#EA5532 weight=70 group="Digital"
    export function setBPM(bpm: number): void {
        currentBPM = Math.max(1, Math.min(500, bpm)); // 限制范围1-500
    }

    //% block="Buzzer sensor %port play ring tone |%note=device_note %beat rhythm %mode"
    //% beat.defl=BeatFraction.Whole
    //% mode.defl=PlaybackMode.UntilDone
    //% color=#EA5532 weight=60 group="Digital"
    //% inlineInputMode=inline
    //% help=music/ring-tone
    //% parts="headphone"
    //% useEnumVal=1
    export function playIntegratedTone(
        port: DigitalPort,
        Note: number,
        beat: BeatFraction,
        mode: PlaybackMode,
    ): void {
        let pin = portToDigitalPin(port)
        pins.setAudioPin(pin)
        music.play(music.tonePlayable(Note, music.beat(beat)), mode)
    }


    //% blockId=buzzer block="Buzzer sensor %port play ring tone (Hz)|%note=device_note"
    //% help=music/ring-tone
    //% color=#EA5532 weight=65 group="Digital"
    //% parts="headphone"
    //% useEnumVal=1
    export function buzzerWrite(port: DigitalPort, Note: number): void {
        let pin = portToDigitalPin(port);
        pins.setAudioPin(pin)
        music.ringTone(Note)
    }

    //% block="Stop buzzer on %port"
    //% color=#EA5532 weight=75 group="Digital"
    export function stopBuzzer(port: DigitalPort): void {
        buzzerWrite(port, 0);
    }

    //% blockId="trimpot" block="Trimpot sensor %port analog value"
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

    //% blockId="noise" block="Noise sensor %port value (dB)"
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

    //% blockId="readsoilmoisture" block="Soil moisture sensor %port value(0~100)"
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

    //% blockId="photocell" block="Photocell sensor %port light intensity(lux)"
    //% color=#E2C438 weight=33 group="Analog"
    export function photocellRead(port: AnalogPort): number {
        let pin = portToAnalogPin(port);
        let voltage = 0;

        const adc = [6, 9, 14, 22, 46, 171, 200, 270, 302, 417, 834, 954, 966, 976, 986];
        const lux = [5, 8, 12, 16, 23, 113, 142, 195, 244, 329, 771, 1255, 3835, 11783, 41489];

        for (let index = 0; index < 100; index++) {
            basic.pause(1);
            voltage += pins.analogReadPin(pin);
        }
        const adcValue = Math.round(voltage / 100);

        if (adcValue <= adc[0]) return (adcValue - 1) < 0 ? 0 : (adcValue - 1);
        if (adcValue >= adc[adc.length - 1]) return Math.round(Math.map(adcValue, 986, 1023, 41489, 100000));

        for (let i = 0; i < adc.length - 1; i++) {
            if (adcValue >= adc[i] && adcValue <= adc[i + 1]) {
                const ratio = (adcValue - adc[i]) / (adc[i + 1] - adc[i]);
                return Math.round(lux[i] + ratio * (lux[i + 1] - lux[i]));
            }
        }

        return 0;
    }

    // export function photocellRead(port: AnalogPort): number {
    //     let pin = portToAnalogPin(port)
    //     let voltage = 0
    //     // for (let index = 0; index < 100; index++) {
    //     //     voltage = voltage + pins.analogReadPin(pin)
    //     // }
    //     // voltage = voltage / 100
    //     // if (voltage < 200) {
    //     //     voltage = Math.map(voltage, 0, 200, 0, 1600)
    //     // }
    //     // else {
    //     //     voltage = Math.map(voltage, 200, 1023, 1600, 14000)
    //     // }
    //     // if (voltage < 0) {
    //     //     voltage = 0
    //     // }
    //     for (let index = 0; index < 100; index++) {
    //         basic.pause(1)
    //         voltage = voltage + pins.analogReadPin(pin)
    //     }
    //     voltage = voltage / 100
    //     return Math.round(voltage)
    // }

    //% blockId="redled" block="Red led sensor %port %state"
    //% color=#EA5532 weight=83 group="Digital"
    export function redLedWrite(port: DigitalPort, state: SwitchState): void {
        let pin = portToDigitalPin(port)
        switch (state) {
            case SwitchState.Open:
                pins.digitalWritePin(pin, 0)
                break;
            case SwitchState.Off:
                pins.digitalWritePin(pin, 1)
                break;
        }
    }

    //% blockId="uvLevel" block="UV sensor %Rjpin level(0~15)"
    //% color=#E2C438 weight=30 group="Analog"
    export function uvLevelRead(port: AnalogPort): number {
        let pin = portToAnalogPin(port)
        let UVlevel = pins.analogReadPin(pin);
        // if (UVlevel > 625) {
        //     UVlevel = 625
        // }
        UVlevel = pins.map(
            UVlevel,
            0,
            1000,
            0,
            15
        );
        return Math.round(UVlevel)
    }

    //% blockId="waterLevelRead" block="Water level sensor %Rjpin value(0~100)"
    //% color=#E2C438 weight=28 group="Analog"
    export function waterLevelRead(port: AnalogPort): number {
        let pin = portToAnalogPin(port)
        let voltage = 0, waterlevel = 0;
        let value = 0
        for (let index = 0; index < 100; index++) {
            basic.pause(1);
            value += pins.analogReadPin(pin);
        }
        value = Math.round(voltage / 100);
        if (value <= 380) {
            voltage = pins.map(pins.analogReadPin(pin), 50, 380, 0, 60);
        }
        else {
            voltage = pins.map(pins.analogReadPin(pin), 381, 500, 60, 100);
        }
        voltage = Math.min(100, Math.max(voltage, 0))
        waterlevel = voltage;
        return Math.round(waterlevel)
    }

    //% blockId=vibrationDetection block="Vibration detection sensor %port vibration detected"
    //% color=#EA5532 weight=88 group="Digital"
    export function vibrationDetectionRead(port: DigitalPort): boolean {
        let pin = portToDigitalPin(port)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 0
    }

    //% block="set %severtype servo  on %port %severlist to angle %angle"
    //% angle.min=0 angle.max=180
    //% color=#EA5532 weight=86 group="Digital"
    //% inlineInputMode=inline
    export function setSeverAngle(severtype: Sever_Type, port: DigitalPort, severlist: Sever_List, angle: number): void {
        let pin = portToDigitalPin(port)
        switch (severlist) {
            case Sever_List.S1:
                pin = portToDigitalPin(port)
                break;
            case Sever_List.S2:
                pin = portToDigitalPin2(port)
                break;
        }
        angle = Math.clamp(0, severtype, angle);

        // 将角度转换为微秒脉冲宽度 (通常舵机范围为 500us 到 2500us)
        let pulseWidth = 500 + (angle / severtype) * 2000;

        // 设置 PWM 输出，频率为 50Hz (周期 20ms)
        pins.servoSetPulse(pin, pulseWidth);
    }

    //% block="set continuous servo on %port %severlist speed to %speed\\%"
    //% speed.min=-100 speed.max=100
    //% color=#EA5532 weight=87 group="Digital"
    //% inlineInputMode=inline
    export function setSeverSpeed(port: DigitalPort, severlist: Sever_List, speed: number): void {
        let pin = portToDigitalPin(port)
        switch (severlist) {
            case Sever_List.S1:
                pin = portToDigitalPin(port)
                break;
            case Sever_List.S2:
                pin = portToDigitalPin2(port)
                break;
        }
        speed = Math.clamp(-100, 100, speed);
        speed = Math.round(Math.map(speed, -100, 100, 0, 180))
        // 将角度转换为微秒脉冲宽度 (通常舵机范围为 500us 到 2500us)
        let pulseWidth = 500 + (speed / 180) * 2000;

        // 设置 PWM 输出，频率为 50Hz (周期 20ms)
        pins.servoSetPulse(pin, pulseWidth);
    }

    //% blockId=tilt block="Tilt sensor %port Tilt lift detected"
    //% color=#EA5532 weight=84 group="Digital"
    export function tiltRead(port: DigitalPort): boolean {
        let pin = portToDigitalPin(port)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 0
    }

    //% blockId="vibratorMotor" block="Vibrator motor sensor %port %state"
    //% color=#EA5532 weight=81 group="Digital"
    export function vibratorMotorWrite(port: DigitalPort, state: SwitchState): void {
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

    //% blockId="fanWrite" block="Motor fan sensor %port %state  || speed %speed \\%"
    //% speed.min=0 speed.max=100 speed.defl=50
    //% color=#EA5532 weight=82 group="Digital"
    export function FanWrite(port: DigitalPort, state: SwitchState, speed: number = 100): void {
        let pin = portToDigitalPin(port)
        switch (state) {
            case SwitchState.Open:
                pins.analogSetPeriod(pin, 100)
                pins.analogWritePin(pin, Math.map(speed, 0, 100, 0, 1023))
                break;
            case SwitchState.Off:
                pins.analogWritePin(pin, 0)
                speed = 0
                break;
        }
    }

    //% blockId=sonarbit block="Ultrasonic sensor %port distance %distance_unit"
    //% color=#EA5532 weight=58 group="Digital"
    export function ultrasoundSensor(port: DigitalPort, distance_unit: Distance_Unit_List): number {
        let pin = portToDigitalPin(port)
        pins.setPull(pin, PinPullMode.PullNone)
        pins.digitalWritePin(pin, 0)
        control.waitMicros(2)
        pins.digitalWritePin(pin, 1)
        control.waitMicros(10)
        pins.digitalWritePin(pin, 0)

        // read pulse
        let d = pins.pulseIn(pin, PulseValue.High, 23000)  // 8 / 340 = 
        // let distance = d * 10 * 5 / 3 / 58
        // let distance = d * 10 / 58 //d * 34 / 2 / 100
        let distance = d * 34 / 2 / 100

        if (distance > 4000) distance = 0

        switch (distance_unit) {
            case 0:
                return Math.round(distance) //mm
                break
            case 1:
                return Math.round(distance / 10)  //cm
                break
            case 2:
                return Math.round(distance / 25.4)  //inch
                break
            default:
                return 0
        }
    }

    //todu Petal Temp and RH Sensor
    let aht20Address = 0x38;
    let AHT20humidity = 0.0;
    let AHT20temperature = 0.0;

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
            let raw_AHT20humidity = ((data.getNumber(NumberFormat.UInt8BE, 1) << 12) |
                (data.getNumber(NumberFormat.UInt8BE, 2) << 4) |
                (data.getNumber(NumberFormat.UInt8BE, 3) >> 4));
            AHT20humidity = (raw_AHT20humidity * 100 / 1048576);

            let raw_AHT20temperature = (((data[3] & 0xF) << 16) |
                (data.getNumber(NumberFormat.UInt8BE, 4) << 8) |
                data.getNumber(NumberFormat.UInt8BE, 5));
            AHT20temperature = (raw_AHT20temperature * 200 / 1048576 - 50);

            return true;
        }
        return false;
    }
    //% blockId="petalTempRH" block="Temp and RH sensor %state value"
    //% color=#00B1ED weight=20 group="IIC"
    export function petalTempRHRead(state: TempAndRh): number {
        initAHT20()
        let flagCnt = 3
        while (flagCnt > 0 && !readAHT20()) { flagCnt-- }
        if (AHT20temperature <= -50)
            return -1

        switch (state) {
            case TempAndRh.Temperature:
                return Math.round(AHT20temperature * 10) / 10
            case TempAndRh.Humidity:
                return Math.round(AHT20humidity)
        }
    }


    //% blockId=optoelectronic block="Optoelectronic sensor %port Obstruction detected"
    //% color=#EA5532 weight=93 group="Digital"
    export function optoelectronicRead(port: DigitalPort): boolean {
        let pin = portToDigitalPin(port)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 1
    }

    //% blockId="dlight" block="Dlight sensor light value"
    //% color=#00B1ED weight=17 group="IIC"
    export function dlightRead(): number {
        let Address = 35
        pins.i2cWriteNumber(Address, 0x10, NumberFormat.UInt8BE)
        return Math.idiv(pins.i2cReadNumber(Address, NumberFormat.UInt16BE) * 5, 6)
    }

    // HBT senor
    let GXT310_I2C_ADDRESS = 0x48; // 7位I2C地址
    let HBTtemperature = 0.0;

    //% blockId="hbt" block="Hbt sensor read temperature value"
    //% color=#00B1ED weight=15 group="IIC"
    export function hbtRead(): number {
        let buff = pins.createBuffer(2);

        pins.i2cWriteNumber(GXT310_I2C_ADDRESS, 0x00, NumberFormat.UInt8LE, true);

        buff = pins.i2cReadBuffer(GXT310_I2C_ADDRESS, 2, false);

        if (buff.length == 2) {
            let tem = ((buff[0] << 8) | buff[1]) & 0xFFFF;

            if (tem & 0x8000) {
                tem = ~tem + 1;
                HBTtemperature = -(tem * 0.0078125);
            } else {
                HBTtemperature = tem * 0.0078125;
            }

            return Math.round(HBTtemperature * 10) / 10;
        }

        return -1;
    }

    // DS18B20 Sensor
    let sc_byte = 0
    let dat = 0
    let low = 0
    let high = 0
    let temp = 0
    let temperature = 0
    let ack = 0
    let lastTemp = 0

    function init_18b20(mpin: DigitalPin) {
        pins.digitalWritePin(mpin, 0)
        control.waitMicros(600)
        pins.digitalWritePin(mpin, 1)
        control.waitMicros(30)
        ack = pins.digitalReadPin(mpin)
        control.waitMicros(600)
        return ack
    }
    function write_18b20(mpin: DigitalPin, data: number) {
        sc_byte = 0x01
        for (let index = 0; index < 8; index++) {
            pins.digitalWritePin(mpin, 0)
            if (data & sc_byte) {
                pins.digitalWritePin(mpin, 1)
                control.waitMicros(60)
            } else {
                pins.digitalWritePin(mpin, 0)
                control.waitMicros(60)
            }
            pins.digitalWritePin(mpin, 1)
            data = data >> 1
        }
    }
    function read_18b20(mpin: DigitalPin) {
        dat = 0x00
        sc_byte = 0x01
        for (let index = 0; index < 8; index++) {
            pins.digitalWritePin(mpin, 0)
            pins.digitalWritePin(mpin, 1)
            if (pins.digitalReadPin(mpin)) {
                dat = dat + sc_byte
            }
            sc_byte = sc_byte << 1
            control.waitMicros(60)
        }
        return dat
    }
    //% blockId=ds18b20 block="ds18b20 sensor %port read %state value"
    //% color=#EA5532 weight=55 group="Digital"
    export function Ds18b20Temp(port: DigitalPort, state: DS18B20ValType): number {
        let pin = portToDigitalPin(port);
        init_18b20(pin)
        write_18b20(pin, 0xCC)
        write_18b20(pin, 0x44)
        basic.pause(10)
        init_18b20(pin)
        write_18b20(pin, 0xCC)
        write_18b20(pin, 0xBE)
        low = read_18b20(pin)
        high = read_18b20(pin)
        temperature = high << 8 | low
        temperature = temperature / 16
        if (temperature > 130) {
            temperature = lastTemp
        }
        lastTemp = temperature
        switch (state) {
            case DS18B20ValType.DS18B20_temperature_C:
                return temperature
            case DS18B20ValType.DS18B20_temperature_F:
                temperature = (temperature * 1.8) + 32
                return temperature
            default:
                return 0
        }

    }

    //% blockId=tracking block="Line-tracking sensor %port is %state"
    //% color=#EA5532 weight=54 group="Digital"
    export function trackingSensor(port: DigitalPort, state: TrackingStateType): boolean {
        let lpin = portToDigitalPin(port);
        let rpin = portToDigitalPin2(port);
        pins.setPull(lpin, PinPullMode.PullUp)
        pins.setPull(rpin, PinPullMode.PullUp)
        let lsensor = pins.digitalReadPin(lpin)
        let rsensor = pins.digitalReadPin(rpin)
        if (lsensor == 0 && rsensor == 0 && state == TrackingStateType.Tracking_State_0) {
            return true;
        } else if (lsensor == 0 && rsensor == 1 && state == TrackingStateType.Tracking_State_1) {
            return true;
        } else if (lsensor == 1 && rsensor == 0 && state == TrackingStateType.Tracking_State_2) {
            return true;
        } else if (lsensor == 1 && rsensor == 1 && state == TrackingStateType.Tracking_State_3) {
            return true;
        } else return false;
    }
    //6 Axis Imu Sensor
    let QMI8658A_I2C_ADDR = 0x6A;

    const REG_SELFTEST = 0x0A;
    const REG_I2C_CONFIG = 0x02;
    const REG_ACCEL_CONFIG = 0x03;
    const REG_GYRO_CONFIG = 0x04;
    const REG_FILTER_CONFIG = 0x06;
    const REG_POWER_CONFIG = 0x08;
    const REG_STATUS = 0x2D;
    const REG_ACCEL_START = 0x35;
    const REG_GYRO_START = 0x3B;
    const REG_TEMP_LOW = 0x33; // 温度寄存器低字节
    const REG_TEMP_HIGH = 0x34; // 温度寄存器高字节

    let _6AxisImuFlag = true;

    let currentAccelRange = 2; // 默认±2g
    let currentGyroRange = 512; // 默认±512dps

    // 全局变量存储校准偏移量
    let accelBias = { x: 0, y: 0, z: 0 };
    let gyroBias = { x: 0, y: 0, z: 0 };
    let isCalibrating = false;

    function initSensor(RangeA: number, RangeG: number) {
        // writeRegister(REG_SELFTEST, 0xA2);  // 启动自检
        // basic.pause(1750);                  // 等待自检完成
        // writeRegister(REG_SELFTEST, 0x00);  // 退出自检模式（部分传感器需要此操作）
        // basic.pause(100)
        writeRegister(REG_I2C_CONFIG, 0x60);    // 重新配置I2C
        basic.pause(100)
        let regValue = 0x00;
        switch (RangeA) {
            case 2: regValue = 0x00; break;
            case 4: regValue = 0x10; break;
            case 8: regValue = 0x20; break;
            case 16: regValue = 0x30; break;
        }
        writeRegister(REG_ACCEL_CONFIG, regValue);
        regValue = 0x00;
        switch (RangeG) {
            case 16: regValue = 0x00; break; // ±16dps (000)
            case 32: regValue = 0x20; break; // ±32dps (001 << 4)
            case 64: regValue = 0x40; break; // ±64dps (010 << 4)
            case 128: regValue = 0x60; break; // ±128dps (011 << 4)
            case 256: regValue = 0x80; break; // ±256dps (100 << 4)
            case 512: regValue = 0xA0; break; // ±512dps (101 << 4)
            case 1024: regValue = 0xC0; break; // ±1024dps (110 << 4)
            case 2048: regValue = 0xE0; break; // ±2048dps (111 << 4)
        }
        regValue |= 0x04;
        writeRegister(REG_GYRO_CONFIG, regValue);

        writeRegister(REG_FILTER_CONFIG, 0x01); // 低通滤波器配置
        writeRegister(REG_POWER_CONFIG, 0x03);  // 电源管理模式
    }


    function dataAvailable(): boolean {
        let status = readRegister(REG_STATUS);
        return (status & 0x01) === 1;
    }

    function readData(): { ax: number, ay: number, az: number, gx: number, gy: number, gz: number, temperature: number } {
        let rawData = pins.createBuffer(12);  // 存储从传感器读取的12个字节的数据（加速度计和陀螺仪）
        let tempData = pins.createBuffer(2);  // 存储从传感器读取的2个字节的数据（温度）

        // 读取加速度计和陀螺仪数据
        pins.i2cWriteNumber(QMI8658A_I2C_ADDR, REG_ACCEL_START, NumberFormat.UInt8LE, true); // 发送寄存器地址，并重启
        rawData = pins.i2cReadBuffer(QMI8658A_I2C_ADDR, 12, false);

        let ax = (rawData.getNumber(NumberFormat.Int16LE, 0));
        let ay = (rawData.getNumber(NumberFormat.Int16LE, 2));
        let az = (rawData.getNumber(NumberFormat.Int16LE, 4));
        let gx = (rawData.getNumber(NumberFormat.Int16LE, 6));
        let gy = (rawData.getNumber(NumberFormat.Int16LE, 8));
        let gz = (rawData.getNumber(NumberFormat.Int16LE, 10));

        // 读取温度数据
        pins.i2cWriteNumber(QMI8658A_I2C_ADDR, REG_TEMP_LOW, NumberFormat.UInt8LE, true); // 发送寄存器地址，并重启
        tempData = pins.i2cReadBuffer(QMI8658A_I2C_ADDR, 2, false);

        let tempRaw = tempData.getNumber(NumberFormat.Int16LE, 0);
        let temperature = tempRaw / 256.0;

        return { ax, ay, az, gx, gy, gz, temperature };
    }

    //% block="six AxisImu sensor calibration (static 3 seconds)"
    //% color=#00B1ED weight=11 group="IIC"
    export function _6AxisImuWrite(): void {
        isCalibrating = true;

        // Step 1: 初始化采样数据
        let accelSamples = { x: 0, y: 0, z: 0 };
        let gyroSamples = { x: 0, y: 0, z: 0 };
        const sampleCount = 200;  // 采样次数

        // Step 2: 数据采集阶段
        for (let i = 0; i < sampleCount; i++) {
            let raw = readData();  // 获取原始数据

            // 累加速度计数据（预期静止状态下各轴应为0）
            accelSamples.x += raw.ax;
            accelSamples.y += raw.ay;
            accelSamples.z += raw.az;

            // 累加陀螺仪数据（预期静止状态下各轴应为0）
            gyroSamples.x += raw.gx;
            gyroSamples.y += raw.gy;
            gyroSamples.z += raw.gz;

            basic.pause(10);  // 间隔10ms采样
        }

        // Step 3: 计算平均值
        accelBias = {
            x: accelSamples.x / sampleCount,
            y: accelSamples.y / sampleCount,
            z: accelSamples.z / sampleCount - (32768 / currentAccelRange)  // 补偿Z轴重力影响（假设设备水平放置）
        };

        gyroBias = {
            x: gyroSamples.x / sampleCount,
            y: gyroSamples.y / sampleCount,
            z: gyroSamples.z / sampleCount
        };

        isCalibrating = false;
    }

    //% blockId="_6AxisImu" block="six AxisImu sensor read %state value %rangeA %RangeG"
    //% color=#00B1ED weight=10 group="IIC"
    export function _6AxisImuRead(state: _6AxisState, RangeA: AccelScale6, RangeG: GyroRange6): number {
        if (_6AxisImuFlag == true) {
            currentAccelRange = RangeA;
            currentGyroRange = RangeG;
            initSensor(RangeA, RangeG);
            _6AxisImuFlag = false;
        }

        let _6AxisImucnt = 5;
        while (_6AxisImucnt > 0 && !dataAvailable()) {
            _6AxisImucnt--;
        }

        let data = readData();

        data.ax -= accelBias.x
        data.ay -= accelBias.y
        data.az -= accelBias.z
        data.gx -= gyroBias.x
        data.gy -= gyroBias.y
        data.gz -= gyroBias.z

        // 加速度计：1 LSB = (1000 mg) / (灵敏度 LSB/g)
        let accelScale = (currentAccelRange * 1000.0) / 32768; // mg/LSB

        // 陀螺仪：1 LSB = (量程 dps) / 32768 LSB
        let gyroScale = currentGyroRange / 32768.0; // dps/LSB

        //结果保留两位小数
        switch (state) {
            case _6AxisState.AY:
                return 0 - Math.round(data.ax * accelScale);
            case _6AxisState.AX:
                return 0 - Math.round(data.ay * accelScale);
            case _6AxisState.AZ:
                return Math.round(data.az * accelScale);
            case _6AxisState.GY:
                return 0 - Math.round(data.gx * gyroScale);
            case _6AxisState.GX:
                return 0 - Math.round(data.gy * gyroScale);
            case _6AxisState.GZ:
                return Math.round(data.gz * gyroScale);
            case _6AxisState._6Temperature:
                return Math.round(data.temperature * 10) / 10;
            default:
                return 0;
        }
    }

    function writeRegister(reg: number, value: number) {
        pins.i2cWriteNumber(QMI8658A_I2C_ADDR, reg << 8 | value, NumberFormat.UInt16BE);
    }

    function readRegister(reg: number): number {
        pins.i2cWriteNumber(QMI8658A_I2C_ADDR, reg, NumberFormat.UInt8LE, true);
        return pins.i2cReadNumber(QMI8658A_I2C_ADDR, NumberFormat.UInt8LE, false);
    }

    //Accelerometer Sensor
    let lis3dhAddress = 0x19; // 默认I2C地址
    let scaleFactor = 2; // 对于±2g量程，默认比例因子
    let accelFlag = true;

    // 全局变量存储校准偏移量
    let accelBias3 = { x: 0, y: 0, z: 0 };
    let isCalibrating3 = false;

    /**
     * 初始化加速度计
     * @param range 选择量程
     */
    function initAccel(range: ScaleRange) {
        // 确认设备ID
        let whoAmIReg = 0x0F;
        pins.i2cWriteNumber(lis3dhAddress, whoAmIReg, NumberFormat.UInt8BE, false);
        let whoAmI = pins.i2cReadNumber(lis3dhAddress, NumberFormat.UInt8BE, true);
        if (whoAmI != 0x33) {
            return; // 如果WHO_AM_I不是0x33，说明连接有问题或者地址不对
        }

        // 设置CTRL_REG1: 设置为50Hz输出速率，所有轴启用
        let configReg1 = 0x20;
        let configValue1 = 0x77; // 50Hz, all axes enabled
        writeRegister3dh(configReg1, configValue1);

        // 设置CTRL_REG4: 设置量程
        setScaleRange(range);
    }

    /**
     * 写入寄存器值
     * @param reg 寄存器地址
     * @param value 要写入的值
     */
    function writeRegister3dh(reg: number, value: number) {
        let buffer = pins.createBuffer(2);
        buffer[0] = reg;
        buffer[1] = value;
        pins.i2cWriteBuffer(lis3dhAddress, buffer, false);
        control.waitMicros(10); // 等待写入完成
    }

    /**
     * 设置量程
     * @param range 选择量程
     */
    function setScaleRange(range: ScaleRange) {
        let configReg4 = 0x23;
        let fsValue = 0x00;

        // 仅修改FS位（bit4-5），保留其他位
        switch (range) {
            case ScaleRange.Range_2G:  // 00 -> ±2g
                fsValue = 0x00;        // 二进制 00 << 4
                scaleFactor = 2;
                break;
            case ScaleRange.Range_4G:  // 01 -> ±4g
                fsValue = 0x10;        // 二进制 01 << 4
                scaleFactor = 4;
                break;
            case ScaleRange.Range_8G:  // 10 -> ±8g
                fsValue = 0x20;        // 二进制 10 << 4
                scaleFactor = 8;
                break;
            case ScaleRange.Range_16G: // 11 -> ±16g
                fsValue = 0x30;        // 二进制 11 << 4
                scaleFactor = 16;
                break;
        }

        // 设置BDU（bit3）和HR（bit3）推荐配置
        const BDU_ENABLE = 0x80; // 启用块数据更新
        const HR_ENABLE = 0x08;  // 启用高分辨率模式
        writeRegister3dh(configReg4, fsValue | BDU_ENABLE | HR_ENABLE);
    }

    /**
     * 从指定的寄存器读取16位的数据
     * @param reg 加速度计寄存器地址
     */
    function read16(reg: number): number {
        let buffer = pins.createBuffer(1);
        buffer[0] = reg | 0x80; // 设置最高位为1表示连续读取
        pins.i2cWriteBuffer(lis3dhAddress, buffer, false);

        // 读取两个字节的数据
        buffer = pins.i2cReadBuffer(lis3dhAddress, 2, false);
        let value = buffer.getNumber(NumberFormat.Int16LE, 0);

        return value;
    }

    function AccelReadData(): { ax: number, ay: number, az: number } {
        basic.pause(5);
        let ax = read16(0x28);
        let ay = read16(0x2A);
        let az = read16(0x2C);

        return { ax, ay, az }

    }

    //% block="Accelerometer sensor calibration (static 3 seconds)"
    //% color=#00B1ED weight=6 group="IIC"
    export function AccelWrite(): void {
        isCalibrating3 = true;

        // Step 1: 初始化采样数据
        let accelSamples = { x: 0, y: 0, z: 0 };
        const sampleCount = 400;  // 采样次数

        // Step 2: 数据采集阶段
        for (let i = 0; i < sampleCount; i++) {
            let raw = AccelReadData();  // 获取原始数据

            // 累加速度计数据（预期静止状态下各轴应为0）
            accelSamples.x += raw.ax;
            accelSamples.y += raw.ay;
            accelSamples.z += raw.az;
        }

        // Step 3: 计算平均值
        accelBias3 = {
            x: accelSamples.x / sampleCount,
            y: accelSamples.y / sampleCount,
            z: accelSamples.z / sampleCount - (32768 / scaleFactor)  // 补偿Z轴重力影响（假设设备水平放置）
        };

        isCalibrating3 = false;
    }

    //% blockId="Accel" block="Accelerometer sensor read %state value %Range"
    //% color=#00B1ED weight=5 group="IIC"
    export function AccelRead(state: AccelerometerState, Range: ScaleRange): number {
        if (accelFlag) {
            initAccel(Range); // 默认设置为±2g量程
            accelFlag = false;
        }

        let data = AccelReadData();

        data.ax -= accelBias3.x
        data.ay -= accelBias3.y
        data.az -= accelBias3.z

        // 加速度计：1 LSB = (1000 mg) / (灵敏度 LSB/g)
        let accelScale = (scaleFactor * 1000.0) / 32768; // mg/LSB

        switch (state) {
            case AccelerometerState.Y:
                return Math.round(data.ax * accelScale);
            case AccelerometerState.X:
                return Math.round(data.ay * accelScale);
            case AccelerometerState.Z:
                return Math.round(data.az * accelScale);
            default:
                return 0;
        }
    }
}
