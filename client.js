const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const loadingIndicator = document.getElementById('loading-indicator');

sendButton.addEventListener('click', async () => {
  const userMessage = userInput.value.trim(); // Trim whitespace
  if (!userMessage) return;

  appendMessage('You', userMessage);
  showLoadingIndicator();

  try {
    const response = await sendMessageToServer(userMessage);
    appendMessage('Dialogflow', response.data.response);
  } catch (error) {
    console.error('Error:', error.response.data);
    appendMessage('Error', 'An error occurred while processing the message.');
  }

  hideLoadingIndicator();
  userInput.value = ''; // Clear user input after sending message
});

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = `${sender}: ${message}`;
  chatMessages.appendChild(messageElement);
}

function showLoadingIndicator() {
  loadingIndicator.style.display = 'block';
}

function hideLoadingIndicator() {
  loadingIndicator.style.display = 'none';
}

async function sendMessageToServer(message) {
  return await axios.post('/message', { message });
}
