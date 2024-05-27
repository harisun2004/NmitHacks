document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    sendBtn.addEventListener('click', function() {
        const userMessage = userInput.value.trim();
        if (userMessage === '') return;

        appendMessage('user', userMessage);
        const botResponse = respondToUser(userMessage);
        appendMessage('bot', botResponse); // Append bot's response immediately after user input

        userInput.value = '';
    });

    function appendMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(sender + '-message');
        messageDiv.innerText = message;

        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function respondToUser(message) {
        let response;

        if (message.includes('blockchain')) {
            response = "Blockchain is a decentralized, distributed ledger technology that stores data in blocks, linked together cryptographically. It ensures transparency, immutability, and security in data transactions. Blockchain can be used for various applications such as cryptocurrency, supply chain management, voting systems, and more. Do you have any specific questions about blockchain? For example, you could ask about consensus mechanisms, smart contracts, or blockchain scalability.";
        } else if (message.includes('hi') || message.includes('hello')) {
            response = "Hello! How can I assist you?";
        } else if (message.includes('how are you')) {
            response = "I'm just a bot, but thanks for asking!";
        } else if (message.includes('data validation standards')) {
            response = "Data validation standards ensure the accuracy, consistency, and reliability of data. Common standards include ISO 27001 for security, GDPR for privacy, and PCI DSS for payment card data. These standards help organizations comply with regulatory requirements, mitigate risks, and maintain data integrity. Are you interested in learning more about a specific data validation standard? You can ask about data anonymization, encryption techniques, or compliance frameworks.";
        } else if (message.includes('EDA reports') || message.includes('Exploratory Data Analysis')) {
            response = "EDA reports, or Exploratory Data Analysis reports, provide insights into datasets through statistical and visualization techniques. They help in understanding data distributions, patterns, and relationships. EDA is an essential step in the data analysis process, enabling data scientists to identify trends, outliers, and potential data quality issues. Would you like to know more about how EDA is performed or its importance in data analysis? You can inquire about data preprocessing methods, feature engineering techniques, or common EDA tools.";
        } else if (message.includes('IPFS') || message.includes('InterPlanetary File System')) {
            response = "IPFS, or InterPlanetary File System, is a decentralized protocol used for storing and sharing hypermedia content. It aims to create a permanent and resilient web by addressing content by its hash rather than its location. IPFS facilitates peer-to-peer file sharing, content versioning, and censorship resistance. Do you want to explore specific use cases or technical aspects of IPFS? You can ask about content addressing, file retrieval mechanisms, or IPFS integration with other technologies.";
        } else if (message.includes('decentralized')) {
            response = "Decentralization refers to the distribution of control away from a single central authority. It promotes transparency, resilience, and censorship resistance. Decentralized systems are often used in blockchain technology, peer-to-peer networks, and distributed computing. Would you like to learn more about decentralized systems or their applications?";
        } else if (message.includes('coinEx')) {
            response = "CoinEx is a cryptocurrency exchange platform that allows users to trade a variety of digital assets. It offers features such as spot trading, futures trading, staking, and more. CoinEx aims to provide a user-friendly and secure trading environment for cryptocurrency enthusiasts. Do you have any specific questions about CoinEx or cryptocurrency trading?";
        } else if (message.includes('AI') || message.includes('artificial intelligence')) {
            response = "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines, enabling them to perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation. AI technologies include machine learning, natural language processing, computer vision, and robotics. Would you like to know more about AI applications, algorithms, or ethical considerations?";
        } else if (message.includes('on chain')) {
            response = "On-chain refers to activities or transactions that occur directly on a blockchain network. It typically involves recording data or executing smart contracts directly on the blockchain. On-chain activities are transparent, immutable, and secure. Do you have any questions about on-chain transactions or their implications?";
        } else if (message.includes('off chain')) {
            response = "Off-chain refers to activities or transactions that occur outside of a blockchain network. It may involve processes such as data storage, computation, or communication that are conducted off the blockchain and later reconciled on-chain. Off-chain solutions are often used to improve scalability and reduce transaction costs. Would you like to learn more about off-chain solutions or their role in blockchain ecosystems?";
        } else if (message.includes('ipr') || message.includes('intellectual property rights')) {
            response = "Intellectual Property Rights (IPR) refer to legal rights that protect creations of the mind, such as inventions, literary and artistic works, designs, symbols, and trade secrets. In the context of blockchain and technology, IPR issues may arise concerning ownership, licensing, and protection of digital assets. Do you have any questions about intellectual property rights or their implications in blockchain applications?";
        } else if (message.includes('data privacy')) {
            response = "Data privacy refers to the protection of personal data from unauthorized access, use, or disclosure. It involves implementing measures to ensure that individuals have control over their personal information and that data is collected, processed, and stored securely and responsibly. Data privacy is a critical consideration in the design and implementation of systems involving sensitive information. Would you like to know more about data privacy regulations, best practices, or technologies?";
        } else if (message.includes('ownership')) {
            response = "Ownership refers to the legal rights and control over a particular asset or property. In the context of blockchain, ownership may relate to digital assets, such as cryptocurrencies, tokens, or intellectual property. Blockchain technology enables secure and transparent ownership records through cryptographic mechanisms. Do you have any questions about ownership rights or asset management on the blockchain?";
        } else if (message.includes('licensing')) {
            response = "Licensing involves granting permission to use or distribute a product, technology, or intellectual property under specified conditions. In the context of blockchain, licensing agreements may govern the use of software, patents, or digital assets. Smart contracts can automate and enforce licensing terms on the blockchain. Would you like to learn more about licensing models, smart contract implementation, or licensing on blockchain platforms?";
        } else if (message.includes('data quality')) {
            response = "Data quality refers to the accuracy, completeness, consistency, and reliability of data. High-quality data is essential for making informed decisions, conducting meaningful analysis, and ensuring the effectiveness of business processes. Data quality management involves processes such as data cleansing, validation, and governance. Do you have any questions about data quality assessment, improvement strategies, or tools?";
        } else if (message.includes('integrity')) {
            response = "Data integrity refers to the accuracy and consistency of data over its entire lifecycle. It ensures that data remains unchanged and reliable from creation to storage and retrieval. Data integrity is essential for maintaining trust in data-driven processes and systems. Would you like to know more about techniques for ensuring data integrity, such as cryptographic hashing, checksums, or digital signatures?";
        } else if (message.includes('data bias')) {
            response = "Data bias refers to systematic errors in data collection or analysis that result in unfair or inaccurate outcomes. It can occur due to factors such as sampling bias, algorithmic bias, or human biases in decision-making. Addressing data bias is crucial for ensuring fairness and equity in AI systems and data-driven applications. Do you want to learn more about detecting, mitigating, and preventing data bias?";
        } else {
            response = "I'm sorry, I didn't understand that. Could you please provide more details or ask a specific question? Feel free to inquire about blockchain, data validation standards, EDA reports, IPFS, or any other related topics!";
        }

        return response;
    }
});