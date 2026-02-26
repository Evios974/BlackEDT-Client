const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Un client s\'est connecté.');

    // ws.on('message', (data) => {
    //     console.log('Message reçu : %s', data);
        
    //     ws.send("Message reçu");
    // });

    ws.emit('message', {Message: "lol"});

    ws.on('close', () => {
        console.log('Un client s\'est déconnecté.');
    });
});