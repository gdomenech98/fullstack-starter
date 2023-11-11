import testRouter from "./testRouter";
import express from 'express';
import {createAPI, authRouter, MongoDB} from "@sixedge/libs";
require('dotenv').config({ path: __dirname+'/../../../.env' });

const router = express.Router();
const routerUsers = createAPI("users", null) // Creates auto api for users

const loadIndexes = async () => {
    const mongodb = await MongoDB.connect(process.env.DB_URI);
    mongodb.generateIndex("users", "id", "unique")
    mongodb.generateIndex("users", "email", "unique")
}

loadIndexes();
router.use('/', testRouter);
router.use('/', routerUsers);
authRouter(router)
export default router 