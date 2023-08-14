import mongoose from "mongoose";
import { logErrMsg, logSuccessMsg } from "../utils/console/log.js";
import { getFromEnv } from "../utils/getFromEnv.js";

export const dbConnection = () => {
    const { mongoDBUrl } = getFromEnv()
    
    mongoose.connect(mongoDBUrl).then((connection) => {
        logSuccessMsg(`Mongo connected successfully To Port ${connection.connections[0].host}`)
    }).catch((err) => {
        logErrMsg(`Error is ${err}`)
    })
}