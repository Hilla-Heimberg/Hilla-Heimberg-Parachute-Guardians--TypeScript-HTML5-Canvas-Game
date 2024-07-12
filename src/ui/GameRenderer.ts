// Author: Hilla Heimberg

import GameObject from '../objects/GameObject';
import GameUIState from './GameUIState';

export default class GameRenderer {
    private context: CanvasRenderingContext2D;
    private backgroundImage: HTMLImageElement;
    private seaImage: HTMLImageElement;

    private static readonly BACKGROUND_IMAGE_SRC: string = '/resources/background.png';
    private static readonly SEA_IMAGE_SRC: string = '/resources/sea.png';
    private static readonly SEA_HEIGHT_RATIO: number = 0.18333;
    private static readonly FONT_COLOR: string = 'white';
    private static readonly FONT_STYLE: string = '24px Arial';
    private static readonly SCORE_TEXT_WIDTH_RATIO: number = 0.0125;
    private static readonly SCORE_TEXT_HEIGHT_RATIO: number = 0.05;
    private static readonly LIVES_TEXT_WIDTH_RATIO: number = 0.0125;
    private static readonly LIVES_TEXT_HEIGHT_RATIO: number = 0.1;

    constructor(canvasId: string) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.context = canvas.getContext('2d')!;
        this.backgroundImage = new Image();
        this.backgroundImage.src = GameRenderer.BACKGROUND_IMAGE_SRC;
        this.seaImage = new Image();
        this.seaImage.src = GameRenderer.SEA_IMAGE_SRC;
    }

    public render(gameUIstate: GameUIState): void {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.renderConstantView();
        this.renderGameObjects(gameUIstate.getGameObjects());
        this.renderScoreAndLives(gameUIstate.getScore(), gameUIstate.getLives());
    }

    public getCanvasWidth(): number{
        return this.context.canvas.width;
    }

    public getCanvasHeight(): number{
        return this.context.canvas.height;
    }

    private renderConstantView(): void {
        this.context.drawImage(
            this.backgroundImage,
            0,
            0,
            this.context.canvas.width,
            this.context.canvas.height);
        this.context.drawImage(
            this.seaImage,
            0,
            this.context.canvas.height - this.seaImage.height + GameRenderer.SEA_HEIGHT_RATIO * this.context.canvas.height,
            this.context.canvas.width,
            this.seaImage.height);
    }

    private renderGameObjects(gameObjects: GameObject[]): void {
        gameObjects.forEach(object => 
            this.context.drawImage(object.getImage(), object.getX(), object.getY())
        );
    }

    private renderScoreAndLives(score: number, lives: number): void {
        this.context.fillStyle = GameRenderer.FONT_COLOR;
        this.context.font = GameRenderer.FONT_STYLE;
        this.context.fillText(
            `Score: ${score}`,
            GameRenderer.SCORE_TEXT_WIDTH_RATIO * this.context.canvas.width,
            GameRenderer.SCORE_TEXT_HEIGHT_RATIO * this.context.canvas.height
        );
        this.context.fillText(
            `Lives: ${lives}`,
            GameRenderer.LIVES_TEXT_WIDTH_RATIO * this.context.canvas.width,
            GameRenderer.LIVES_TEXT_HEIGHT_RATIO * this.context.canvas.height
        );
    }
}
