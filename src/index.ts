import express, { Express, Request, Response, NextFunction } from "express";


import healthRouter from "./routes/healthRoute";
import dialogflowRouter from "./routes/dialogflowRoute";
import { loadEnvVariables } from "./utils/utils";

const app: Express = express();

// Settings
app.use(express.json());
app.use(express.urlencoded());
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Path: ${req.path} with the method ${req.method}.`);
    next();
});

const envVariables = loadEnvVariables();

const PORT: string = envVariables.PORT || "5000";

app.use('/', healthRouter);
app.use('/dialogflow', dialogflowRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}.`);
});
