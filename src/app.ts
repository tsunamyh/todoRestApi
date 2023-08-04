import todoRoutes from './routes/todos';
import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
const PORT : number = 3000
const app = express()

app.use(express.json())
app.use('/todos', todoRoutes);

app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
  res.status(500).json({ message: err.message });
});

const server =  http.createServer(app)

server.listen(PORT,()=>{
  console.log(`server is listening on port ${PORT}`);
  
})



