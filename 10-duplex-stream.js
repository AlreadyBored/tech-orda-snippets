import  { Duplex }  from 'stream';

class EchoStream extends Duplex {
  constructor(options) {
    super(options);
  }

  // Readable side of the stream, it just returns the data
  _read(size) {
     // some custom logic to read data can be here
  }

  // Writable side of the stream
  _write(chunk, encoding, callback) {
    console.log('Data received:', chunk.toString());
    this.push(chunk);
    callback();
  }
}

const echoStream = new EchoStream();

// Get data via Readable interface
echoStream.on('data', (chunk) => {
  console.log(`Echo: ${chunk.toString()}`);
});

// Send data via Writable interface
echoStream.write('Hello, world!');

// Close the stream
echoStream.on('end',() => {
  console.log('Stream finished');
});