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

    export enum TempAndRh {
        //% block="Temperature(℃)"
        Temperature,
        //% block="Humidity(0~100)"
        Humidity
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
    //% color=#00B1ED weight=20
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
    //% color=#EA5532 weight=60
    export function optoelectronicRead(port: DigitalPort): boolean {
        let pin = portToDigitalPin(port)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 1
    }

    //% blockId="dlight" block="Dlight sensor light value"
    //% color=#00B1ED weight=17
    export function dlightRead(): number {
        let Address = 35
        pins.i2cWriteNumber(Address, 0x10, NumberFormat.UInt8BE)
        return Math.idiv(pins.i2cReadNumber(Address, NumberFormat.UInt16BE) * 5, 6)
    }

    // HBT senor
    let GXT310_I2C_ADDRESS = 0x48; // 7位I2C地址
    let HBTtemperature = 0.0;

    //% blockId="hbt" block="Hbt sensor read temperature value"
    //% color=#00B1ED weight=15
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


    function initSensor() {
        writeRegister(REG_SELFTEST, 0xA2);
        loops.pause(1750); // 自检等待时间
    
        writeRegister(REG_I2C_CONFIG, 0x60);
        writeRegister(REG_ACCEL_CONFIG, 0x00); // ±2g, 100Hz ODR
        writeRegister(REG_GYRO_CONFIG, 0x54);  // ±250°/s, 100Hz ODR
        writeRegister(REG_FILTER_CONFIG, 0x01); 
        writeRegister(REG_POWER_CONFIG, 0x03);
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
    

    //% blockId="_6AxisImu" block="six AxisImu sensor read %state value"
    //% color=#00B1ED weight=15
    export function _6AxisImuRead(state: _6AxisState): number {
        if (!dataAvailable()) {
            return -1; // 如果数据不可用，返回-1
        }

        if (_6AxisImuFlag == true) {
            initSensor();
            _6AxisImuFlag = false;
        }
    
        let data = readData();
    
        switch (state) {
            case _6AxisState.AX:
                return data.ax / 16384.0; // 转换为g单位
            case _6AxisState.AY:
                return data.ay / 16384.0;
            case _6AxisState.AZ:
                return data.az / 16384.0;
            case _6AxisState.GX:
                return data.gx / 131.072; // 转换为°/s单位
            case _6AxisState.GY:
                return data.gy / 131.072;
            case _6AxisState.GZ:
                return data.gz / 131.072;
            case _6AxisState._6Temperature:
                return data.temperature;
            default:
                return -1;
        }
    }
    
    function writeRegister(reg: number, value: number) {
        pins.i2cWriteNumber(QMI8658A_I2C_ADDR, reg << 8 | value, NumberFormat.UInt16BE);
    }
    
    function readRegister(reg: number): number {
        pins.i2cWriteNumber(QMI8658A_I2C_ADDR, reg, NumberFormat.UInt8LE, true);
        return pins.i2cReadNumber(QMI8658A_I2C_ADDR, NumberFormat.UInt8LE, false);
    }

}
