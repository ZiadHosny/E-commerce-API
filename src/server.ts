import express from "express";
import morgan from "morgan";
import cors from 'cors'
import * as dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { getFromEnv } from "./utils/getFromEnv.js";
import { logBlueMsg, logErrMsg } from "./utils/console/log.js";
import { globalErrorMiddleware } from "./middleware/globalError.js";
import { AppError } from "./utils/ErrorHandler.js";
import appRouter from "./modules/app.router.js";

// Load Config
dotenv.config();
const { port, baseUrl, mode } = getFromEnv()

const app = express();

// Express Middlewares
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('Uploads'))

// Morgan
if (mode == "dev") {
    app.use(morgan("dev"));
}

// App Router
app.use("/api/v1", appRouter);

// Invaild Route
app.all("*", (req, _, next) => {
    next(new AppError(`can't find this route: ${req.originalUrl}`, 404));
});

// Global Error Middleware
app.use(globalErrorMiddleware);

// Connect To DB
dbConnection();

//Init Server
app.listen(port, baseUrl, () => logBlueMsg(`E-Commerce Api listening on port ${port}!`))

// Server Errors
process.on('unhandledRejection', (err) => {
    logErrMsg("unhandledRejection" + err)
})