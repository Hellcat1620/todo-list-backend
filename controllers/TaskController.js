import TaskModel from '../models/Task.js';


export const newTask = async (req, res) => {
  try {
    const doc = new TaskModel({
      text: req.body.text,
      isComplete: req.body.isComplete,
      tag: req.body.tag,
    })

    const task = await doc.save();

    return res.json(task)
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать задачу',
    });
  }
};

export const allTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find()

    return res.json(tasks)
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить список задач',
    });
  }
};

export const completeTask = async (req, res)  => {
  try {
    const taskId = req.params.id;
    const status = await TaskModel.findById({_id: taskId})
    if (status.isComplete == true) {
      await TaskModel.updateOne(
        {_id: taskId},
        { isComplete: false }
      )
      return res.json({
        message: 'Выполнение задачи отменено'
      })
    } else {
      await TaskModel.updateOne(
        { _id: taskId },
        { isComplete: true }
      )
      return res.json({
        message: 'Задача выполнена'
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось обновить задачу',
    });
  }
}
export const updateTask = async (req, res)  => {
  try {
    const taskId = req.params.id;
    if (req.body.text) {
      await TaskModel.updateOne(
        {_id: taskId},
        { text: req.body.text }
      )
      return res.json({
        message: 'Задача отредактирована'
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось обновить задачу',
    });
  }
}

export const deleteTask = async (req, res)  => {
  try {
    const taskId = req.params.id;
    
    TaskModel.findOneAndDelete(
      {
        _id: taskId,
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: 'Не удалось удалить задачу',
          });
        }

        if(!doc) {
          return res.status(404).json({
            message: 'Не удалось найти задачу',
          });
        }

        res.json({
          saccess: true
        })
      })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось удалить задачу',
    });
  }
}
