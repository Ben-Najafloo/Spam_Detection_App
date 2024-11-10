from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS

# Load the model and vectorizer
model = joblib.load('spam_classifier_model.pkl')
vectorizer = joblib.load('tfidf_vectorizer.pkl')

app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['POST'])
def predict():
    email_text = request.json['email']
    email_features = vectorizer.transform([email_text])
    prediction = model.predict(email_features)
    result = 'Ham mail' if prediction[0] == 1 else 'Spam mail'
    return jsonify({'result': result})


if __name__ == '__main__':
    app.run(port=5000)
