const express = require('express');
const bodyParser = require('body-parser');
const generateReadme = require('./readmeGenerator');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Ensure the 'generated' directory exists
const generatedDir = path.join(__dirname, 'generated');
if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir);
}

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/generate', (req, res) => {
    console.log('Form Data Received:', req.body);  // Log the form data received

    const data = {
        title: req.body.title,
        badges: req.body.badges,
        description: req.body.description,
        installation: req.body.installation,
        usage: req.body.usage,
        demo: req.body.demo,
        contributions: req.body.contributions,
        author: req.body.author,
        twitter: req.body.twitter,
        linkedin: req.body.linkedin,
        github: req.body.github,
        license: req.body.license,
    };

    console.log('Processed Data:', data); // Log processed data before passing to generator

    data.tableOfContents = generateTableOfContents(data);
    const readmeContent = generateReadme(data);
    console.log('Generated README Content:', readmeContent);  // Log the generated README content

    const filename = `README_${uuidv4()}.md`;
    const filepath = path.join(generatedDir, filename);
    fs.writeFileSync(filepath, readmeContent);

    res.render('result', { readmeContent, filepath });
});

function generateTableOfContents(data) {
    return `
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Demo](#demo)
5. [Contributions](#contributions)
6. [Author](#author)
7. [License](#license)
    `;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port \u001b]8;;http://localhost:${PORT}\u001b\\http://localhost:${PORT}\u001b]8;;\u001b\\`);
});
