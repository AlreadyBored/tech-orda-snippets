import {
    mkdir,
    writeFile,
    stat,
    readFile,
} from 'node:fs/promises';
import path from 'node:path';

const pathToDataFolder = path.resolve('data');
const pathToFile = path.join(pathToDataFolder, 'helloWorld.txt');

// Syntax without async/await

// 1. Create folder "data"
mkdir(pathToDataFolder)
    // 2. Create file "helloWorld.txt" in "data" folder with content "Hello, Node.js!"
    .then(() => writeFile(pathToFile, 'Hello, Node.js!'))
    // 3. Get stats of the file
    .then(() => stat(pathToFile))
    // 4. Print stats
    .then((stats) => {
        console.log('Stats:\n', stats);
    })
    // 5. Read the content of the file
    .then(() => readFile(pathToFile, { encoding: 'utf-8' }))
    // 6. Print file content
    .then((fileContent) => {
        console.log('File content:\n', fileContent);
    })
    // 7. Handle errors with promises-based APIs
    .catch((err) => {
        console.log('Error occured!');
        console.log(err.message);
    })
    // 8. Finally block, executed regardless of the outcome
    .finally(() => {
        console.log('Done!');
    });

// Syntax with async/await

// 1. Create folder "data"
await mkdir(pathToDataFolder);

// 2. Create file "helloWorld.txt" in "data" folder with content "Hello, Node.js!"
await writeFile(pathToFile, 'Hello, Node.js!');

// 3. Get stats of the file
const stats = await stat(pathToFile);

console.log('Stats:\n', stats);

// 4. Read the content of the file
const fileContent = await readFile(pathToFile, { encoding: 'utf-8' });

console.log('File content:\n', fileContent);

// 5. Handle errors with promises-based APIs

try {
    await readFile('non-existing-file.txt', { encoding: 'utf-8' });
} catch (err) {
    console.log('Error occured!');
    console.log(err.message);
}