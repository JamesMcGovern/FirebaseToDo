import React from 'react'
import firebase from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCOllectionData } from 'react-firebase-hooks/firestore'

const auth = firebase.auth()

const SignOut = () => {
    return auth.currentUser && (
        <button onClick={() => auth.signOut()}>Sign Out!</button>
    )
}

export default SignOut;