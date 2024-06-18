function generateReadme(data) {
    const badges = data.badges ? data.badges.split(',').map(badge => `![Badge](https://img.shields.io/badge/${badge.trim().replace(' ', '%20')}-blue)`).join(' ') : '';
    return `
# ${data.title}

${badges}

## 📖 Description

${data.description}

## 📑 Table of Contents

${data.tableOfContents}

## 🛠 Installation

${data.installation}

## 🚀 Usage

${data.usage}

## 🎥 Demo

${data.demo}

## 🤝 Contributions

${data.contributions}

## 🧑‍💻 Author

${data.author}
${data.twitter ? `[![Twitter](https://img.shields.io/badge/Twitter-${data.twitter}-blue)](https://twitter.com/${data.twitter})` : ''}
${data.linkedin ? `[![LinkedIn](https://img.shields.io/badge/LinkedIn-${data.linkedin}-blue)](https://www.linkedin.com/in/${data.linkedin})` : ''}
${data.github ? `[![GitHub](https://img.shields.io/badge/GitHub-${data.github}-blue)](https://github.com/${data.github})` : ''}

## 📜 License

${data.license}

    `;
}

module.exports = generateReadme;
