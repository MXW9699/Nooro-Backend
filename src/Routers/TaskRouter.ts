import express, { Request , Response} from 'express'
import { StatusCodes } from 'http-status-codes';
import { createTask, deleteTask, editTask, getTasks } from '@src/Controllers/TaskController';
export const taskRouter = express()

///get tasks
taskRouter.get('/', async (_: Request, res: Response) => {
try{
  await getTasks()
}
catch(e){
  res.status(StatusCodes.BAD_REQUEST).json({data:e})
}  
  });

//POST /TASKS
taskRouter.post('/', async (req: Request, res: Response) => {
    try{
    const {title, color} = req.body
    const data = await createTask({title,color})
    res.status(StatusCodes.OK).json({ data}); }
    catch(e){
    res.status(StatusCodes.BAD_REQUEST).json({data:e})}
})

//PUT /TASKS
taskRouter.put('/:id', async (req: Request, res: Response) => {
    const {title,color,completed} = req.body
    const {id} = req.params
    const data = await editTask({id,title,color,completed})
    res.status(StatusCodes.OK).json({ data });  
  });

//DELETE /TASKS
taskRouter.delete('/:id', async (req: Request, res: Response) => {
  const {id} = req.params
  const data = await deleteTask({id})
    res.status(StatusCodes.OK).json({ data });  
  });


