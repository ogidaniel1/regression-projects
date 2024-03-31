const axios = require('axios');

// Sample data for prediction
const inputData = {
    "age": 60,
    "bmi": 29,
    "children": 5,
    "smoker": "yes"
};

// Send POST request to Flask application for prediction
axios.post('http://localhost:3001/predict', inputData)
    .then(response => {
        console.log("Prediction:", response.data.prediction);
    })
    .catch(error => {
        console.error("Error:", error.response.data.error);
    });
