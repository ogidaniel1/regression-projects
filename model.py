import requests

# Sample data for prediction
sample_data = {
    'age': 19,
    'bmi': 23,
    'children': 0,
    'smoker': 'no'
}

# Send POST request to API endpoint
response = requests.post('http://127.0.0.1:5000/predict', json=sample_data)

# Check response status code
if response.status_code == 200:
    # Get prediction from response
    prediction = response.json()['prediction']
    print('Prediction:', prediction)
else:
    print('Failed to get prediction:', response.text)
