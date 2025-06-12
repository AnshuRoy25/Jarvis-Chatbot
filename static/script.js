// Your original functions - unchanged
async function create() {

    const credential1 = document.getElementById("username");
    const username = credential1.value;
    const credential2 = document.getElementById("password");
    const password = credential2.value;
    const credential3 = document.getElementById("confirm");
    const confirm = credential3.value;
    credential1.value = "";
    credential2.value = "";
    credential3.value = "";
    
    const reply = document.getElementById("create-message");

    
    if (username==="" || password==="" || confirm==="" ) {
        reply.innerHTML = "Please fill in all fields";
    }
    else if (password !== confirm ) {
        reply.innerHTML = "Passwords do not match";
    }
    else {

        const response = await fetch('/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password})
    })

    const data1 = await response.json()
    reply.innerHTML = "Account Sucessfully Created";

 }

}

async function login() {

    const credential1 = document.getElementById("username");
    const username = credential1.value;
    const credential2 = document.getElementById("password");
    const password = credential2.value;
    credential1.value = "";
    credential2.value = "";

    const reply = document.getElementById("login-message");

    if (username === '' || password === '') {
        reply.innerHTML = "Please fill in all fields";
    }
    else {

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password})
    })

        const data2 = await response.json()

        if (data2.message === "Invalid username or password") {
        reply.innerHTML = `${data2.message}`;
     }

        else if (data2.message === "Login Sucessful") {
        reply.innerHTML = `${data2.message}`; 

        setTimeout(() => {
        window.location.href = '/home-page';
        }, 1000); // 1 second delay


     }
    }}

async function start() {

    const messagebox = document.getElementById("messages");
    // Check both model selectors (mobile and desktop)
    const modelSelector1 = document.getElementById('model-selector');
    const modelSelector2 = document.getElementById('model-selector-2');
    const model = modelSelector1 ? modelSelector1.value : (modelSelector2 ? modelSelector2.value : 'mistral:7b');
    const user = document.getElementById("user-input");
    const input = user.value;

    if (input === "") {
        return;
        }
    user.value = '';

    // Create user message with new styling
    const userMessage = createMessage(input, 'user');
    messagebox.appendChild(userMessage);
    
    // Scroll to bottom
    scrollToBottom();

    const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input , modelname: model })
    });

    const data = await response.json();
    
    // Create JARVIS message with new styling
    const jarvisMessage = createMessage(data.reply, 'jarvis');
    messagebox.appendChild(jarvisMessage);
    
    // Scroll to bottom
    scrollToBottom();
}

// New functions for enhanced UI
function createMessage(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const messageLabel = document.createElement('div');
    messageLabel.className = 'message-label';
    messageLabel.textContent = type === 'user' ? 'You' : 'JARVIS';
    
    const messageText = document.createElement('div');
    messageText.textContent = content;
    
    messageContent.appendChild(messageLabel);
    messageContent.appendChild(messageText);
    messageDiv.appendChild(messageContent);
    
    return messageDiv;
}

function scrollToBottom() {
    const chatArea = document.querySelector('.chat-area');
    if (chatArea) {
        chatArea.scrollTop = chatArea.scrollHeight;
    }
}

// Enhanced Enter key functionality and model selector sync
document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                start();
            }
        });
    }
    
    // Focus on input when page loads
    if (userInput) {
        userInput.focus();
    }
    
    // Sync model selectors between mobile and desktop
    const modelSelector1 = document.getElementById('model-selector');
    const modelSelector2 = document.getElementById('model-selector-2');
    
    if (modelSelector1 && modelSelector2) {
        modelSelector1.addEventListener('change', function() {
            modelSelector2.value = this.value;
        });
        
        modelSelector2.addEventListener('change', function() {
            modelSelector1.value = this.value;
        });
    }
});

// Auto-resize functionality for better mobile experience
function adjustInputHeight() {
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.style.height = 'auto';
        userInput.style.height = userInput.scrollHeight + 'px';
    }
}

// Add typing indicator (optional enhancement)
function showTypingIndicator() {
    const messagebox = document.getElementById("messages");
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message jarvis typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const messageLabel = document.createElement('div');
    messageLabel.className = 'message-label';
    messageLabel.textContent = 'JARVIS';
    
    const dots = document.createElement('div');
    dots.innerHTML = '<span>.</span><span>.</span><span>.</span>';
    dots.style.animation = 'pulse 1.5s infinite';
    
    messageContent.appendChild(messageLabel);
    messageContent.appendChild(dots);
    typingDiv.appendChild(messageContent);
    messagebox.appendChild(typingDiv);
    
    scrollToBottom();
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}