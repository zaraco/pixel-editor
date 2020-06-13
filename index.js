class Color {
    constructor(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    update(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    returnRgba = () => {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
    };

    returnHex = () => {
        return '#' + [this.red, this.green, this.blue].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex
        }).join('')
    };

}

class Picker {

    selectedColor = new Color(255, 255, 255, 1);

    constructor(app) {
        this.app = app
    }

    attachCanvas = (canvas) => {
        this.canvas = canvas;
        this.canvasContext = canvas.getContext('2d');
        this.generatePicker();
        canvas.addEventListener("click", this.onClick)
    };

    attachColorBox = (colorBox) => {
        this.colorBox = colorBox;
        this.updateColorBox()
    };

    onClick = (e) => {
        let xPosition = (e.offsetX / this.canvas.clientWidth) * this.canvas.width;
        let yPosition = (e.offsetY / this.canvas.clientHeight) * this.canvas.height;
        let imageData = this.canvasContext.getImageData(xPosition, yPosition, 1, 1);
        this.selectedColor.update(imageData.data[0], imageData.data[1], imageData.data[2], imageData.data[3] / 255);
        this.updateColorBox()
    };

    updateColorBox = () => {
        this.colorBox.style.backgroundColor = this.selectedColor.returnRgba();
        this.colorBox.innerHTML = this.selectedColor.returnHex();

    };

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

    generateGradient = (colors, x0, y0, x1, y1) => {
        let gradient = this.canvasContext.createLinearGradient(x0, y0, x1, y1);
        for (let i = 0; i < colors.length; i++) {
            gradient.addColorStop((i / (colors.length - 1)), colors[i].returnRgba());
        }
        this.canvasContext.fillStyle = gradient;
        this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class Grid {

    width = 16;
    height = 16;

    constructor(app) {
        this.app = app
    }

    attachCanvas = (canvas) => {
        this.canvas = canvas;
        this.canvasContext = canvas.getContext("2d");
        this.canvas.addEventListener('click', this.onClick);
        this.generateGrid()
    };

    attachWidthInput = (widthInput) => {
        this.widthInput = widthInput;
        this.widthInput.value = this.width;
        this.widthInput.addEventListener('change', this.onWidthChange);
    };

    attachHeightInput = (heightInput) => {
        this.heightInput = heightInput;
        this.heightInput.value = this.width;
        this.heightInput.addEventListener('change', this.onHeightChange);
    };

    onWidthChange = (event) => {
        this.width = parseInt(event.target.value);
        this.generateGrid();
    };

    onHeightChange = (event) => {
        this.height = parseInt(event.target.value);
        this.generateGrid();
    };

    generateGrid = () => {
        this.canvasContext.beginPath();
        this.canvasContext.fillStyle = "white";
        this.canvasContext.lineWidth = 1;
        this.canvasContext.strokeStyle = 'black';
        for (let row = 0; row < this.height; row++) {
            for (let column = 0; column < this.width; column++) {
                let x = column * this.cellWidth();
                let y = row * this.cellHeight();
                this.canvasContext.rect(x, y, this.cellWidth(), this.cellHeight());
                this.canvasContext.fill();
                this.canvasContext.stroke();
            }
        }
        this.canvasContext.closePath();
    };

    cellHeight = () => {
        return this.canvas.height / this.height
    };

    cellWidth = () => {
        return this.canvas.width / this.width
    };

    onClick = (event) => {
        this.canvasContext.fillStyle = this.app.getSelectedColor().returnRgba();
        this.canvasContext.fillRect(Math.floor(event.offsetX/this.cellWidth())*this.cellWidth(),
            Math.floor(event.offsetY/this.cellHeight())*this.cellHeight(),
            this.cellWidth(), this.cellHeight());
    };

    download = () => {
        let link = document.createElement('image');
        link.download = 'image.png';
        link.href = this.canvas.toDataURL();
        link.click();
    }

}

class App {
    constructor() {
        this.picker = new Picker(this);
        this.grid = new Grid(this);
        this.picker.attachCanvas(document.getElementById('picker'));
        this.picker.attachColorBox(document.getElementById('color-box'));
        this.grid.attachCanvas(document.getElementById('grid'));
        this.grid.attachWidthInput(document.getElementById('width'));
        this.grid.attachHeightInput(document.getElementById('height'));
    }

    getSelectedColor = () => {
        return this.picker.selectedColor
    };
}

const app = new App();
