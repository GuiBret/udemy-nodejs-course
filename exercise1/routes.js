const { resolveSoa } = require("dns");

const routesHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    

    res.setHeader('Content-Type', 'text/html');
    // Sends back a simple greeting
    if(url === '/') {
        res.write('<h2>Hello from my Node server</h2>');
        res.write('<html><body><form method="POST" action="/create-user"><input type="text" name="username" /><input type="submit"/></form></body></html>');
        res.end();
    } else if(url === '/users') { // Sends a dummy user list
        res.write('<h1>My user list</h1>');
        res.write('<ul><li>User 1</li><li>User 2</li></ul>');
        res.end();
    } else if(url === '/create-user' && method === 'POST') { // Handles the POST request created by / and logs the result in the console
        const formData = [];

        req.on('data', (chunk) => {
            
            formData.push(chunk);
        });

        req.on('end', () => {
            const message = Buffer.concat(formData).toString().split('=')[1];
            console.log(message);

            
            res.setHeader('Location', '/');
            res.statusCode = 302;
            return res.end();
        });
        
    }

    

}

module.exports = routesHandler;