document.addEventListener('DOMContentLoaded', function () {
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');

  sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    appendMessage('You', userMessage);

    // Send user message to the server
    const response = await axios.post('/message', { message: userMessage });

    // Display the response from the server
    appendMessage('ChatGPT', response.data.response);

    // Clear user input
    userInput.value = '';
  });

  function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    chatMessages.appendChild(messageElement);
  }
});
