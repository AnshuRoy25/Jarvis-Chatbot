from flask import Flask, render_template, request, jsonify, session;
from pymongo import MongoClient
import ollama
from bson import ObjectId


client = MongoClient('mongodb://localhost:27017/')
db = client['mydatabase']
user_collection = db['users']
conversation_collection = db['conversations']

app = Flask(__name__)
app.secret_key = "supersecretkey123"


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

    user_collection.insert_one ({'username': username, 'password': password})

    return jsonify ({'message': 'done'})



@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']

    user_data = user_collection.find_one({'username': username, 'password': password})

    if user_data:
        session["user_id"] = str(user_data["_id"])
        return jsonify({'message': 'Login Sucessful'})
    else:
        return jsonify({'message': 'Invalid username or password'})


@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['message']
    modelname = request.json['modelname']

    previous_conversations = list(conversation_collection.find(
    {"user_id": ObjectId(session["user_id"])},  
    {"_id": 0, "role": 1, "content": 1}     
    ))

    previous_conversations.append(
        {'role': 'user',
        'content': user_input}
        )

    response = ollama.chat(
        model=modelname,
        messages=previous_conversations
    )

    reply = response['message']['content']

    conversation_collection.insert_many([
    {
        'user_id': ObjectId(session["user_id"]),  
        'role': 'user',
        'content': user_input
    },
    {
        'user_id': ObjectId(session["user_id"]),  
        'role': 'assistant',
        'content': reply
    }
        ])

    return jsonify({'reply': reply})









if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
 