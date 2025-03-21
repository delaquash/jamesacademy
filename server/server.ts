import dotenv from "dotenv";
dotenv.config();
import http from "http";
import { app } from "./app.js";

export const server = http.createServer(app);

// start server
server.listen(process.env.PORT, () =>{ 
    console.log(`Server is running on port ${process.env.PORT}`)
});

