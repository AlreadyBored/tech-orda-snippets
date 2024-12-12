import { Buffer } from 'node:buffer';

// 1. Creating a buffer
const buffer = Buffer.alloc(10); // 10 bytes buffer with zeros

const unsafeBuffer = Buffer.allocUnsafe(10); // 10 bytes buffer with random data

const bufferFromString = Buffer.from('Hello, Node.js!'); // Buffer from string

const bufferFromArray = Buffer.from([1, 2, 3, 4, 5]); // Buffer from array

// 2. Buffer operations

// 2.1. Reading from buffer
console.log(bufferFromString.toString()); // Hello, Node.js!

// 2.2 Joining buffers
const buffer1 = Buffer.from('Hello, ');
const buffer2 = Buffer.from('Node.js!');
const buffer3 = Buffer.concat([buffer1, buffer2]);

console.log(buffer3.toString()); // Hello, Node.js!

// 2.3. Slicing buffer

const buffer4 = Buffer.from('Hello, Node.js!');
const buffer5 = buffer4.subarray(2, 11);

console.log(buffer5.toString()); // llo, Node

// 2.4. Iterating over buffer

for (const bufferPart of bufferFromArray) { 
    console.log(bufferPart);
}