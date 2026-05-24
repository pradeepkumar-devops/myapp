const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`
        <html>
            <head><title>MyApp</title></head>
            <body style="font-family: Arial; text-align: center; padding: 50px; background: #f0f0f0;">
                <h1 style="color: green;">✅ CI/CD Pipeline Working!</h1>
                <h2>Version 2.0</h2>
                <p>Deployed via Jenkins + Docker</p>
                <p>Server Time: ${new Date().toLocaleString()}</p>
                <p>Host: ${require('os').hostname()}</p>
            </body>
        </html>
    `);
    res.end();
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
    console.log("Version 2.0 - Deployed via Jenkins CI/CD");
});
