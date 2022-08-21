import React from 'react'
import { Formik, Form, Field } from 'formik' //This will produce the form for creating/editing a category
import catSchema from '../../utilities/validationSchema'
import axios from 'axios'


export default function CatForm(props) {

    const handleSubmit = (values) => {
        console.log(values)
        if(!props.category) {
            const catToCreate = values //Assemble a temporary object to send in our request 

            //below we send the object in a POST request to our API 
            axios.post(`https://localhost:7116/api/Categories`, catToCreate).then(() => {
                props.setShowCreate(false)//This will close the form. We passed this down as a prop from Categories.js
                props.getCategories()//This makes a GET request to the API. We also passed this down from Categories.js
            })
        }
        else {
            //Because the form only captures categoryName and categoryDescription, we need to pass an entire object into the PUT request, including the categoryId
            const catToEdit = {
                categoryId: props.category.categoryId,
                catName: values.catName, //take the values object and destructure to pull just the categoryName 
                catDesc: values.catDesc 
            }

            axios.put(`https://localhost:7116/api/Categories/${props.category.categoryId}`, catToEdit).then(() => {
                props.getCategories()
                props.setShowEdit(false)
            })
        }
    }


  return (
    <div className='createCategory m-2 text-white text-center'>
    <Formik 
        initialValues={{
            //Below is a turnary operator that makes our form behave differently based on whether we have a prop called category. If we have it, assume we are editing, if not, we are creating a new one. 
            catName: props.category ? props.category.catName : '',
            catDesc: props.category ? props.category.catDesc : ''
        }}
        validationSchema={catSchema}
        onSubmit={values => handleSubmit(values)}>
            {({errors, touched}) => (
                //Below we create our form 
                <Form id='catForm' className='row text-center m-auto'>
                    <div className='form-group m-1 p-1'>
                        <Field name='categoryName' className='form-control' placeholder='Name' />
                        {errors.catName && touched.catName ?
                            <div className="text-danger">{errors.catName}</div>
                        :null }
                    </div>
                    <div className="form-group m-1 p-1">
                        <Field name='categoryDescription' className='form-control' placeholder='Description' />
                        {errors.catDesc && touched.catDesc ? 
                            <div className="text-danger">{errors.catDesc}</div>
                        : null}
                    </div>
                    <div className="form-group m-1">
                        <button type='submit' className="btn btn-success">Submit Category to API</button>
                    </div>
                </Form>
            )}
    </Formik>
</div>
  )
}
