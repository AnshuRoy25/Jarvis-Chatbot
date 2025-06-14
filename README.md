# JARVIS AI Assistant

A sleek, web-based AI chat application built with Flask that provides conversational AI capabilities through multiple language models. Features a modern dark-themed interface with user authentication and conversation persistence.

## Features

- 🤖 **Multiple AI Models**: Support for Mistral, Gemma, and DeepSeek models
- 🔐 **User Authentication**: Secure login and account creation system
- 💾 **Conversation Persistence**: Chat history saved per user in MongoDB
- 📱 **Responsive Design**: Mobile-optimized interface with dark theme
- ⚡ **Real-time Chat**: Instant AI responses with typing indicators
- 🎨 **Modern UI**: JARVIS-themed interface with smooth animations

## Tech Stack

- **Backend**: Flask (Python)
- **Database**: MongoDB
- **AI Models**: Ollama
- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Custom CSS with gradient themes

## Prerequisites

Before running the application, ensure you have the following installed:

- Python 3.7+
- MongoDB
- Ollama

### Ollama Models Setup

Install the required models using Ollama:

```bash
# Install Mistral 7B
ollama pull mistral:7b

# Install Gemma 4B
ollama pull gemma3:4b

# Install DeepSeek R1 7B
ollama pull deepseek-r1:7b
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jarvis-ai-assistant
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start MongoDB**
   - Make sure MongoDB is running on `localhost:27017`
   - The application will automatically create the required database and collections

5. **Start Ollama service**
   ```bash
   ollama serve
   ```

## Usage

1. **Run the application**
   ```bash
   python run.py
   ```

2. **Access the application**
   - Open your browser and navigate to `http://localhost:5000`
   - Create a new account or login with existing credentials
   - Start chatting with your AI assistant!

## Project Structure

```
jarvis-ai-assistant/
├── app/
│   ├── __init__.py          # Flask app initialization
│   ├── routes.py            # API routes and handlers
│   ├── static/
│   │   ├── script.js        # Frontend JavaScript
│   │   └── styles.css       # CSS styling
│   └── templates/
│       ├── index.html       # Main chat interface
│       ├── login.html       # Login page
│       └── create.html      # Account creation page
├── requirements.txt         # Python dependencies
├── run.py                  # Application entry point
└── README.md              # This file
```

## API Endpoints

### Authentication
- `GET /` - Redirect to login page
- `GET /login-page` - Login page
- `GET /create-page` - Account creation page
- `GET /home-page` - Main chat interface
- `POST /login` - User authentication
- `POST /create` - Account creation

### Chat
- `POST /chat` - Send message and receive AI response

## Database Schema

### Users Collection
```javascript
{
  "_id": ObjectId,
  "username": String,
  "password": String  // Note: Consider implementing password hashing
}
```

### Conversations Collection
```javascript
{
  "_id": ObjectId,
  "user_id": ObjectId,
  "role": String,      // "user" or "assistant"
  "content": String    // Message content
}
```

## Configuration

### MongoDB Configuration
The application connects to MongoDB using:
- **Host**: `localhost`
- **Port**: `27017`
- **Database**: `mydatabase`
- **Collections**: `users`, `conversations`

### Model Configuration
Available AI models can be modified in the HTML templates:
- Mistral 7B (`mistral:7b`)
- Gemma 4B (`gemma3:4b`)
- DeepSeek R1 7B (`deepseek-r1:7b`)

## Acknowledgments

- Built with [Flask](https://flask.palletsprojects.com/)
- AI models powered by [Ollama](https://ollama.ai/)
- Database storage with [MongoDB](https://www.mongodb.com/)
- Inspired by the JARVIS AI assistant from Iron Man

---

**Note**: This application is for educational and development purposes. Please implement proper security measures before deploying to production.
