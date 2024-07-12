// Author: Hilla Heimberg

import GameUIState from './ui/GameUIState';
import GameRenderer from './ui/GameRenderer';
import KeyboardHandler from './KeyboardHandler';
import GameLogic from './logic/GameLogic';
import GameCloser from './logic/GameCloser';

export default class GameManager implements GameCloser {
    private gameRenderer: GameRenderer;
    private gameLogic: GameLogic;
    private keyboardHandler: KeyboardHandler;

    private static readonly GAME_OVER_MESSAGE: string = "Game Over!";

    constructor(canvasId: string) {
        this.gameRenderer = new GameRenderer(canvasId);
        this.gameLogic = new GameLogic(this.gameRenderer.getCanvasWidth(), this.gameRenderer.getCanvasHeight(), this);
        this.keyboardHandler = new KeyboardHandler(this.gameLogic);
    }

    public init(): void {
        this.keyboardHandler.bindKeys();
        this.gameLoop();
    }

    private gameLoop(): void {
        this.gameLogic.update();
        let gameUIstate = new GameUIState(this.gameLogic.getGameObjects(), this.gameLogic.getScore(), this.gameLogic.getLives());
        this.gameRenderer.render(gameUIstate);
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    public closeGame(): void {
        alert(GameManager.GAME_OVER_MESSAGE);
        window.location.reload();
    }
}
