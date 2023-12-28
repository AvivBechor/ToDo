import React, { useState } from 'react'


const InputToDo = ({addTask,length}) => {
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, 
      hour: "numeric", 
      minute: "numeric"});
    const [name, setName] = useState('')
    const [time, setTime] = useState(currentTime)
    const [count, setCount] = useState(length)
    
    const handlNameInput = (event)=>{
        setName(event.target.value)
    }
    const handlTimeInput = (event)=>{
        setTime(event.target.value)
    }
    const handleFormSubmit = (event) =>{
        event.preventDefault()
        const task = {name, time, taskNo: count, currentStatus: false}
        //sent it to AppToDo
      addTask(task)
      setName('')
      setTime(currentTime)
      setCount(count + 1)
      
    }
  
  return (
    <div className='p-3 bg-secondary'>
        <form onSubmit={handleFormSubmit} className='d-flex justify-content-center'>
            <input onChange={handlNameInput} className='form-control w-75 mx-1' type="text" placeholder='type here...'value={name} />
            <input onChange={handlTimeInput} className='form-control  mx-1 w-25' type="time"  value={time} />
            <input type='submit' className='btn btn-success mx-1' value='Add Task👍' />
        </form>
    </div>
  )
}

export default InputToDo