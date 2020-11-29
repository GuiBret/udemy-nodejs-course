const routesHandler = (req, res) => {
    const url = req.url;
    const method = req.url;

    res.setHeader('Content-Type', 'text/html');
    // Sends back a simple greeting
    if(url === '/') {
        res.write('<h2>Hello from my Node server</h2>');
    } else if(url === '/users') { // Sends a dummy user list
        res.write('<h1>My user list</h1>');
        res.write('<ul><li>User 1</li><li>User 2</li></ul>');
    }

    res.end();

}

module.exports = routesHandler;