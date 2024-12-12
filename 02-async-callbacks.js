import {
    mkdir,
    writeFile,
    stat,
    readFile,
} from 'node:fs';
import path from 'node:path';

const pathToDataFolder = path.resolve('data');
const pathToFile = path.join(pathToDataFolder, 'helloWorld.txt');

const handleError = (err) => {
    console.log('Error occured!');
    console.log(err.message);
};

// 1. Create folder "data"
mkdir(pathToDataFolder, (err) => {
    if (err) {
        handleError(err);
        return;
    }
    // 2. Create file "helloWorld.txt" in "data" folder with content "Hello, Node.js!"
    writeFile(pathToFile, 'Hello, Node.js!', (err) => {
        if (err) {
            handleError(err);
            return;
        }
        // 3. Get stats of the file
        stat(pathToFile, (err, stats) => {
            if (err) {
                handleError(err);
                return;
            }

            console.log('Stats:\n', stats);

            // 4. Read the content of the file
            readFile(pathToFile, { encoding: 'utf-8' }, (err, data) => {
                if (err) {
                    handleError(err);
                    return;
                }

                console.log('File content:\n', data);
            });
        });
    });
});