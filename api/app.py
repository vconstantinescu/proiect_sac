#!flask/bin/python
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo, ObjectId
from bson import json_util

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


@app.route('/api/product', methods=['POST'])
def product():
    product_id = mongo.db.products.insert({
        'user_id': request.json['user_id'],
        'name': request.json['name'],
        'price': request.json['price']
    })

    product = mongo.db.products.find_one({'_id': ObjectId(str(product_id))})
    product['_id'] = str(product['_id'])

    return jsonify({'success': True, 'product': product})


@app.route('/api/user_outgoings', methods=['POST'])
def user_outgoings():
    products = mongo.db.products.find({'user_id': request.json['user_id']})

    return json_util.dumps({'products': products})


if __name__ == '__main__':
    app.run(debug=True)

