// Connect to Socket.io
const socket = io('http://localhost:3000'); // Adjust if the backend is hosted elsewhere

// DOM Elements
const usernameInput = document.getElementById('username');
const registerForm = document.getElementById('register-form');
const userList = document.getElementById('user-list');
const receiverInput = document.getElementById('receiver');
const messageTextInput = document.getElementById('message-text');
const messageForm = document.getElementById('message-form');
const messagesDiv = document.getElementById('messages');

// Register user on submit
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (!username) return alert('Username is required');

    // Call API to create user using Axios
    try {
        const response = await axios.post('http://localhost:3000/users', { username });
        console.log('User created:', response.data);
        loadUsers();
    } catch (error) {
        console.error('Error creating user:', error);
        alert('Error creating user');
    }
});

// Send message to backend using Axios
messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const receiver = receiverInput.value.trim();
    const text = messageTextInput.value.trim();

    if (!receiver || !text) {
        return alert('Receiver and message text are required');
    }

    const sender = usernameInput.value.trim();

    if (!sender) {
        return alert('Please create a user first');
    }

    try {
        const response = await axios.post('http://localhost:3000/messages', {
            sender, receiver, text
        });

        const message = response.data;

        // Emit new message to Socket.io server
        socket.emit('new_message', message);
        messageTextInput.value = ''; // Clear the message input field
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Error sending message');
    }
});

// Load all users
async function loadUsers() {
    try {
        const response = await axios.get('http://localhost:3000/users');
        const users = response.data;
        userList.innerHTML = '';
        users.forEach((user) => {
            const userItem = document.createElement('li');
            userItem.textContent = user.username;
            userList.appendChild(userItem);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        alert('Error loading users');
    }
}

// Listen for real-time messages from Socket.io
socket.on('new_message', (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${message.timestamp} - ${message.sender}: ${message.text}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
});

// Load users when the page loads
loadUsers();
