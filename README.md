# Unicode Grid Game

a multiplayer web application that lets a player select and update a block with a Unicode character in a 10x10 grid. Once a player submits a character in the block, they should not be able to update any block again. At any given time, a player will be able to see how many players are currently online. The grid must be updated in real-time for other players connected.

### Features

- **Timed Restriction:** After the player submits, they get a 1-minute restriction to update. After the timed restriction passes, they can update again.
- **Historical Updates:** Include the ability to go back in time to see all the updates made to the grid.

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

## Project Structure

```
/unicode-grid-game
├── server
│   ├── src
│   │   ├── config
│   │   ├── managers
│   │   ├── socket
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── client
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── hooks
│   │   ├── services
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
├── README.md
└── package.json
```
