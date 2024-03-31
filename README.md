<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChatGPT</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="chat-container">
        <div class="chat" id="chat-box">
            <div class="bot-message">Welcome to ChatGPT! How can I assist you today?</div>
        </div>
        <div class="input-container">
            <input type="text" id="user-input" placeholder="Type your message...">
            <input type="submit" value="Send" onclick="sendMessage()">
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
