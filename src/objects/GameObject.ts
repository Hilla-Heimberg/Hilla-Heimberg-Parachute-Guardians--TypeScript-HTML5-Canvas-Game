// Author: Hilla Heimberg

export default abstract class GameObject {
    protected x: number;
    protected y: number;
    protected image: HTMLImageElement;

    constructor(x: number, y: number, imageSrc: string) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    public getX(): number {
        return this.x;
    }

    public getImage(): HTMLImageElement {
        return this.image;
    }

    public getY(): number {
        return this.y;
    }

    public setX(x: number): void {
        this.x = x;
    }

    public setY(y: number): void {
        this.y = y;
    }

    public getWidth(): number {
        return this.image.width;
    }

    public getHeight(): number {
        return this.image.height;
    }
}
