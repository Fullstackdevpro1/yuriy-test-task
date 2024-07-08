import hashlib
import datetime
import re
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient

app = Flask(__name__)
jwt = JWTManager(app)
app.config['JWT_SECRET_KEY'] = 'Your_Secret_Key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)

client = MongoClient("mongodb+srv://vitalii:vh2222vh@cluster0.uys7c2r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["yuriy_test_task"]
users_collection = db["yuriy_test_task"]

# Email validation function
def is_valid_email(email):
    email_regex = re.compile(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
    return email_regex.match(email) is not None

@app.route("/api/v1/users", methods=["POST"])
def register():
    new_user = request.get_json()

    if not is_valid_email(new_user.get("email", "")):
        return jsonify({'msg': 'Invalid email format'}), 400

    new_user["password"] = hashlib.sha256(new_user["password"].encode("utf-8")).hexdigest()
    doc = users_collection.find_one({"email": new_user["email"]})
    if not doc:
        users_collection.insert_one(new_user)
        return jsonify({'msg': 'User created successfully'}), 201
    else:
        return jsonify({'msg': 'Email already exists'}), 409

@app.route("/api/v1/login", methods=["POST"])
def login():
    login_details = request.get_json()

    if not is_valid_email(login_details.get("email", "")):
        return jsonify({'msg': 'Invalid email format'}), 400

    user_from_db = users_collection.find_one({'email': login_details['email']})

    if user_from_db:
        encrypted_password = hashlib.sha256(login_details['password'].encode("utf-8")).hexdigest()
        if encrypted_password == user_from_db['password']:
            access_token = create_access_token(identity=user_from_db['email'])
            return jsonify(access_token=access_token), 200

    return jsonify({'msg': 'The email or password is incorrect'}), 401


if __name__ == '__main__':
    app.run(debug=True)
