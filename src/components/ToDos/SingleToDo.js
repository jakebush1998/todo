import React, { useState } from 'react'

import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'



export default function SingleToDo(props) {
    const {currentUser} = useAuth()

    const [showEdit, setShowEdit] = useState(false);

    const deleteTodo = (id) => {
        if(window.confirm('Are you done with this task?')) {
            axios.delete(`https://localhost:7116/api/ToDos/${id}`).then(() => {props.getTodo()})
        }
    }

  return (
    <div className="singleToDo col-md-5 m-4">
        <h3>{props.todo.name}</h3>
        <p>{props.todo.done}</p>
        
        
    </div>
  )
}
