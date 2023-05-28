var http = require("http");

const PORT=8081;
const httpServer = http.createServer(handleServer);

function handleServer(req, res) {
    if (req.url === '/welcome') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to Dominos!')
    }
    else if (req.url === '/contact') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const info = {
            phone: '18602100000',
            email: 'guestcaredominos@jublfood.com'
        }
        res.end(JSON.stringify(info))
        // res.end(info)
    }
    else{
        res.writeHead(404);
        res.end();
    }
}

httpServer.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
});

// module.exports = httpServer;