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
