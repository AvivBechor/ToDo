import React, { useState } from 'react'
import InputToDo from './components/InputToDo'
import ListToDo from './components/ListToDo'
import { sortBy } from 'lodash'
import axios from "axios"
import {useEffect} from "react"
const serverURL = "http://127.0.0.1:3000"
let currentID = 0

const AppToDo = () => {
    //read from database and initiater taskArray from it
    
    const [tasksArr, setTasksArr] = useState([])
    

    const handleCurrentID = (array) =>{
        currentID = Math.max(...array.map(task => task.taskNo)) + 1
        if(currentID === -Infinity) {currentID = 1}
    }
    const readTasks = async () => {
        
        const tasks = await axios.get(`${serverURL}/api/tasks/`)
        .catch(err => window.alert(err.response.data.message))
        setTasksArr(tasks.data.data)        
        handleCurrentID(tasks.data.data)
    }
    
    useEffect(() => {readTasks()},[])
    

    const addTask = async (task) =>{
        
        try{
            await axios.post(`${serverURL}/api/tasks/new`,{...task})
            setTasksArr(sortBy([...tasksArr, task], el =>el.time))
            handleCurrentID(tasksArr)
        }
        catch(err){window.alert(err.response.data.message)}
    

    }
    const deleteTask = async (id) =>{
        await axios.get(`${serverURL}/api/tasks/delete/${id}`).catch((err) => {window.alert(err.response.data.message)})
        const newTaskArr = tasksArr.filter(task => task.taskNo !== id)
        setTasksArr(newTaskArr) 
    }
    
    while(currentID>0)
  return (
      <div className='container border'>
          <h1 className='text-info fw-bold fs-1'>Do List🎯</h1>
          
          <InputToDo addTask={addTask} length = {currentID}/>
          <ListToDo deleteTask={deleteTask} tasks={tasksArr}/>
      </div>
    
  )
}

export default AppToDo