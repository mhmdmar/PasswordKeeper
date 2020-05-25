import * as http from "http";
import {app} from "./app";
import {databaseHelperSQL} from "./Database/databaseHelper";
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.on("close", function() {
    // Save the database on server close event
    databaseHelperSQL.closeConnection();
});

process.on("SIGINT", function() {
    server.close();
});

const runServer = () => {
    console.log("Server is running on port" + port);
    console.log(".....");
    databaseHelperSQL.connect();
    server.listen(port);
};

runServer();
