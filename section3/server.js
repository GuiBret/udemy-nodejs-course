const http = require('http');



const server = http.createServer((req, res) => {
    console.log('Hello');
    process.exit();
});

server.listen(4000);