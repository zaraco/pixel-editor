// painting grid component
class Grid {

    // initial size of the grid
    width = 16;
    height = 16;

    // init painting grid
    constructor(app) {
        this.app = app
    }

    // attach painting canvas DOM
    attachCanvas = (canvas) => {
        this.canvas = canvas;
        this.canvasContext = canvas.getContext("2d");
        this.canvas.addEventListener('click', this.onClick);
        this.canvas.addEventListener("mousedown", this.onMouseDown);
        this.canvas.addEventListener("mouseup", this.onMouseUp);
        this.canvas.addEventListener("mousemove", this.onMouseMove);
        this.generateGrid()
    };

    // attach width input DOM
    attachWidthInput = (widthInput) => {
        this.widthInput = widthInput;
        this.widthInput.value = this.width;
        this.widthInput.addEventListener('change', this.onWidthChange);
    };

    // attach height input DOM
    attachHeightInput = (heightInput) => {
        this.heightInput = heightInput;
        this.heightInput.value = this.height;
        this.heightInput.addEventListener('change', this.onHeightChange);
    };

    // width input change listener
    onWidthChange = (event) => {
        this.width = parseInt(event.target.value);
        this.generateGrid();
    };

    // height input change listener
    onHeightChange = (event) => {
        this.height = parseInt(event.target.value);
        this.generateGrid();
    };

    // generate the painting grid canvas based on the width and height sizes
    generateGrid = () => {
        this.canvasContext.beginPath();
        this.canvasContext.fillStyle = "white";
        this.canvasContext.lineWidth = 1;
        this.canvasContext.strokeStyle = '#eee';
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

    // calculates each cell height
    cellHeight = () => {
        return this.canvas.height / this.height
    };

    // calculates each cell width
    cellWidth = () => {
        return this.canvas.width / this.width
    };

    // painting canvas click listener
    onClick = (event) => {
        this.canvasContext.fillStyle = this.app.getSelectedColor().returnRgba();
        this.canvasContext.fillRect(Math.floor(event.offsetX/this.cellWidth())*this.cellWidth(),
            Math.floor(event.offsetY/this.cellHeight())*this.cellHeight(),
            this.cellWidth(), this.cellHeight());
    };

    // mouse down listener of the painting canvas
    onMouseDown = (e) => {
        this.isMouseDown = true;
    };

    // mouse down listener of the painting canvas
    onMouseUp = (e) => {
        this.isMouseDown = false;
    };

    // mouse move listener of the painting canvas
    onMouseMove = (e) => {
        if (this.isMouseDown) this.onClick(e);
    };

    // attach download button DOM
    attachDownloadButton = (downloadButton) => {
        this.downloadButton = downloadButton;
        this.downloadButton.addEventListener('click', this.download)
    };

    // download button listener
    download = (event) => {
        event.preventDefault();
        window.location.href = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    };

    // attach reset button DOM
    attachResetButton = (resetButton) => {
        this.resetButton = resetButton;
        this.resetButton.addEventListener('click', this.reset)
    };

    // reset button listener
    reset = (event) => {
        event.preventDefault();
        this.generateGrid()
    }

}
