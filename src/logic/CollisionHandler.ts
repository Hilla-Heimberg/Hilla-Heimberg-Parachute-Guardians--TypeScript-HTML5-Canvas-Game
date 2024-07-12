// Author: Hilla Heimberg

import GameObject from "../objects/GameObject";

export default class CollisionHandler {
    public checkCollision(object1: GameObject, object2: GameObject): boolean {
        // determines if two rectangular game objects overlap in a 2D space using the AABB (Axis-Aligned Bounding Box) 
        // collision detection algorithm
        return (
            // checks if the left edge of object1 is to the left of the right edge of object2.
            object1.getX() < object2.getX() + object2.getWidth() &&
            // This checks if the right edge of object1 is to the right of the left edge of object2.
            object1.getX() + object1.getWidth() > object2.getX() &&
            // This checks if the top edge of object1 is above the bottom edge of object2.
            object1.getY() < object2.getY() + object2.getHeight() &&
            //This checks if the bottom edge of object1 is below the top edge of object2.
            object1.getY() + object1.getHeight() > object2.getY()
        );
    }
}
