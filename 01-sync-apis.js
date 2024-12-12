import {
    mkdirSync,
    writeFileSync,
    statSync,
    readFileSync,
} from 'node:fs';
import path from 'node:path';

const pathToDataFolder = path.resolve('data');
const pathToFile = path.join(pathToDataFolder, 'helloWorld.txt');

// 1. Create folder "data"
mkdirSync(pathToDataFolder);

// 2. Create file "helloWorld.txt" in "data" folder with content "Hello, Node.js!"
writeFileSync(pathToFile, 'Hello, Node.js!');

// 3. Get stats of the file
const stats = statSync(pathToFile);

console.log('Stats:\n', stats);

// 4. Read the content of the file
const fileContent = readFileSync(pathToFile, { encoding: 'utf-8' });

console.log('File content:\n', fileContent);

// 5. Handle errors with sync APIs 
try {
    readFileSync('non-existing-file.txt', { encoding: 'utf-8' });
} catch (err) {
    console.log('Error occured!');
    console.log(err.message);
} finally {
    console.log('Done!');
}
