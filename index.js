import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as TaskController from './controllers/TaskController.js';



mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log('DB ok'))
  .catch((error) => console.log('DB error', error))

const app = express();

app.use(express.json());


app.use(cors());


app.post('/task-list', cors(), TaskController.newTask);
app.get('/task-list', cors(), TaskController.allTasks);
app.patch('/task-list/:id', cors(), TaskController.completeTask);
app.patch('/task-list/update/:id', cors(), TaskController.updateTask);
app.delete('/task-list/:id', cors(), TaskController.deleteTask);



app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK')
});

