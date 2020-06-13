// picker slider component
class Picker {

    // initial selected color
    selectedColor = new Color(0, 200, 255, 1);

    // init picker slider component
    constructor(app) {
        this.app = app
    }

    // attach picker slider canvas DOM
    attachCanvas = (canvas) => {
        this.canvas = canvas;
        this.canvasContext = canvas.getContext('2d');
        this.generatePicker();
        canvas.addEventListener("click", this.onClick)
    };

    // attach selected color box DOM
    attachColorBox = (colorBox) => {
        this.colorBox = colorBox;
        this.updateColorBox()
    };

    // click listener of the picker slider
    onClick = (e) => {
        let xPosition = (e.offsetX / this.canvas.clientWidth) * this.canvas.width;
        let yPosition = (e.offsetY / this.canvas.clientHeight) * this.canvas.height;
        let imageData = this.canvasContext.getImageData(xPosition, yPosition, 1, 1);
        this.selectedColor.update(imageData.data[0], imageData.data[1], imageData.data[2], imageData.data[3] / 255);
        this.updateColorBox()
    };

    // change selected color in DOM
    updateColorBox = () => {
        this.colorBox.style.backgroundColor = this.selectedColor.returnRgba();
        this.colorBox.innerHTML = this.selectedColor.returnHex();

    };

    // create the wide RGB color in picker slider canvas
    generatePicker = () => {
        let mainColors = [
            new Color(255, 0, 0, 1),
            new Color(255, 255, 0, 1),
            new Color(0, 255, 0, 1),
            new Color(0, 255, 255, 1),
            new Color(0, 0, 255, 1),
            new Color(255, 0, 255, 1),
            new Color(255, 0, 0, 1)
        ];
        this.generateGradient(mainColors, 0, 0, 0, this.canvas.height);

        let lightColors = [
            new Color(255, 255, 255, 0),
            new Color(255, 255, 255, 0),
            new Color(255, 255, 255, 1)
        ];
        this.generateGradient(lightColors, 0, 0, this.canvas.width, 0);

        let darkColors = [
            new Color(0, 0, 0, 1),
            new Color(0, 0, 0, 0),
            new Color(0, 0, 0, 0)
        ];
        this.generateGradient(darkColors, 0, 0, this.canvas.width, 0);
    };

    // create a gradient (useful for creating the picker slider wide RGB colors)
    generateGradient = (colors, x0, y0, x1, y1) => {
        let gradient = this.canvasContext.createLinearGradient(x0, y0, x1, y1);
        for (let i = 0; i < colors.length; i++) {
            gradient.addColorStop((i / (colors.length - 1)), colors[i].returnRgba());
        }
        this.canvasContext.fillStyle = gradient;
        this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
