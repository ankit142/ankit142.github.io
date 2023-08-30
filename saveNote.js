const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const url = require('url');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url);

    if (pathname === '/' && req.method === 'GET') {
        // Read the HTML file
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading HTML file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (pathname === '/style.css' && req.method === 'GET') {
        // Serve the CSS file
        fs.readFile('style.css', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading CSS file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    } else if (pathname === '/script.js' && req.method === 'GET') {
        // Serve the JavaScript file
        fs.readFile('script.js', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading JavaScript file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(data);
            }
        });
    } else if (pathname === '/save' && req.method === 'POST') {
        let requestBody = '';
        req.on('data', (chunk) => {
            requestBody += chunk.toString();
        });
        req.on('end', () => {
            const parsedData = querystring.parse(requestBody);
            const userInput = parsedData.userInput;

            // Save the user input to a file (or database)
            fs.writeFile('userInput.txt', userInput, (err) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error saving user input');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('User input saved successfully');
                }
            });
        });
    } else if (pathname === '/load' && req.method === 'GET') {
        // Read the saved user input from the file (or database)
        fs.readFile('userInput.txt', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading user input');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404);
        res.end('Page not found');
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
