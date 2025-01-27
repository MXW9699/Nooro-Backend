import { PrismaClient, type Task } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const db = new PrismaClient();

export async function getTask(id: string): Promise<{ task: Task | null }> {
  const task = await db.task.findFirst({ where: { id } });
  return { task };
}

export async function getAllTasks(): Promise<{
  tasks: Task[];
  completedCount: number;
}> {
  const tasks = await db.task.findMany();
  const completedCount = await db.task.count({
    where: {
      completed: true,
    },
  });
  return { completedCount, tasks };
}

export async function createTask({
  title,
  color,
  completed = false,
}: {
  title: string;
  color: string;
  completed?: boolean;
}): Promise<Task> {
  const customUUID = "task." + uuidv4().replace(/-/g, "");
  const data = { id: customUUID, title, color, completed };
  const task = await db.task.create({ data });
  return task;
}

export async function editTask({
  id,
  title,
  color,
  completed,
}: {
  id: string;
  title?: string;
  color?: string;
  completed?: boolean;
}): Promise<Task> {
  const task = await db.task.update({
    where: { id },
    data: { title, color, completed },
  });
  return task;
}

export async function deleteTask(id: string): Promise<{ task: Task }> {
  const task = await db.task.delete({ where: { id } });
  return { task };
}
