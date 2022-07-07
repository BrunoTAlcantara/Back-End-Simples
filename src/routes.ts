import express from 'express';
import { PrismaClient } from '@prisma/client';

const alRoutes = express.Router();

const prisma = new PrismaClient();


//C
alRoutes.post("/to", async (request,response) => {
  const { name } = request.body;
  const todo =  await prisma.todo.create({
    data:{
      name,
      status:false,
  }})
 
  return response.status(201).json(todo);

})

//R
alRoutes.get("/to", async (request,response) => {
  const todos = await prisma.todo.findMany()
  return response.status(200).json(todos);
})
//U
alRoutes.put("/to", async (request, response) => {
    const {id,name,status} = request.body

    if(!id) {
      return response.status(400).json("ID IS MANDATORY")
    }
    const todoAlereadyExists = await prisma.todo.findUnique({where: {id}})
    if(!todoAlereadyExists) {
      return response.status(400).json("TODO NOT EXIST")
    }
    const todo = await prisma.todo.update({
      where:
      {
        id
      },
      data: {
        name,
        status
      },
    })
    return response.status(200).json(todo)
})
//D

alRoutes.delete("/to/:id", async (request, response) => {
 const { id } = request.params
 const intId = parseInt(id)
 if(!intId) {
  return response.status(400).json("ID IS MANDATORY")
}
const todoAlereadyExists = await prisma.todo.findUnique({where: {id:intId}})
if(!todoAlereadyExists) {
  return response.status(400).json("TODO NOT EXIST")
}
 await prisma.todo.delete({where: {id:intId}})
 return response.status(200).send()
})

export {alRoutes};