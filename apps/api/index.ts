import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './src/routers';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json()) // Parse JSON requests
app.use("/", router);// Route definition
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});