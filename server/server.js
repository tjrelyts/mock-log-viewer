// Tyler Santosuosso
// Test

import { WebSocketServer } from "ws";
import { LogGenerator } from "./logGenerator.js";

const PORT = process.env.PORT || 8080;
const INTERVAL = Number(process.env.INTERVAL || 1000);

const wss = new WebSocketServer({ port: PORT });
const logGenerator = new LogGenerator();

function broadcast(log) {
    const data = JSON.stringify(log);
    for (const client of wss.clients) {
        if (client.readyState === client.OPEN) {
            client.send(data);
        }
    }
}

wss.on('connection', (ws) => {
    ws.send(
        JSON.stringify({
            level: 'INFO',
            message: 'Connected to mock log server',
            timestamp: new Date().toISOString()
        })
    );
});

setInterval(() => {
    const log = logGenerator.generateLog();
    broadcast(log);
}, INTERVAL);

console.log(`WebSocket server is running on ws://localhost:${PORT}`);