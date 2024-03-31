const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3001; // Choose a port for your Node.js server

app.use(express.json());

// Proxy POST requests to Flask application
app.post('/predict', async (req, res) => {
 
        try {
            const flaskResponse = await axios.post('http://localhost:5000/predict', req.body);
            res.json(flaskResponse.data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
// Start the Express server
app.listen(PORT, () => {
    console.log(`Node.js server running on port ${PORT}`);
});
