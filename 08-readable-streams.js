import fs from 'node:fs';
import { Readable } from 'node:stream';

// 1. Ready-made stream from fs module
/* const readable = fs.createReadStream('./loremIpsum.txt');

// 2. Processing chunks of data
readable.on('data', (chunk) => {
    console.log(chunk.toString());
});

// 3. Handle end of stream
readable.on('end', () => {
    console.log('Stream ended');
}); */

// 4. Custom Readable stream: extending Readable class

const customDataSource = Array.from({ length: 10000 }, (_, i) => String(i + 1));

class ArrayReader extends Readable {
    constructor(data, options) {
        super(options);
        this.data = data;
        this.readCounter = 0;
    }

    _read() {
        this.readCounter++;
        this.emit('my-awesome-event', this.readCounter);
        if (this.data.length === 0) {
            // Null is passed to indicate the end of the stream
            this.push(null);
        } else {
            this.push(this.data.shift() + '\n');
        }
    }

    _destroy(err, callback) {
        console.log('Stream destroyed');
        console.log(`_read ${this.readCounter} times`);
        callback(err);
    }
}


const arrayReaderStream = new ArrayReader(customDataSource, { encoding: 'utf-8' });


// arrayReaderStream.pipe(process.stdout);

// 5. Creating custom readable stream using short syntax
const shortCustomReadable = new Readable({
    read() {
        this.push('Let\n');
        this.push('me\n');
        this.push('stream\n');
        this.push('this\n');
        this.push('text\n');

        this.push(null);
    },

    destroy(err, callback) {
        console.log('Stream destroyed');
        callback(err);
    }
});

//shortCustomReadable.pipe(process.stdout);

// 6. Read file using custom readable stream

class FileReadStream extends Readable {
    constructor(filename) {
        super();
        this.filename = filename;
        this.fd = null;
    }

    _construct(callback) {
        fs.open(this.filename, (err, fd) => {
            if (err) {
                callback(err);
            } else {
                this.fd = fd;
                callback();
            }
        });
    }

    _read(n) {
        const buf = Buffer.alloc(n);
        fs.read(this.fd, buf, 0, n, null, (err, bytesRead) => {
            if (err) {
                this.destroy(err);
            } else {
                this.push(bytesRead > 0 ? buf.subarray(0, bytesRead) : null);
            }
        });
    }

    _destroy(err, callback) {
        if (this.fd) {
            fs.close(this.fd, (er) => callback(er || err));
        } else {
            callback(err);
        }
    }
}

const customFileReadStream = new FileReadStream('./loremIpsum.txt');

customFileReadStream.pipe(process.stdout);