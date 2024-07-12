// Author: Hilla Heimberg

import GameObject from "./GameObject";

export default class Boat extends GameObject {
    private static readonly WIDTH_RATIO: number = 0.125;
    private static readonly HEIGHT_RATIO: number = 0.3666;
    private static readonly IMAGE_SRC: string = 'resources/boat.png';

    constructor(boardWidth: number, boardHeight: number) {
        super(Boat.WIDTH_RATIO * boardWidth, boardHeight - Boat.HEIGHT_RATIO * boardHeight, Boat.IMAGE_SRC);
    }
}
