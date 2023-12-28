import React from 'react'
import ItemTask from './ItemTask'

const ListToDo = ({tasks,deleteTask}) => {
    
    const tasksEl = tasks.map((task, i) =>(<ItemTask deleteTask={deleteTask} me = {task} key={i} />))
  return (
    <div >
        {tasksEl}
    </div>
  )
}

export default ListToDo