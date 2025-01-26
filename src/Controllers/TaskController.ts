import express, { Request , Response} from 'express'
import {PrismaClient, type Task} from '@prisma/client'
import { v4 as uuidv4 } from 'uuid';

const db = new PrismaClient()

export async function getTasks():Promise<Task[]>{
  const tasks = await db.task.findMany()
  return tasks
}

export async function createTask({title,color,completed=false}:{title:string, color:string, completed?:boolean}):Promise<Task>{
   const customUUID = 'task.' + uuidv4().replace(/-/g, '');
  const data = {id: customUUID, title,color,completed}
  const task = await db.task.create({data})
  return task
}

export async function editTask({id,title,color,completed}:{id: string, title?:string, color?:string, completed?:boolean}):Promise<Task>{
  const task = await db.task.update({where: {id }, data:{title,color,completed}})
  return task
}

export async function deleteTask({id}:{id:string}){
  await db.task.delete({where: {id }})
}