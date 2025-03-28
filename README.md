
> 在 [https://zy2516.github.io/pxt-petal/](https://zy2516.github.io/pxt-text/) 打开此页面

## 用作扩展

此仓库可以作为 **插件** 添加到 MakeCode 中。

* 打开 [https://makecode.microbit.org/](https://makecode.microbit.org/)
* 点击 **新项目**
* 点击齿轮图标菜单下的 **扩展**
* 搜索 **https://github.com/zy2516/pxt-petal** 并导入

## Code Example
```JavaScript

basic.forever(function () {
    PlanetX.showUserText(1, "Temp:" + PlanetX.octopus_BME280(PlanetX.BME280_state.BME280_temperature_C))
    PlanetX.showUserText(2, "Distance:" + PlanetX.Ultrasoundsensor(PlanetX.DigitalRJPin.J1, PlanetX.Distance_Unit_List.Distance_Unit_cm))
    if (PlanetX.buttonAB(PlanetX.DigitalRJPin.J1, PlanetX.ButtonStateList.A)) {
        PlanetX.motorfan(PlanetX.AnalogRJPin.J1, true, 80)
    }
})

#### 元数据（用于搜索、渲染）

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
