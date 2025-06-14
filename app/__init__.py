from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)
app.secret_key = "supersecretkey123"

# MongoDB setup
client = MongoClient('mongodb://localhost:27017/')
db = client['mydatabase']
user_collection = db['users']
conversation_collection = db['conversations']

# Store collections in app context
app.user_collection = user_collection
app.conversation_collection = conversation_collection

# Register routes
from app import routes  # this imports the routes and connects them
