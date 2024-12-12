import { createInterface } from 'node:readline/promises';

const readable = process.stdin;
const writable = process.stdout;

const questionnaire = createInterface(readable, writable);

const questions = [
    'What is your name?',
    'Dogs or cats?',
    'What are your hobbies?',
    'Do you like Node.js?',
    'Where were you last night?'
];

const answersMap = new Map();

questionnaire.on('close', () => {
    console.log(answersMap);
});

const askQuestions = async () => {
    for (const question of questions) {
        const answer = await questionnaire.question(`${question}\n`);
        answersMap.set(question, answer);
    }

    questionnaire.close();
};

await askQuestions();
