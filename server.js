const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dynamic Button Surprise</title>
        <style>
            body {
                background-color: #4e8fcf; /* Light gray */
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
            }
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            .button {
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
                background-color: #FF0000; /* Blue */
                color: white;
                border: none;
                border-radius: 5px;
                transition: background-color 0.3s ease;
            }
            .button:hover {
                background-color: #4e8fcf; /* Dark blue */
            }
        </style>
    </head>
    <body>
        <div class="container">
            <button class="button" onclick="surprise()">Click me for a surprise!</button>
        </div>
        <script>
            function surprise() {
                // Redirect to www.google.com
                window.location.href = "https://www.ericrobotics.com/";
            }
        </script>
    </body>
    </html>
    
    `);
});

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Handle unsupported methods
app.all('/', (req, res) => {
    res.status(405).send('Method Not Allowed');
});

module.exports = server;
