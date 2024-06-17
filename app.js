const express = require('express');
const bodyParser = require('body-parser');
const generateReadme = require('./readmeGenerator');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/generate', (req, res) => {
    const data = req.body;
    const readmeContent = generateReadme(data);
    res.render('result', { readmeContent });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port \u001b]8;;http://localhost:${PORT}\u001b\\http://localhost:${PORT}\u001b]8;;\u001b\\`);
});
