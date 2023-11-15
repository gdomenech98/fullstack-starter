import testRouter from "./testRouter";
import express from 'express';
import { createAPI, authRouter, MongoDB } from "sixedge";

require('dotenv').config({ path: __dirname + '/../../../.env' });


const loadIndexes = async () => {
    try {
        const mongodb = await MongoDB.connect(process.env.DB_URI);
        mongodb.generateIndex("users", "id", "unique")
        mongodb.generateIndex("users", "identifier", "unique")
    } catch (e) {
        console.log()
    }
}

const router = express.Router();
const initializeRouters = async () => {
    // PUT HERE YOUR ROUTERS
    const routerUsers = await createAPI("users", null, null) // Creates auto api for users
    router.use('/', testRouter);
    router.use('/', routerUsers);
    authRouter(router)
}

loadIndexes();
initializeRouters();

export default router 