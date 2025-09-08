# Mock Log Viewer

A full-stack, containerized log viewer app for real-time log streaming and visualization.

## Features

- Real-time log streaming via WebSocket
- Multi-level log display (INFO, WARN, ERROR)
- Pause/resume and clear log controls
- Modern UI with Tailwind CSS
- Multi-service Docker setup (client + server)
- **Pre-commit linting enforced via Husky** (runs `npm run lint` before each commit)
- **GitHub Actions CI** builds Docker images for both server and client on every push
- ESLint integration for code quality

## Architecture

- **Server**: Node.js WebSocket server ([server/server.js](server/server.js)) generates and streams mock log messages using [`LogGenerator`](server/logGenerator.js).
- **Client**: React + Vite frontend ([client/src/LogViewer.jsx](client/src/LogViewer.jsx)) displays logs in real time, with controls for pausing/resuming and clearing logs.
- **Docker**: Multi-container setup via [docker-compose.yml](docker-compose.yml) for easy deployment.

## Project Structure

```
mock-log-viewer/
├── client/        # React + Vite frontend
│   ├── src/
│   │   ├── LogViewer.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── Dockerfile
│   ├── vite.config.js
│   └── .env
├── server/        # Node.js WebSocket log server
│   ├── server.js
│   ├── logGenerator.js
│   └── Dockerfile
├── docker-compose.yml
├── .github/workflows/ci.yml
├── .husky/pre-commit
└── README.md
```

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started) & [Docker Compose](https://docs.docker.com/compose/)
- (For manual development) [Node.js](https://nodejs.org/) v20+

### Quick Start (Docker)

Build and run both services:

```sh
docker-compose up --build
```

- **Client**: http://localhost:3000
- **Server**: ws://localhost:8080

### Manual Development

#### Server

```sh
cd server
npm install
npm start
```

#### Client

```sh
cd client
npm install
npm run dev
```

## Environment Variables

- **Client**: [client/.env](client/.env)
  - `VITE_WS_URL=ws://localhost:8080` (WebSocket server URL)

## Usage

- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Logs will stream in real time.
- Use the **Pause/Resume** button to stop/start log updates.
- Use the **Clear Logs** button to clear the log display.

## Testing & Linting

- **Lint (client/server):**
  ```sh
  npm run lint --prefix client
  npm run lint --prefix server
  ```
- **Auto-fix:**
  ```sh
  npm run lint:fix --prefix client
  npm run lint:fix --prefix server
  ```

## Troubleshooting

- If the client cannot connect to the WebSocket, ensure `VITE_WS_URL` is set correctly in `.env` and copied during Docker build.
- Make sure ports `3000` (client) and `8080` (server) are not blocked.
