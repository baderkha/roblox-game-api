const express = require('express');
const app = express();
const fs = require('fs');
const { generateControllers } = require('./src/dependency');
const serverless = require('serverless-http');
const c = generateControllers();
app.use(express.json());
console.log('here')
app.get('/', (req, res) => {
    res.status(200).send('API is up');
});
app.post('/ImageFont', c.TextController.generateCustomFontImageText.bind(c.TextController));

if (process.env.isLocal) {
    app.listen(8020, () => {
        console.log('listening to port 8020');
    });
}

module.exports.handler = serverless(app);
