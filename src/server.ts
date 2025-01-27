import express from "express";

import { taskRouter } from "./Routers/TaskRouter";

const app = express();
const PORT = 4000;
app.use(express.json());
app.use(express.urlencoded());

app.use("/tasks", taskRouter);

//TODO: global error handler

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
