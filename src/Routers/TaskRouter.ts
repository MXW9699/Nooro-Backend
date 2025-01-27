import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createTask,
  deleteTask,
  editTask,
  getAllTasks,
  getTask,
} from "../Controllers/TaskController";
import { handleError } from "../Controllers/ErrorController";
export const taskRouter = express();

///get tasks
taskRouter.get("/", async (_: Request, res: Response) => {
  try {
    const data = await getAllTasks();
    res.status(StatusCodes.OK).json({ data });
  } catch (e: any) {
    handleError(e, res);
  }
});

taskRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await getTask(id);
    res.status(StatusCodes.OK).json({ data });
  } catch (e) {
    handleError(e, res);
  }
});

//POST /TASKS
taskRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { title, color } = req.body;
    if (!title || !color) {
      throw new TypeError("Both 'title' and 'color' fields are required");
    }
    if (typeof title !== "string") {
      throw new TypeError("'title' field needs to be a string");
    }
    if (color && typeof color !== "string") {
      throw new TypeError("'color' field needs to be a string");
    }
    const data = await createTask({ title, color });
    res.status(StatusCodes.OK).json({ data });
  } catch (e) {
    handleError(e, res);
  }
});

//PUT /TASKS
taskRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const { title, color, completed } = req.body;
    if (title && typeof title !== "string") {
      throw new TypeError("'title' field needs to be a string");
    }
    if (color && typeof color !== "string") {
      throw new TypeError("'color' field needs to be a string");
    }
    if (completed && typeof completed !== "boolean") {
      throw new TypeError("'completed' field needs to be a boolean");
    }
    const { id } = req.params;
    const data = await editTask({ id, title, color, completed });
    res.status(StatusCodes.OK).json({ data });
  } catch (e) {
    handleError(e, res);
  }
});

//DELETE /TASKS
taskRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteTask(id);
    res.status(StatusCodes.OK).json({ message: "Task Deleted Successfully" });
  } catch (e) {
    handleError(e, res);
  }
});
