const readline = require('readline');
const fs = require('fs');
const path = require('path');
const generateReadme = require('./readmeGenerator');
const { v4: uuidv4 } = require('uuid');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const questions = [
    'Title: ',
    'Badges (comma separated): ',
    'Description: ',
    'Installation: ',
    'Usage: ',
    'Demo: ',
    'Contributions: ',
    'Author: ',
    'Twitter Username: ',
    'LinkedIn Username: ',
    'GitHub Username: ',
    'License: '
];

const answers = {};

const askQuestion = (index) => {
    if (index === questions.length) {
        answers.tableOfContents = generateTableOfContents(answers);
        const readmeContent = generateReadme(answers);

        const filename = `README_${uuidv4()}.md`;
        const filepath = path.join(__dirname, 'generated', filename);
        fs.writeFileSync(filepath, readmeContent);

        console.log(`README.md has been generated at ${filepath}`);
        rl.close();
        return;
    }

    rl.question(questions[index], (answer) => {
        const key = questions[index].split(' ')[0].toLowerCase();
        answers[key] = answer;
        askQuestion(index + 1);
    });
};

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

askQuestion(0);
