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

    attachDownloadButton = (downloadButton) => {
        this.downloadButton = downloadButton;
        this.downloadButton.addEventListener('click', this.download)
    };

    download = (event) => {
        event.preventDefault();
        window.location.href = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    }

}
