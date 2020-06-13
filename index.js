class Color {
    red = 0;
    green = 0;
    blue = 0;
}

class Picker {

    dom = null;

    color = new Color();

    constructor() {}

    attachDom = (dom) => {
        this.dom = dom;
        dom.addEventListener("click", this.onClick)
    };

    onClick = (event) => {
        let rect = event.target.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
    };

    selectColor = (x, y) => {

    };


}

const picker = new Picker();
picker.attachDom(document.getElementById('picker'));

