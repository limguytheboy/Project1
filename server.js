const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const apiKey = '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';

app.post('/message', async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'text-davinci-003',
      prompt: userMessage,
      max_tokens: 50,
      temperature: 0.7
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    res.json({ response: response.data.choices[0].text });
  } catch (error) {
    console.error('Error:', error.response.data);
    res.status(500).json({ error: 'An error occurred while processing the message.' });
  }
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
