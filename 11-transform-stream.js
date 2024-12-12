import { Transform } from 'node:stream';
import { createGzip, createGunzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

const readable = process.stdin;
const writable = process.stdout;

// 1. Custom transform stream
class TransformStream extends Transform {
    constructor(options = {}) {
        super(options);
    }

    _transform(chunk, encoding, cb) {
        const chunkStringified = chunk.toString();

        const reversedChunk = chunkStringified.split('').reverse().join('');

        this.push(reversedChunk + '\n');

        cb();
    }

    _flush(cb) {
        this.push('\nSome\n');
        this.push('Additional\n');
        this.push('Data\n');
        this.push('From _flush\n');
        cb();
    }
};

const transform = new TransformStream();

// readable.pipe(transform).pipe(writable);

// 2. Simplified transform stream syntax

const transformSimplified = new Transform({
    transform(chunk, enc, cb) {
        const chunkStringified = chunk.toString().trim();

        const reversedChunk = chunkStringified.split('').reverse().join('');

        //this.push(reversedChunk + '\n');

        cb(null, reversedChunk + '\n');
    },
});


const transform2 = new TransformStream();

// readable.pipe(transform).pipe(writable);

// 2. Compress and decompress data using Node.js inbuilt transform streams

const gzip = createGzip();
const gunzip = createGunzip();

const readableSource = createReadStream('./toArchive.txt');
const compressedDestination = createWriteStream('./toArchive.gz');

await pipeline(
    readableSource,
    gzip,
    compressedDestination
);

const compressedSource = createReadStream('./toArchive.gz');
const decompressedDestination = createWriteStream('./decompressed.txt');

await pipeline(
    compressedSource,
    gunzip,
    decompressedDestination,
); 