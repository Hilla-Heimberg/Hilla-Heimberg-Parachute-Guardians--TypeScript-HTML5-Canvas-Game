// Author: Hilla Heimberg

import Plane from '../objects/Plane';
import Boat from '../objects/Boat';
import Parachutist from '../objects/Parachutist';
import CollisionHandler from './CollisionHandler';
import GameObject from '../objects/GameObject';
import GameCloser from './GameCloser';
import BoatController from './BoatController';

export default class GameLogic implements BoatController {
    private boardWidth: number;
    private boardHeight: number;
    private gameCloser: GameCloser;
    private plane: Plane;
    private boat: Boat;
    private parachutists: Parachutist[];
    private score: number;
    private lives: number;
    private collisionHandler: CollisionHandler;

    private static readonly INITIAL_SCORE: number = 0;
    private static readonly INITIAL_LIVES: number = 3;
    private static readonly CREATE_PARACHUTIST_PROBABILITY: number = 0.005;
    private static readonly BOAT_SPEED: number = 10;
    private static readonly PLANE_SPEED: number = 1;
    private static readonly ADDITIONAL_SCORE = 10;

    constructor(boardWidth: number, boardHeight: number, gameCloser: GameCloser) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.gameCloser = gameCloser;
        this.plane = new Plane(boardWidth, boardHeight);
        this.boat = new Boat(boardWidth, boardHeight);
        this.parachutists = [];
        this.score = GameLogic.INITIAL_SCORE;
        this.lives = GameLogic.INITIAL_LIVES;
        this.collisionHandler = new CollisionHandler();
    }

    public update(): void {
        this.updatePlaneLocation();
        this.dropParachutists();
        this.updateParachutists();
    }

    private updatePlaneLocation(): void {
        this.plane.setX(this.plane.getX() - GameLogic.PLANE_SPEED);
        if (this.plane.getX() < -this.plane.getWidth()) {
            this.plane.setX(this.boardWidth);
        }
    }

    private dropParachutists(): void {
        if (Math.random() < GameLogic.CREATE_PARACHUTIST_PROBABILITY && this.isLocationValid()){
            let parachutist = new Parachutist(this.plane.getX(), this.plane.getY() + this.plane.getHeight());
            this.parachutists.push(parachutist);
        }
    }

    private isLocationValid(): boolean {
        return this.plane.getX() > 0 && this.plane.getX() < this.boardWidth - this.plane.getWidth()
    }

    private updateParachutists(): void {
        for (let index = this.parachutists.length - 1; index >= 0; index--) { 
            const parachutist = this.parachutists[index];

            this.moveParachutistDownDependsScore(parachutist);   

            if (this.collisionHandler.checkCollision(this.boat, parachutist)) {
                this.handleCollisionWithBoat(index);
                return;
            } 
            else if (parachutist.getY() > this.boardHeight - parachutist.getHeight()) {
                this.handleCollisionWithSea(index);
                return;
            }
        }
    }

    private handleCollisionWithBoat(index: number): void {
        this.score += GameLogic.ADDITIONAL_SCORE;
        this.parachutists.splice(index, 1);
    }

    private handleCollisionWithSea(index: number): void {
        this.lives--;
        this.parachutists.splice(index, 1);
        this.checkIfLoss();
    }

    private checkIfLoss(): void {
        if (this.lives === 0) {
            this.gameOver();
        }
    }

    private moveParachutistDownDependsScore(parachutist: Parachutist): void {
        // using a linear interpolation approach to increase the speed of the parachutists as the score increases
        // formula to increase the speed by 1.0 for every 50 score points, starting from 0.5:
        let speed = 0.5 + Math.floor(this.score / 50) * 1.0;
        this.moveParachutistDown(parachutist, speed);
    }

    private moveParachutistDown(parachutist: Parachutist, speed: number): void {
        parachutist.setY(parachutist.getY() + speed);
    }

    private gameOver(): void {
        this.gameCloser.closeGame();
    }

    public getGameObjects(): GameObject[] {
        return [this.plane, this.boat, ...this.parachutists];
    }

    public getScore(): number {
        return this.score;
    }

    public getLives(): number {
        return this.lives;
    }

    public moveBoatLeft(): void {
        this.boat.setX(Math.max(this.boat.getX() - GameLogic.BOAT_SPEED, 0));
    }

    public moveBoatRight(): void {
        let rightEdge = this.boardWidth - this.boat.getWidth();
        this.boat.setX(Math.min(this.boat.getX() + GameLogic.BOAT_SPEED, rightEdge));
    }
}
