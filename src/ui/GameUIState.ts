// Author: Hilla Heimberg

import GameObject from '../objects/GameObject';

export default class GameUIState {
    private score: number;
    private lives: number;
    private gameObjects: GameObject[]

    constructor(gameObjects: GameObject[], score: number, lives: number) {
        this.score = score;
        this.lives = lives
        this.gameObjects = gameObjects;
    }

    public getScore(): number {
        return this.score;
    }

    public getLives(): number {
        return this.lives;
    }

    public getGameObjects(): GameObject[] {
        return this.gameObjects;
    }
}
