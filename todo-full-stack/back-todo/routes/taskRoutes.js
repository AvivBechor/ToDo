const express = require('express')
const taskController = require("../controllers/taskController")
const router = express.Router()

router.route('/complete/:taskNo')
.get(taskController.completeTaskByTaskNo)

router.route('/')
.get(taskController.getTasks)

router.route('/:taskNo')
.get(taskController.getTask)

router.route('/delete/:taskNo')
.get(taskController.removeTaskByTaskNo)

router.route('/new')
.post(taskController.addTask)

module.exports = router
