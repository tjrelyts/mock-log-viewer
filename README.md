# Mock Log Viewer

A full-stack, containerized log viewer app for real-time log streaming and visualization.

## Features
- Real-time log streaming via WebSocket
- Multi-level log display (INFO, WARN, ERROR)
- Pause/resume and clear log controls
- Modern UI with Tailwind CSS
- Multi-service Docker setup (client + server)

## Project Structure
```
mock-log-viewer/
├── client/        # React + Vite frontend
├── server/        # Node.js WebSocket log server
├── docker-compose.yml
```

## Getting Started

### Prerequisites
- Docker & Docker Compose

### Build and Run (Recommended)
```sh
docker-compose up --build
```
- Client: http://localhost:3000
- Server: ws://localhost:8080

### Development (Manual)
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
- Client: `client/.env`
  - `VITE_WS_URL=ws://localhost:8080`

## Troubleshooting
- If the client cannot connect to the WebSocket, ensure `VITE_WS_URL` is set correctly in `.env` and copied during Docker build.
- For YAML errors, check indentation in `docker-compose.yml`.
