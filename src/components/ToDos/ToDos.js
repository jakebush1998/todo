import React, { useState, useEffect } from 'react'
import axios from 'axios' 
import { Container } from 'react-bootstrap' 
import { useAuth } from '../../contexts/AuthContext' 
import SingleToDo from './SingleToDo';
import FilterCat from './FilterCat';
import ToDoCreate from './ToDoCreate';


export default function ToDos() {
  //hook to store data from the api 
  const [todo, setTodo] = useState([]);

  const { currentUser } = useAuth()

  const [showCreate, setShowCreate] = useState(false);

        //Filtering steps - use .filter() to create a limited list of resources.
        //1. Create a hook that will store values for what the user wants to filter resources by...this hook will store the categoryId for the category they want to filter by.
        //2. place the conditional rendering for when filter === 0 in the initial map of resources
        //3. Create FilterCat to give the buttons to the user to filter by
        //4. Render in resources...see below
        //5. Create the conditional rendering for when filter != 0...see below

        const [filter, setFilter] = useState(0);


  const getTodo = () => {
    axios.get(`https://localhost:7116/api/ToDos`).then(response => {
      console.log(response) 
      setTodo(response.data) 
    })
  }

  useEffect(() => {
    getTodo()
  }, [])

  return (
    <section className='todos'>
        <article className="bg-info p-5">
          <h1 className="text-center">Todo Dashboard</h1>
        </article>
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
          <div className="bg-dark p-2 mb-3 text-center">
            <button className="btn btn-info" onClick={() => setShowCreate(!showCreate)}>
              {!showCreate ? 'Create New ToDo' : 'Close Form'}
            </button>
            <div className="createContainer">
              {showCreate && 
                  <ToDoCreate getTodo={getTodo} setShowCreate={setShowCreate} />
              }
            </div>
          </div>
        }
        <FilterCat setFilter={setFilter} />
        <Container>
            <article className='todoGallery row justify-content-center'>
              {filter === 0 ? todo.map(x => 
                  <SingleToDo 
                      key={x.todoId}
                      todo={x}
                      getTodo={getTodo} />
              ) :
              todo.filter(x => x.categoryId === filter).map(x => 
                  <SingleToDo 
                      key={x.todoId}
                      todo={x}
                      getTodo={getTodo} />
              )
              }
              {filter !== 0 && todo.filter(x => x.categoryId === filter).length === 0 &&
                  <h2 className='alert alert-warning text-dark'>
                    There are no results for this category.
                  </h2>  
              }
            </article>
        </Container>
    </section>
  )
}
