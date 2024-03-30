const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post('/predict', (req, res) => {
    const data = req.body;

    const pythonProcess = spawn('python', ['model.py', JSON.stringify(data)]);

    let prediction = '';

    pythonProcess.stdout.on('data', (data) => {
        prediction += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from python script: ${data}`);
        res.status(500).json({ error: 'Internal server error' });
    });

    pythonProcess.on('exit', (code) => {
        if (code === 0) {
            res.json({ prediction: parseFloat(prediction) });
        } else {
            console.error(`Python script exited with code ${code}`);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
