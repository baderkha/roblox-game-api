const express = require('express');
const app = express();
const fs = require('fs');
const { generateControllers } = require('./src/dependency');
const c = generateControllers();
app.use(express.json());

app.post('/ImageFont', c.TextController.generateCustomFontImageText.bind(c.TextController));

app.listen(8020, () => {
    console.log('listening to port 8020');
});
