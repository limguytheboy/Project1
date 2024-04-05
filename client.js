function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    if (userInput.trim() !== "") {
        // Send the user input to the server and get the response
        // For simplicity, we'll just echo the user input for now
        addMessage("You", userInput);
        document.getElementById("user-input").value = "";
    }
}

function addMessage(sender, message) {
    var chatBox = document.getElementById("chat-box");
    var messageElement = document.createElement("div");
    messageElement.innerHTML = "<strong>" + sender + ":</strong> " + message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
