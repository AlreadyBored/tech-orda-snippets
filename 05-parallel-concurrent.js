
console.time('Sequential requests');

await fetch('https://jsonplaceholder.typicode.com/posts/1');
await fetch('https://jsonplaceholder.typicode.com/posts/2');
await fetch('https://jsonplaceholder.typicode.com/posts/3');
await fetch('https://jsonplaceholder.typicode.com/posts/4');
await fetch('https://jsonplaceholder.typicode.com/posts/5');

console.timeEnd('Sequential requests');


console.time('Concurrent requests');

await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/posts/1'),
    fetch('https://jsonplaceholder.typicode.com/posts/2'),
    fetch('https://jsonplaceholder.typicode.com/posts/3'),
    fetch('https://jsonplaceholder.typicode.com/posts/4'),
    fetch('https://jsonplaceholder.typicode.com/posts/5'),
]);

console.timeEnd('Concurrent requests');