import express, { Request , Response} from 'express'
import { StatusCodes } from 'http-status-codes';
import {PrismaClient, type Task} from '@prisma/client'
import { v4 as uuidv4 } from 'uuid';
export const taskRouter = express()

const db = new PrismaClient()

///get tasks
taskRouter.get('/', async (_: Request, res: Response) => {
try{
  const tasks = await db.task.findMany()
  res.status(StatusCodes.OK).json({ data: tasks });
}
catch(e){
  res.status(StatusCodes.BAD_REQUEST).json({data:e})
}  
  });

//POST /TASKS
taskRouter.post('/', async (req: Request, res: Response) => {
    try{
// Generate custom UUID (with the 'table.' prefix)
    const customUUID = 'task.' + uuidv4().replace(/-/g, '');
    const {title, color} = req.body
    const data = await db.task.create({data:{id: customUUID,title,color}})
    res.status(StatusCodes.OK).json({ data}); }
    catch(e){
    res.status(StatusCodes.BAD_REQUEST).json({data:e})}
})

//PUT /TASKS
taskRouter.put('/:id', async (req: Request, res: Response) => {
    const {title,color,completed} = req.body
    const {id} = req.params
    const data = await db.task.update({where: {id }, data:{title,color,completed}})
    res.status(StatusCodes.OK).json({ data });  
  });

//DELETE /TASKS
taskRouter.delete('/:id', async (req: Request, res: Response) => {
  const {id} = req.params
  const data = await db.task.delete({where: {id }})
    res.status(StatusCodes.OK).json({ data });  
  });


