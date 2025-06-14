from flask import request, jsonify, render_template, session
from app import app
from bson import ObjectId
import ollama


@app.route('/')
def index():
    return render_template('login.html')

@app.route('/login-page')
def login_page():
    return render_template('login.html')

@app.route('/create-page')
def create_page():
    return render_template('create.html')

@app.route('/home-page')
def home_page():
    return render_template('index.html')


@app.route('/create', methods=['POST'])
def create():
    data = request.json
    username = data['username']
    password = data['password']

    app.user_collection.insert_one({'username': username, 'password': password})
    return jsonify({'message': 'done'})


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']

    user_data = app.user_collection.find_one({'username': username, 'password': password})

    if user_data:
        session["user_id"] = str(user_data["_id"])
        return jsonify({'message': 'Login Successful'})
    else:
        return jsonify({'message': 'Invalid username or password'})


@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['message']
    modelname = request.json['modelname']
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({'reply': 'User not logged in'}), 401

    previous_conversations = list(app.conversation_collection.find(
        {"user_id": ObjectId(user_id)},
        {"_id": 0, "role": 1, "content": 1}
    ))

    previous_conversations.append({
        'role': 'user',
        'content': user_input
    })

    response = ollama.chat(
        model=modelname,
        messages=previous_conversations
    )

    reply = response['message']['content']

    app.conversation_collection.insert_many([
        {
            'user_id': ObjectId(user_id),
            'role': 'user',
            'content': user_input
        },
        {
            'user_id': ObjectId(user_id),
            'role': 'assistant',
            'content': reply
        }
    ])

    return jsonify({'reply': reply})
