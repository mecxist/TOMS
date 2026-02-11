#!/usr/bin/env node

/**
 * Find next available port sequentially
 * Tries ports starting from the specified port until one is available
 */

const net = require('net');

function isPortAvailable(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        
        server.listen(port, () => {
            server.once('close', () => resolve(true));
            server.close();
        });
        
        server.on('error', () => resolve(false));
    });
}

async function findAvailablePort(startPort = 3000, maxAttempts = 100) {
    for (let i = 0; i < maxAttempts; i++) {
        const port = startPort + i;
        const available = await isPortAvailable(port);
        if (available) {
            return port;
        }
    }
    throw new Error(`Could not find available port after ${maxAttempts} attempts`);
}

if (require.main === module) {
    const startPort = parseInt(process.argv[2] || '3000', 10);
    findAvailablePort(startPort)
        .then(port => {
            console.log(port);
            process.exit(0);
        })
        .catch(error => {
            console.error(error.message);
            process.exit(1);
        });
}

module.exports = { findAvailablePort, isPortAvailable };
