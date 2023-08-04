// import express, { Request, Response, NextFunction } from 'express';

// export const createTodo = (req: Request, res: Response, next: NextFunction) => {

// }
import { RequestHandler } from 'express';

import { Todo } from '../models/todo';
const TODOS: Todo[] = [];
export const createTodo: RequestHandler = function (req, res, next) {
  let body = req.body as { text: string }
  const text = body.text;
  const newTodo = new Todo(Math.floor(Math.random()*100000).toString(), text);
  TODOS.push(newTodo);

  res.status(201).json({ message: 'Created the todo.', createdTodo: newTodo });
}
export const getTodo: RequestHandler = function (req, res, next) {
  res.status(200).json({ todos: TODOS })
}
export const updateTodo: RequestHandler<{ id: string }> = function (req, res, next) {
  let body: { text: string } = req.body
  const todoId = req.params.id;
  const updatedText = body.text;
  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
  if (todoIndex === -1) {
    throw new Error ("ID is not available")
  }
  TODOS[todoIndex] = new Todo(todoId, updatedText)
  res.status(201).json({ message: 'Updated!', updatedTodo: TODOS[todoIndex] })
}

export const deleteTodo:RequestHandler<{id: string}> = function (req,res,next) {
  const todoId = req.params.id;
  const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
  if (todoIndex === -1) {
    throw new Error ("ID is not available")
  }
  TODOS.splice(todoIndex,1)
  res.json({message:`message deleted with id: ${todoId}`})
}