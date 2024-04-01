const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle incoming messages from the client
app.post('/message', async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Send user message to the OpenAI API
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'text-davinci-003', // Change this to your desired model
      prompt: userMessage,
      max_tokens: 50, // Adjust as needed
      temperature: 0.7 // Adjust as needed
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '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' // Replace this with your actual API key
      }
    });

    // Return the response from the OpenAI API to the client
    res.json({ response: response.data.choices[0].text });
  } catch (error) {
    console.error('Error:', error.response.data);
    res.status(500).json({ error: 'An error occurred while processing the message.' });
  }
});

// Serve the HTML, CSS, and JavaScript files
app.use(express.static(__dirname));

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
