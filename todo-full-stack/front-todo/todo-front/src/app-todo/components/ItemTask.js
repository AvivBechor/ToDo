import React, { useState } from 'react'
import axios from "axios"
const serverURL = "http://127.0.0.1:3000"

const ItemTask = ({me, deleteTask}) => {
    const [currentStatus, setDone] = useState(me.currentStatus);
    const name = me.name
    const time = me.time
    const taskNo = me.taskNo
    
    const handleDeleteItem = () =>{
        deleteTask(taskNo)
    }
    const handleMarkAsDone = async () =>{
      me.currentStatus = !me.currentStatus
      setDone(me.currentStatus)
      await axios.get(`${serverURL}/api/tasks/complete/${me.taskNo}`).catch(err => window.alert(err.response.data.message))

    }
  return (
    <div className='d-flex mx-auto w-75 justify-content-center'>
        <label className='w-30 my-auto mx-auto'>{`#${taskNo}`}</label>
        <input  className='form-control w-75 m-1 {}' type="text"  value={name} disabled/>
        <input  className='form-control m-1 w-25' type="time"  value={time} disabled /> 
        <button onClick={handleMarkAsDone} type="button" className='btn btn-primary btn-sm m-2'> Complete </button>
        {(!me.currentStatus)&&<span onClick={handleDeleteItem} className='btn btn-danger m-1'> &#10006;</span>}
        {(me.currentStatus)&&<span className='text-success fs-3 m-1'> &#10004;</span>}

    </div>
  )
}

export default ItemTask