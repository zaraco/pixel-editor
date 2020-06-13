class App {
    constructor() {
        this.picker = new Picker(this); // init the picker slider
        this.grid = new Grid(this); // init the painting grid

        // attach DOMs to the picker
        this.picker.attachCanvas(document.getElementById('picker'));
        this.picker.attachColorBox(document.getElementById('color-box'));

        // attach DOMs to the grid
        this.grid.attachCanvas(document.getElementById('grid'));
        this.grid.attachWidthInput(document.getElementById('width'));
        this.grid.attachHeightInput(document.getElementById('height'));
        this.grid.attachDownloadButton(document.getElementById('download'));
    }

    getSelectedColor = () => {
        return this.picker.selectedColor
    };
}

const app = new App();
