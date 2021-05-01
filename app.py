import json

from flask import Flask, request
from flask_cors import CORS, cross_origin
import random

app = Flask(__name__)
CORS(app)


@app.route('/api/checked_toxic', methods=['POST'])
@cross_origin()
def checked_toxic():
    text_input = request.json
    response = []
    for i in range(len(text_input)):
        response.append(random.uniform(0, 1))

    return json.dumps({
        "response": response
    })


if __name__ == '__main__':
    app.run()
