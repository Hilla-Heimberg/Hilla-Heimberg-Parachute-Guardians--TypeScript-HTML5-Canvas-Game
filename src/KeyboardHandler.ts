// Author: Hilla Heimberg

import BoatController from './logic/BoatController';

export default class KeyboardHandler {
    private boatController: BoatController;

    private static readonly ARROW_LEFT_KEY = 'ArrowLeft';
    private static readonly ARROW_RIGHT_KEY = 'ArrowRight';

    constructor(boatController: BoatController) {
        this.boatController = boatController;
    }

    public bindKeys(): void {
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    private handleKeyDown(e: KeyboardEvent): void {
        if (e.code === KeyboardHandler.ARROW_LEFT_KEY) {
            this.boatController.moveBoatLeft();
        } 
        else if (e.code === KeyboardHandler.ARROW_RIGHT_KEY) {
            this.boatController.moveBoatRight();
        }
    }
}
