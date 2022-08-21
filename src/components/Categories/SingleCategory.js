import React, { useState } from 'react'

/* Font Awesome Icons
npm install --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
*/
import { useAuth } from '../../contexts/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'


library.add(fas)

export default function SingleCategory(props) {

    //Bring in currentUser
    const { currentUser } = useAuth()
    
    //Below edit hook to show/hide the edit form
    const [showEdit, setShowEdit] = useState(false);

    const deleteCat = (id) => {
        if(window.confirm(`Are you sure you want to delete ${props.category.catname}?`)) {
            axios.delete(`https://localhost:7116/api/Categories${id}`).then(() => {props.getCategories()})
        }
    }
  return (
    <tr>
        <td>{props.category.catname}</td>
        <td>{props.category.catdesc}</td>
    </tr>
  )
}
