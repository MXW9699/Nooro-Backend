import express, { Request , Response} from 'express'
import { StatusCodes } from 'http-status-codes';
import {PrismaClient, type Task} from '@prisma/client'
export const taskRouter = express()

const db = new PrismaClient()
const { v4: uuidv4 } = require('uuid');

///get tasks
taskRouter.get('/', (_: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ data: 'get list of tasks' });  
  });

//POST /TASKS
taskRouter.post('/', async (_: Request, res: Response) => {
    try{
// Generate custom UUID (with the 'table.' prefix)
const customUUID = 'task.' + uuidv4().replace(/-/g, '');
    await db.task.create({data:{id: customUUID,name:''}})
    res.status(StatusCodes.OK).json({ data: 'post of tasks' }); }
    catch(e){
    res.status(StatusCodes.BAD_REQUEST).json({data:e})}
})

//PUT /TASKS
taskRouter.put('/:id', (_: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ data: 'edit list of tasks' });  
  });

//DELETE /TASKS
taskRouter.delete('/:id', (_: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ data: 'delete list of tasks' });  
  });


