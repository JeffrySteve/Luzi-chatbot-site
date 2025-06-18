// script.js

const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotWindow = document.getElementById('chatbot-window');
const closeChat = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBody = document.getElementById('chat-body');

// Open chat
chatbotIcon.addEventListener('click', () => {
  chatbotWindow.classList.add('active');
});

// Close chat
closeChat.addEventListener('click', () => {
  chatbotWindow.classList.remove('active');
});

// Send message
sendBtn.addEventListener('click', sendMessage);

userInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const message = userInput.value.trim();
  if (message === '') return;

  // Display user message
  appendMessage('You', message);
  userInput.value = '';

  // Call backend API
  fetch('https://d13f-2401-4900-1ce3-b17f-75f0-1c13-e8b7-5a43.ngrok-free.app/get_response', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: message })
  })
    .then(res => res.json())
    .then(data => {
      appendMessage('Bot', data.response);
    })
    .catch(() => {
      appendMessage('Bot', "Oops! Can't connect to server.");
    });
}

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('chat-message');
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}
