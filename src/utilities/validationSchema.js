//This file will house the schemas for both resources and categories for the create/edit form.
//To bring in a simple validation implementation, we are going to use Yup by installing it in our app. (npm install yup) see implementation below 
//Yup will work in tandem with Formik, which is an npm package that creates and stores form inputs for each item (categoryName, categoryDescription) that we need to capture in our forms. (npm install formik)

/* This is what we need for category POST:
    {
        "categoryName": "Test",
        "categoryDescription": "Test Description"
    }
*/

import * as Yup from 'yup'

const catSchema = Yup.object().shape({
    catname: Yup.string().max(25, 'Max 25 characters').required('Required'),
    catDesc: Yup.string().max(100, 'Max 100 characters')
})

const todoSchema = Yup.object().shape({
    name: Yup.string().max(100, 'Max 100 characters').required(),
    done: Yup.bool().required(),
    categoryId: Yup.number().required()
})

export {todoSchema} 
export default catSchema 