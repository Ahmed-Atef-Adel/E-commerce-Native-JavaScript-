const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files (like the front-end)
app.use(express.static('public'));

// POST route to receive contact form data
app.post('/api/contact', (req, res) => {
    const { firstName, lastName, mobile, email, message } = req.body;

    // Create a message object
    const newMessage = {
        firstName,
        lastName,
        mobile,
        email,
        message,
        date: new Date()
    };

    // Read existing messages from a file
    fs.readFile('messages.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }

        const messages = JSON.parse(data);
        messages.push(newMessage);

        // Write the updated messages back to the file
        fs.writeFile('messages.json', JSON.stringify(messages, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }

            // Send a success response
            res.json({ message: 'Message received' });
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
