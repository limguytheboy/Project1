const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const apiKey = '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'; // Replace with your actual API key

// Route to handle incoming messages from the client
// Route to handle incoming messages from the client
app.post('/message', async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Send user message to the OpenAI API
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'gpt-4-0125-preview',
      prompt: userMessage,
      max_tokens: 50,
      temperature: 0.7
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    // Return the response from the OpenAI API to the client
    res.json({ response: response.data.choices[0].text });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while processing the message.' });
  }
});
