import { readFile as readFileCallback } from 'node:fs';
import { readFile as readFilePromises } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const pathToDataFolder = path.resolve('data');
const pathToFile = path.join(pathToDataFolder, 'helloWorld.txt');

readFileCallback(pathToFile, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
        console.log('Error occured!\n', err.message);
        return;
    }
    console.log('File content:\n', data);
});


// 1. Promisifying the fs.readFile function using pure JS

const promisifyCallbackFunc = (callbackFunc) => {
    return (...args) => {
        return new Promise((resolve, reject) => {
            callbackFunc(...args, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    };
};

const readFilePromisified1 = promisifyCallbackFunc(readFileCallback);

// 2. Promisifying the fs.readFile function using util.promisify

const readFilePromisified2 = promisify(readFileCallback);

// 3. Simply using the promisified function from node:fs/promises

// 4. Checking if the promisified functions work

console.time('Sequential reading');

const content1 = await readFilePromisified1(pathToFile, { encoding: 'utf-8' });
const content2 = await readFilePromisified2(pathToFile, { encoding: 'utf-8' });
const content3 = await readFilePromises(pathToFile, { encoding: 'utf-8' });

console.timeEnd('Sequential reading');

console.log('Content 1:\n', content1);
console.log('Content 2:\n', content2);
console.log('Content 3:\n', content3);


