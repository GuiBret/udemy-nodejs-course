const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    
    if(url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My first page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    
    }
    
    if(url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            
            body.push(chunk);
        });
    
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
    
            
            fs.writeFile('myfile', message, (err) => { // Error handling will be treated later
                res.setHeader('Location', '/');
                res.statusCode = 302;
                return res.end();
            });    
    
            
        });
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Hello</h1></body>');
    res.write('</html>');
    res.end();

};

module.exports = requestHandler;
// module.exports = {
//     handler: requestHandler
// };