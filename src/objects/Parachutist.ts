// Author: Hilla Heimberg

import GameObject from "./GameObject";

export default class Parachutist extends GameObject {
    private static readonly IMAGE_SRC: string = 'resources/parachutist.png';

    constructor(x: number, y: number) {
        super(x, y, Parachutist.IMAGE_SRC);
    }
}
