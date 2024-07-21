# Parachute Guardians - TypeScript & HTML5 Canvas Game

## Author & Subject

**Hilla Heimberg**  
Parachute Guardians - TypeScript & HTML5 Canvas Game

## Explanation of the Game

The player must catch the parachutists before they fall into the water. Each successful catch awards points, while missing a catch costs lives. The goal is to accumulate as many points as possible and avoid losing.

## Folders & Files Description

### `src` Folder

The root directory:

- **`main.ts`** - Entry point of the application.
- **`GameManager.ts`** - Manages the overall game state and flow.
- **`KeyboardHandler.ts`** - Class for handling keyboard inputs.

#### `objects` Folder

Folder for game object classes:

- **`GameObject`** - Abstract class for all game objects.
- **`Boat`** - Represents the boat object and extends from `GameObject` class.
- **`Plane`** - Represents the plane object and extends from `GameObject` class.
- **`Parachutist`** - Represents the parachutist object and extends from `GameObject` class.

#### `logic` Folder

Folder for game logic classes and related interfaces:

- **`GameLogic`** - Responsible for the game's core logic.
- **`BoatController`** - Interface for controlling boats.
- **`CollisionHandler`** - Handles collision detection.
- **`GameCloser.ts`** - Interface that `GameManager` implements, responsible for closing the game.

#### `ui` Folder

Folder for UI-related classes:

- **`GameUIState`** - Represents the state of the game's UI.
- **`GameRenderer`** - Responsible for rendering the game's UI.

## Design and Implementation Details

### Design Decisions

1. **Separation of Concerns:** 
    - Logic, objects, and UI are separated to ensure independence and decoupling.
    - `GameManager` class manages the entire game, aware of both `GameLogic` and `GameRenderer` classes, while each is unaware of the other.

2. **Single Responsibility Principle:**
    - Each class has one role and responsibility.

3. **Game Object Classes:**
    - Created classes for each game object for easier future functionality addition.

4. **Increasing Difficulty:**
    - Added a function to increase the parachutist's descent speed as the score increases, making the game more challenging and fun.

5. **UI State Management:**
    - `GameRenderer` receives `GameUIState` in its render function to make rendering independent of logic.

6. **Game Closing Mechanism:**
    - `GameManager` implements `GameCloser` interface, passed to `GameLogic` constructor, ensuring the logic is unaware of `GameManager`.

7. **Boat Movement:**
    - `GameLogic` implements `BoatController` interface, passed to `KeyboardHandler` constructor, ensuring keyboard handling is aware only of the movement interface.

## Screenshots

![Screenshot 1](/Screenshot1.png)

![Screenshot 2](/Screenshot2.png)

## Notes

HAVE A GOOD DAY :D
