import React, { useState, useEffect} from 'react'
//npm install axios for package that retrieves data from the API and makes other requests such as Post, Put, Delete 
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'
import { Container } from 'react-bootstrap' 
import SingleCategory from './SingleCategory';
import CatCreate from './CatCreate';

export default function Categories() {

  const [categories, setCategories] = useState([]);

  const { currentUser } = useAuth()

  const [showCreate, setShowCreate] = useState(false);

  const getCategories = () => {
    axios.get(`https://localhost:7116/api/Categories`).then(response => {
      console.log(response)
      setCategories(response.data)
    })
  }

  useEffect(() => {
    getCategories()
  }, [])

  
  return (
    <section className="categories">
      <article className="bg-info p-5">
        <h1 className="text-center">Categories Dashboard</h1>
      </article>

      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
          <div className="bg-dark p-2 mb-3 text-center">
            {showCreate ? 
              <>
                  <button onClick={() => setShowCreate(false)} className='btn btn-warning'>Cancel</button>
                  <CatCreate
                      getCategories={getCategories}
                      setShowCreate={setShowCreate} />
              </>
              : <button onClick={() => setShowCreate(true)} className="btn btn-info">Create Category</button>
            }
          </div>
      }



      <Container className='p-2'>
        <table className='table bg-info table-dark my-3'>
          <thead className="table-secondary text-uppercase">
            <tr>
              <th>Category</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(x => 
                <SingleCategory 
                  key={x.categoryId}
                  category={x}
                  getCategories={getCategories} />
              )}
          </tbody>
        </table>
      </Container>
    </section>
  )
}
