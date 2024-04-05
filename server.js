// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message;
    // You can process the user's message here and generate a response
    // For now, we'll just echo back the user's message
    const response = userMessage;
    res.send(response);
});

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
