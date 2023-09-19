const http = require('http');

const server = http.createServer((req, res) => {

  if(req.url === '/' && req.method === 'GET') {
    res.write('<h1>My first server!</h1>');
    res.end();
  }
  else if(req.url === 'about/' && req.method === 'GET') {
    res.write('<h1>About</h1>');
    res.end();
  }

  // ... then similar other routes

})

server.listen(8001, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${8001}`);
});