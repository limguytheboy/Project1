document.getElementById('send-btn').addEventListener('click', () => {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();

    if (!text) return;

    displayMessage(text, 'user');
    input.value = '';

    fetch('/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({text: text}),
    })
    .then(response => response.json())
    .then(data => {
        displayMessage(data.reply, 'bot');
    })
    .catch(error => console.error('Error:', error));
});

function displayMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const msgDiv = document.createElement('div');
    msgDiv.textContent = text;
    msgDiv.className = sender;
    chatBox.appendChild(msgDiv);
}
