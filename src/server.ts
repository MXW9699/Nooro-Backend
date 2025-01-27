import express, {Request, Response, NextFunction } from "express";

import { taskRouter } from "./Routers/TaskRouter";

const app = express();
const PORT = 4000;
app.use(express.json());
app.use(express.urlencoded());

app.use("/tasks", taskRouter);


// Custom Error Object Type
interface CustomError {
  log?: string; // Optional log message for internal use
  status?: number; // HTTP status code
  message?: { err: string } | string; // The message can be a string or an object with { err: string }
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultErr: CustomError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'this is the global error' }
  };
  const errorObj = { ...defaultErr, ...err };
  console.error(errorObj.log);
  res.status(errorObj.status || 500).json(errorObj.message || { err: 'Unknown error' });
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
