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

    // Call Dialogflow API to process the user message
    const dialogflowResponse = await sendToDialogflow(userMessage);

    // Return the response from Dialogflow to the client
    res.json({ response: dialogflowResponse });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred while processing the message.' });
  }
});

// Function to send user message to Dialogflow
async function sendToDialogflow(userMessage) {
  const projectId = process.env.DIALOGFLOW_PROJECT_ID;
  const sessionId = 'unique-session-id'; // You can use any unique identifier for the session
  const languageCode = 'en-US';

  const dialogflowResponse = await axios.post(
    `https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${sessionId}:detectIntent`,
    {
      queryInput: {
        text: {
          text: userMessage,
          languageCode: languageCode,
        },
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DIALOGFLOW_ACCESS_TOKEN}`,
      },
    }
  );

  return dialogflowResponse.data.queryResult.fulfillmentText;
}

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
