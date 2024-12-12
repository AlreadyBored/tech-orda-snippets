import { Writable, pipeline } from 'node:stream';
import fs from 'node:fs';

// 1. Create ready-made writable stream and write to file
const writable = fs.createWriteStream('./output.txt');

// 2. Writing data to the stream
writable.write('Some\n');
writable.write('chunk\n');
writable.write('of\n');
writable.write('data\n');
writable.end('End of stream\n');

// writable.write('This will not be written\n'); // Error: write after end

// 3. Writing user input from CLI to the stream
const userInputWriter = fs.createWriteStream('./userInput.txt');

// process.stdin.pipe(userInputWriter);

// 4. Custom writable stream

class WriteStream extends Writable {
    constructor(filename, options) {
        super(options);
        this.filename = filename;
    }

    _construct(callback) {
        fs.open(this.filename, 'a', (err, fd) => {
            if (err) {
                callback(err);
            } else {
                console.log('fd', fd);
                this.fd = fd;
                callback();
            }
        });
    }

    _write(chunk, encoding, callback) {
        fs.write(this.fd, chunk, callback);
    }

    _destroy(err, callback) {
        if (this.fd) {
            fs.close(this.fd, (er) => callback(er || err));
        } else {
            callback(err);
        }
    }

}

const ws = new WriteStream('output_2.txt');

pipeline(
    process.stdin,
    ws,
    err => {
        console.error(err);
    }
)
