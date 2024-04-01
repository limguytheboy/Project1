const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai'); // Import the OpenAI library

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Initialize the OpenAI API with your API key from the environment variables
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Route to handle incoming messages from the client
app.post('/message', async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Send user message to the OpenAI API
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userMessage }
      ],
    });

    // Return the response from the OpenAI API to the client
    res.json({ response: completion.data.choices[0].message.content });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred while processing the message.' });
  }
});

// Serve the HTML, CSS, and JavaScript files
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
