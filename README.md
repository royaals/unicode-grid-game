# Unicode Grid Game

A multiplayer web application that lets a player select and update a block with a Unicode character in a 10x10 grid. Once a player submits a character in the block, they will not able to update any block again. At any given time, a player will be able to see how many players are currently online. The grid is updated in real-time for other players connected.

### Features

- **Real-time grid updates**
- **Player count display**
- **Timed restriction**
- **Historical updates**

## Hosted Link

You can access the live application at [gamitar.devprojects.world](https://gamitar.devprojects.world).

## Tech Stack

- **Frontend:** ReactJS
- **State Management:** Zustand
- **Backend:** NodeJs (Express & Typescript)
- **WebSocket:** Socket.io

## Instructions to Run the Application

1. **Clone the repository:**

   ```bash
   git clone https://github.com/royaals/unicode-grid-game.git
   cd unicode-grid-game
   ```

2. **Run the backend server:**

   ```bash
   cd server
   npm install
   npm run server
   ```

3. **Run the frontend application:**

   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:5173
   ```



