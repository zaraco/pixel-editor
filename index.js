class Color {
    red = 0;
    green = 0;
    blue = 0;
}

class Picker {

    dom = null

    color = new Color();

    constructor() {}

    attachDom(dom) {
        this.dom = dom
    }

    selectColor() {

    }

}

const picker = new Picker();
picker.attachDom(document.getElementById('picker'));
console.log(picker.dom)

