import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCOllectionData } from 'react-firebase-hooks/firestore'

const auth = firebase.auth()

const SignIn = () => {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
      }
      return (
        <section>
            <button onClick={signInWithGoogle}>Sign In!</button>
        </section>
      )
}

export default SignIn;