// Author: Hilla Heimberg

import GameObject from "./GameObject";

export default class Plane extends GameObject {
    private static readonly HEIGHT_RATIO: number = 0.08333;
    private static readonly IMAGE_SRC: string = 'resources/plane.png';

    constructor(boardWidth: number, boardHeight: number) {
        super(boardWidth, Plane.HEIGHT_RATIO * boardHeight, Plane.IMAGE_SRC);
    }
}
