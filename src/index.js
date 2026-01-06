'use strict';

const express = require('express');
const helmet = require('helmet');
const os = require('os');

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const INFO_MESSAGE = process.env.INFO_MESSAGE || 'Empty Info Message';
const HOST = process.env.HOST || '0.0.0.0';

const app = express();
app.use(helmet());
app.disable('x-powered-by');

app.get('/health', (_req, res) => res.status(200).json({ message: 'OK' }));

app.get('/api/v1/info', (_req, res) => {
    res.json({
        message: INFO_MESSAGE,
        timestamp: new Date().toISOString(),
        hostname: os.hostname(),
        trigger: '0002',
    });
});

const server = app.listen(PORT, HOST, () => {
    console.log(`Service listening on ${HOST}:${PORT} (NODE_ENV=${process.env.NODE_ENV || 'development'})`);
});

const shutdown = () => {
    console.log('Shutting down gracefully');
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10000);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
