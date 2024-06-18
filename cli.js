const readline = require('readline');
const fs = require('fs');
const path = require('path');
const generateReadme = require('./readmeGenerator');
const { v4: uuidv4 } = require('uuid');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Questions array to collect user input
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

// Answers object to store user input
const answers = {};

// Function to ask questions recursively
const askQuestion = (index) => {
    if (index === questions.length) {
        // Once all questions are answered, generate the README
        answers.tableOfContents = generateTableOfContents();
        const readmeContent = generateReadme(answers);

        // Generate filename and filepath for the README
        const filename = `README_${uuidv4()}.md`;
        const filepath = path.join(__dirname, 'generated', filename);

        // Write README content to file
        fs.writeFileSync(filepath, readmeContent);

        // Output success message
        console.log(`README.md has been generated at ${filepath}`);
        rl.close();
        return;
    }

    // Ask the current question and store the answer
    rl.question(questions[index], (answer) => {
        const key = questions[index].split(' ')[0].toLowerCase().replace(':', '');
        answers[key] = answer.trim(); // Store the trimmed answer
        askQuestion(index + 1); // Recursively ask next question
    });
};

// Function to generate table of contents (static in CLI)
function generateTableOfContents() {
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

// Start asking questions from the beginning
askQuestion(0);
