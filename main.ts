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
        Range_8G = 8
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

    //% blockId=buzzer block="Buzzer sensor %port play ring tone (Hz)|%note=device_note" blockGap=8
    //% help=music/ring-tone
    //% color=#EA5532 weight=85 group="Digital"
    //% parts="headphone"
    //% useEnumVal=1
    export function buzzerWrite(port: AnalogPort, frequency: number): void {
        let pin = portToAnalogPin(port);

        if (frequency < 20) {
            pins.analogWritePin(pin, 0);
            return;
        }
        const MIN_PERIOD_US = 200; // 对应约5kHz，可根据实际情况调整
        const MAX_PERIOD_US = 50000; // 对应20Hz
        let periodUs = Math.max(MIN_PERIOD_US, Math.min(1000000 / frequency, MAX_PERIOD_US));

        pins.analogWritePin(pin, 0); 

        pins.analogSetPeriod(pin, Math.idiv(periodUs, 2));

        let dutyCycle = 512;
        pins.analogWritePin(pin, dutyCycle); 
    }
    //% blockId="trimpot" block="Trimpot sensor %port analog value"
    //% color=#E2C438 weight=40 group="Analog"
    export function trimpotRead(port: AnalogPort): number {
        let pin = portToAnalogPin(port)
        return pins.analogReadPin(pin)
    }

    //% blockId="noise" block="Noise sensor %port analog value"
    //% color=#E2C438 weight=35 group="Analog"
    export function noiseRead(port: AnalogPort): number {
        let pin = portToAnalogPin(port)
        return pins.analogReadPin(pin)
    }

    //% blockId="photocell" block="Photocell sensor %port light intensity(lux)"
    //% color=#E2C438 weight=35 group="Analog"
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
    //% color=#EA5532 weight=80 group="Digital"
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
    //% color=#EA5532 weight=75 group="Digital"
    export function vibrationDetectionRead(port: DigitalPort): boolean {
        let pin = portToDigitalPin(port)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 1
    }

    //% blockId=tilt block="Tilt sensor %port Tilt detected"
    //% color=#EA5532 weight=70 group="Digital"
    export function tiltRead(port: DigitalPort): boolean {
        let pin = portToDigitalPin(port)
        pins.setPull(pin, PinPullMode.PullUp)
        return pins.digitalReadPin(pin) == 1
    }

    //% blockId="vibratorMotor" block="Vibrator motor sensor %port %state"
    //% color=#EA5532 weight=65 group="Digital"
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
    //% color=#EA5532 weight=60 group="Digital"
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
        basic.pause(1750); // 自检等待时间

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
    //% color=#00B1ED weight=10 group="IIC"
    export function _6AxisImuRead(state: _6AxisState): number {
        if (_6AxisImuFlag == true) {
            initSensor();
            _6AxisImuFlag = false;
        }

        let _6AxisImucnt = 5;
        while (_6AxisImucnt > 0 && !dataAvailable()) {
            _6AxisImucnt--;
        }

        let data = readData();

        //结果保留两位小数
        switch (state) {
            case _6AxisState.AX:
                return Math.round(data.ax * 0.061035);
            case _6AxisState.AY:
                return Math.round(data.ay * 0.061035);
            case _6AxisState.AZ:
                return Math.round(data.az * 0.061035);
            case _6AxisState.GX:
                return Math.round(data.gx * 0.0076294) / 100;
            case _6AxisState.GY:
                return Math.round(data.gy * 0.0076294) / 100;
            case _6AxisState.GZ:
                return Math.round(data.gz * 0.0076294) / 100;
            case _6AxisState._6Temperature:
                return Math.round(data.temperature);
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
    let scaleFactor = 16384; // 对于±2g量程，默认比例因子
    let accelFlag = true;

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
        let configValue4 = 0x00;

        switch (range) {
            case ScaleRange.Range_2G:
                configValue4 = 0x00; // ±2g
                scaleFactor = 16384;
                break;
            case ScaleRange.Range_4G:
                configValue4 = 0x10; // ±4g
                scaleFactor = 8192;
                break;
            case ScaleRange.Range_8G:
                configValue4 = 0x30; // ±8g
                scaleFactor = 4096;
                break;
        }

        writeRegister3dh(configReg4, configValue4);
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

    //% blockId="Accel" block="Accelerometer sensor read %state value %Range"
    //% color=#00B1ED weight=5 group="IIC"
    export function AccelRead(state: AccelerometerState, Range: ScaleRange): number {
        if (accelFlag) {
            initAccel(Range); // 默认设置为±2g量程
            accelFlag = false;
        }

        let value = 0;
        switch (state) {
            case AccelerometerState.X:
                value = read16(0x28); // OUT_X_L and OUT_X_H
                break;
            case AccelerometerState.Y:
                value = read16(0x2A); // OUT_Y_L and OUT_Y_H
                break;
            case AccelerometerState.Z:
                value = read16(0x2C); // OUT_Z_L and OUT_Z_H
                break;
        }
        // 将原始数据转换为g-force
        let gForce = value / scaleFactor;

        // 将g-force转换为mg
        let mgForce = gForce * 1000;

        return Math.round(mgForce);
    }
}
