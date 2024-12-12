import EventEmitter from 'node:events';

// Regular event handling

const emitter = new EventEmitter();

emitter.on('some-event', (eventPayload) => {
    console.log('Handler 1 received event with payload:\n', eventPayload);
});
emitter.on('some-event', (eventPayload) => {
    console.log('Handler 2 received event with payload:\n', eventPayload);
});
emitter.on('some-event', (eventPayload) => {
    console.log('Handler 3 received event with payload:\n', eventPayload);
});

emitter.emit('some-event', { message: 'This event is handled once' });

// Handling events only once

emitter.once('once-event', (payload) => {
    console.log('Once handler:\n', payload);
});

emitter.emit('once-event', {message: 'This event is handled only once'});
emitter.emit('once-event', {message: 'This event is not handled'});
emitter.emit('once-event', {message: 'This event is not handled too'});
