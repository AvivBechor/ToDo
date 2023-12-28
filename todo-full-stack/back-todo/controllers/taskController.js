const Task = require('./../models/taskModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require("./../utils/AppError")

exports.getTasks = catchAsync( async (req, res, next) =>{
    const tasks = await Task.find()
        res.status(200).json({
            status: 'success',
            data: tasks
        })
    }
    )
 exports.getTask =catchAsync( async (req, res, next) =>{
        //here access db to bring users
        const id = req.params.taskNo
        const task = await Task.findOne({taskNo:id})
                res.status(200).json({
                    status: 'success',
                    task
                })
            
            }
 )

 exports.addTask = catchAsync( async (req, res, next) =>{
    console.log(req.body)
    const newTask = await Task.create(req.body)
    
    res.status(201).json({
        status: 'success',
        data: newTask,
        message: 'The new task has been created successfully'
    })
}
)

exports.completeTaskByTaskNo = catchAsync( async (req, res, next) =>{

    const id = req.params.taskNo
    const task = await Task.findOne({taskNo:id})
    const newValues = {$set:{currentStatus:!task.currentStatus}}
    await Task.updateOne({taskNo:id}, newValues)
    res.status(201).json({
        status: 'success',
        message: `Task ${id} has been completed successfully`
    })
}
)

exports.removeTaskByTaskNo = catchAsync( async (req, res, next) =>{

    const no = req.params.taskNo
    await Task.deleteOne({taskNo:no})
    res.status(201).json({
        status: 'success',
        message: `Task ${no} has been deleted successfully`
    })
}
)