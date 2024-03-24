from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load the model
with open('insurancemodelf.sav', 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/predict', methods=['POST'])
def predict():
    # Get data from request
    data = request.json

    # Ensure that all required parameters are present
    required_params = ['age', 'bmi', 'children', 'smoker']
    if not all(param in data for param in required_params):
        return jsonify({'error': 'Missing required parameters'}), 400

    # Perform prediction using the loaded model
    try:
        # Convert 'smoker' to binary (0 or 1)
        smoker = 1 if data['smoker'].lower() == 'yes' else 0

        prediction = model.predict([[data['age'], data['bmi'], data['children'], smoker]])
        return jsonify({'prediction': float(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
