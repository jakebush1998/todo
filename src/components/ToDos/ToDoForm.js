import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik' 
import { todoSchema } from '../../utilities/validationSchema'
import axios from 'axios'



export default function ToDoForm(props) {
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        axios.get(`https://localhost:7116/api/Categories`).then(response => setCategories(response.data))
    }
    const handleSubmit = (values) => {
        console.log(values)
        if(!props.todo){
            const todoToCreate = values

            axios.post(`https://localhost:7116/api/ToDos`,todoToCreate).then(() => {
                props.getTodos()
                props.setShowCreate(false)
            })
        }
        else {
            const todoToEdit = {
                todoId: props.todo.todoId,
                name: values.name,
                done: values.url,
                categoryId: values.categoryId
            }

            axios.put(`https://localhost:7116/api/ToDos${props.todo.todoId}`, todoToEdit).then(() => {
                props.getTodos()
                props.setShowEdit(false)
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

  return (
    <Formik 
    initialValues={{
        name: props.todo ? props.todo.name : '',
        done: props.todo ? props.todo.done : '',
        CategoryId: props.todo ? props.todo.categoryId : ''
    }}
    validationSchema={todoSchema} 
    onSubmit={(values) => handleSubmit(values)}>
        {({errors, touched}) => (
            <Form id='todoForm'>
                <div className="form-group m-3">
                    <Field name='name' className='form-control' placeholder='Name' />
                    {/* Below we add validation UI */} 
                    {errors.name && touched.name ? (
                        <div className="text-danger">{errors.name}</div>
                    ) : null}
                </div>
                <div className="form-group m-3">
                    <Field name='done' className='form-control' placeholder='Done?' />
                    {/* Below we add validation UI */} 
                    {errors.done && touched.done ? (
                        <div className="text-danger">{errors.done}</div>
                    ) : null}
                </div>

                <div className="form-group m-3">
                    <Field as='select' name='categoryId' className='form-control'>
                        <option value='' disabled>[--Select a Category--]</option>
                        {/* Below we will map an option for every category in our API */}
                        {categories.map(cat => 
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.catname}
                            </option>
                        )}
                    </Field>
                </div>
                <div className="form-group m-3">
                    <button type='submit' className="btn btn-info">Submit Resource to API</button>
                </div>
            </Form>
        )}
    </Formik>
)
}
