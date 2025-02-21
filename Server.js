const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Servidor WebSocket funcionando');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');
  
  ws.on('message', (data) => {
    const parsedData = JSON.parse(data); // Parsear el mensaje recibido
    const username = parsedData.username;
    const message = parsedData.message;
    
    console.log(`Mensaje de ${username}: ${message}`);
    
    ws.send(`De ${username}: ${message}`);
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(3000, () => {
  console.log('Servidor WebSocket corriendo en ws://localhost:3000');
});