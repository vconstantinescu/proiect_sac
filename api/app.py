#!flask/bin/python
from flask import Flask, request
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

    return json_util.dumps({"success": True, "user": user})


@app.route('/api/login', methods=['POST'])
def login():
    user = mongo.db.users.find({
        'email': request.json['email'],
        'password': request.json['password']
    })

    if user.count() == 0:
        return json_util.dumps({'success': False, 'error': 'Invalid credentials'})

    return json_util.dumps({'success': True, 'user': user})


@app.route('/api/product', methods=['POST'])
def product():
    product_id = mongo.db.products.insert({
        'user_id': request.json['user_id'],
        'name': request.json['name'],
        'price': request.json['price']
    })

    product = mongo.db.products.find_one({'_id': ObjectId(str(product_id))})

    return json_util.dumps({'success': True, 'product': product})


@app.route('/api/user_expenses', methods=['POST', 'GET'])
def user_outgoings():
    users = mongo.db.users.find({}, {"name": 1, "email": 1, "_id": 1})
    products = mongo.db.products.aggregate([
        {
            '$group': {
                '_id': '$user_id',
                'priceAvg': {'$avg': '$price'},
                'products': {
                    '$push': {
                        'name': '$name',
                        'price': '$price',
                        'user_id': '$user_id',
                    }
                },
            }
        },
        {
            '$project': {
                'user': '$_id',
                'priceAvg': '$priceAvg',
                'products': '$products',
                'expensive': {
                    '$filter': {
                        'input': '$products',
                        'as': 'item',
                        'cond': {'$gt': ['$$item.price', '$priceAvg']}
                    }
                }
            }
        }
    ])

    return json_util.dumps({'products': products, 'users': users})


if __name__ == '__main__':
    app.run(debug=True)
