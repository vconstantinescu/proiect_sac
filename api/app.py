#!flask/bin/python
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo, ObjectId

app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'sac'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/sac'

mongo = PyMongo(app)


@app.route('/api/register', methods=['POST'])
def register():

    user_id = mongo.db.users.insert({
        "name": request.json['name'],
        "email": request.json['email'],
        "password": request.json['password']
    })

    user = mongo.db.users.find_one({'_id': ObjectId(str(user_id))})
    user['_id'] = str(user['_id'])

    return jsonify({"success": True, "user": user})


@app.route('/api/login', methods=['POST'])
def login():
    user = mongo.db.users.find({
        'email': request.json['email'],
        'password': request.json['password']
    })

    if len(user) == 0:
        return jsonify({'success': False, 'error': 'Invalid credentials'})

    return jsonify({'success': True, 'user': user})


if __name__ == '__main__':
    app.run(debug=True)

