const http = require('http');
const app = require('./app');
const DB = require('./DatabaseHelper');
const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.on('close', function () {
  // Save the database on server close event
  DB.saveDB();
});

process.on('SIGINT', function () {
  server.close();
});
console.log('Server is running on port' + port);
console.log('.....');
server.listen(port);
