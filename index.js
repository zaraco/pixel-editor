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

    colors = [];
    width = 16;
    height = 16;

    constructor(app) {
        this.app = app
    }

    attachGrid = (grid) => {
        this.grid = grid;
        this.generateGrid()
    };

    generateGrid = () => {
        let s = '';
        for (let j = 0; j < this.height; j++) {
            s += '<div class="row">';
            for (let i = 0; i < this.width; i++) {
                s += `<div class="cell" data-x="${i}" data-y="${j}"></div>`;
            }
            s += '</div>';
        }
        this.grid.innerHTML = s;
        let elements = document.getElementsByClassName('cell');
        Array.from(elements).forEach((element) => {
            element.addEventListener('click', this.onClick);
        });
    };

    onClick = (event) => {
        // this.colors[event.target.dataset.x][event.target.dataset.y] = this.app.getSelectedColor();
        event.target.style.backgroundColor = this.app.getSelectedColor().returnRgba();
    };

    changeSize = (width, height) => {
        this.width = width;
        this.height = height;
        this.generateGrid()
    }

}

class App {
    constructor() {
        this.picker = new Picker(this);
        this.grid = new Grid(this);
        this.picker.attachCanvas(document.getElementById('picker'));
        this.picker.attachColorBox(document.getElementById('color-box'));
        this.grid.attachGrid(document.getElementById('grid'));
    }

    getSelectedColor = () => {
        return this.picker.selectedColor
    }

    getGridColors = () => {
        return this.grid.colors
    }
}

const app = new App();
