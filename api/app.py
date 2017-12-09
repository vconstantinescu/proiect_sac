#!flask/bin/python
from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)

client = MongoClient('localhost:27017')
db = client.sac


@app.route('/api/register', methods=['POST'])
def register():
    table = db.users
    user_id = table.insert({
        "name": request.json['name'],
        "email": request.json['email'],
        "password": request.json['password']
    })

    user = table.find_one({'_id': ObjectId(str(user_id))})
    user['_id'] = str(user['_id'])

    return jsonify({"success": True, "user": user})


@app.route('/api/login', methods=['POST'])
def login():
    user = db.users.find({
        'email': request.json['email'],
        'password': request.json['password']
    })

    if len(user) == 0:
        return jsonify({'success': False, 'error': 'Invalid credentials'})

    return jsonify({'success': True, 'user': user})


if __name__ == '__main__':
    app.run(debug=True)

