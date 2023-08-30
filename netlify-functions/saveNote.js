const { parse } = require('querystring');
const fs = require('fs');

exports.handler = async (event, context) => {
    const { path, httpMethod, body } = event;
    let statusCode = 200;
    let responseBody = '';

    if (path === '/style.css' && httpMethod === 'GET') {
        // Serve the CSS file
        try {
            const css = fs.readFileSync('./style.css', 'utf8');
            responseBody = css;
        } catch (error) {
            statusCode = 500;
            responseBody = 'Error loading CSS file';
        }
    } else if (path === '/script.js' && httpMethod === 'GET') {
        // Serve the JavaScript file
        try {
            const js = fs.readFileSync('./script.js', 'utf8');
            responseBody = js;
        } catch (error) {
            statusCode = 500;
            responseBody = 'Error loading JavaScript file';
        }
    } else if (path === '/load' && httpMethod === 'GET') {
        // Read the saved user input from the file (or database)
        try {
            const userInput = fs.readFileSync('./userInput.txt', 'utf8');
            responseBody = userInput;
        } catch (error) {
            statusCode = 500;
            responseBody = 'Error loading user input';
        }
    } else if (path === '/save' && httpMethod === 'POST') {
        const parsedData = parse(body);
        const userInput = parsedData.userInput;

        // Save the user input to a file (or database)
        try {
            fs.writeFileSync('./userInput.txt', userInput);
            responseBody = 'User input saved successfully';
        } catch (error) {
            statusCode = 500;
            responseBody = 'Error saving user input';
        }
    } else if (path === '/' && httpMethod === 'GET') {
        // Read the HTML file
        try {
            const html = fs.readFileSync('./index.html', 'utf8');
            responseBody = html;
        } catch (error) {
            statusCode = 500;
            responseBody = 'Error loading HTML file';
        }
    } else {
        statusCode = 404;
        responseBody = 'Page not found';
    }

    return {
        statusCode,
        body: responseBody,
        headers: {
            'Content-Type': 'text/html',
        },
    };
};
