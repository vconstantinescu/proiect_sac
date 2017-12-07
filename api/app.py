#!flask/bin/python
from flask import Flask, jsonify


app = Flask(__name__)


@app.route('/api/test', methods=['GET'])
def index():
    return jsonify({'test': 'test'})


if __name__ == '__main__':
    app.run(debug=True)

