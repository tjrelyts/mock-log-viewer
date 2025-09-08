// Tyler Santosuosso

import { useEffect, useRef, useState } from 'react';

const LOG_COLORS = {
    INFO: 'bg-blue-400/50 text-white',
    WARN: 'bg-yellow-400/50 text-white',
    ERROR: 'bg-red-500/50 text-white',
};

export default function LogViewer() {
    const [logs, setLogs] = useState([]);
    const [paused, setPaused] = useState(false);
    const containerRef = useRef(null);
    const WS_URL = import.meta.env.VITE_WS_URL;
    const ws = useRef(null);

    useEffect(() => {
    ws.current = new WebSocket(WS_URL);
    ws.current.onmessage = (event) => {
        const log = JSON.parse(event.data);
        if (!paused) setLogs(prev => [...prev, log]);
    };
    return () => ws.current.close();
    }, [paused]);

    useEffect(() => {
        if (!paused && containerRef.current) {
            const container = containerRef.current;
            const isAtBottom =
                container.scrollHeight - container.scrollTop - container.clientHeight < 50;
            if (isAtBottom) {
                container.scrollTo({
                    top: container.scrollHeight,
                    behavior: 'smooth',
                });
            }
        }
    }, [logs, paused]);

    const handleClear = () => setLogs([]);
    const togglePause = () => setPaused((prev) => !prev);

    return (
        <div className="h-screen bg-gray-900 text-white p-4">
            <div className="flex flex-col h-full bg-gray-800 rounded-lg shadow-lg">
                {/* Controls */}
                <div className="flex gap-2 p-2">
                    <button
                        onClick={handleClear}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded shadow"
                    >
                        Clear Logs
                    </button>
                    <button
                        onClick={togglePause}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow"
                    >
                        {paused ? 'Resume' : 'Pause'}
                    </button>
                </div>

                {/* Log container */}
                <div
                    ref={containerRef}
                    className="log-container flex-1 overflow-y-auto p-2 rounded-lg"
                >
                    {logs.map((log, index) => (
                        <div
                            key={index}
                            className={`mb-1 p-2 font-mono text-sm rounded ${LOG_COLORS[log.level] || 'bg-gray-700 text-white'}`}
                        >
                            <span className="text-black font-bold">
                                [{new Date(log.timestamp).toLocaleTimeString()}]
                            </span>{' '}
                            <span className="font-bold">{log.level}</span> {log.message}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
