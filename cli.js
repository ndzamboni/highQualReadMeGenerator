const readline = require('readline');
const fs = require('fs');
const generateReadme = require('./readmeGenerator');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const questions = [
    'Title: ',
    'Badges (comma separated): ',
    'Description: ',
    'Table of Contents: ',
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
        const readmeContent = generateReadme(answers);
        fs.writeFileSync('README.md', readmeContent);
        console.log('README.md has been generated.');
        rl.close();
        return;
    }

    rl.question(questions[index], (answer) => {
        const key = questions[index].split(' ')[0].toLowerCase();
        answers[key] = answer;
        askQuestion(index + 1);
    });
};

askQuestion(0);
