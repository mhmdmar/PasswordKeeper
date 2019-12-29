import http from 'http';
import { app } from './app.mjs';
import { databaseHelperSQL } from './DatabaseHelperSQL.mjs';
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.on('close', function() {
    // Save the database on server close event
    databaseHelperSQL.closeConnection();
    databaseHelper.saveDB();
});

process.on('SIGINT', function() {
    server.close();
});

const runServer = () => {
    console.log('Server is running on port' + port);
    console.log('.....');
    databaseHelperSQL.connect();
    server.listen(port);
};

runServer();
