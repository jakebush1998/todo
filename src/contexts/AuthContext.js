import React, { useContext, useState, useEffect } from 'react'
import {auth} from '../base'
import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const githubAuthProvider = new GithubAuthProvider()

    //Login functionality
    async function login() {
        return (signInWithPopup(auth, githubAuthProvider).then(authData => {
            console.log(authData)
            setCurrentUser(authData.user)
            //This is where we could add some functionality to save the user to a db. Also maybe decide what user role they are in.  
        }))
    }

    //Logout functionality
    async function logout() {
        signOut(auth).then(setCurrentUser(null))
    }


    const value = {currentUser, login, logout}

    useEffect(() => {

        const authChange = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false) 
        })

        return authChange

    }, [])

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
