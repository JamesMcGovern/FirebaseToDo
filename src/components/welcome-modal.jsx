import React, { useState, useEffect, useRef } from 'react'
import firebase from './firebase'


const newUserData = async (userId) => {

    const newUser = firebase
    .firestore()
    .collection('users')
    .doc(userId);

    const doc = await newUser.get();
    if (!doc.exists) {
        console.log('No such doc!');
        return false
    } else {
        console.log('Document data:', doc.data().newuser)
        return doc.data().newuser
    }
}

const existingUser = (userId) => {

    firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .update({
        newuser: false
    });
}

const WelcomeModal = props => {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const welcome = newUserData( props.userId ).then((data) => {
            return data === true ? setIsOpen(true) : setIsOpen(false);
        });
    }, [isOpen, props.userId, loading])
    
    if (!loading) setLoading(true)

    /*const outside = useRef();
    const handleClick = e => {
        if (outside.current.contains(e.target)) {
            return
        }
        setIsOpen(false)
    }

    useEffect(() => {
        const getClick = document.addEventListener('click', handleClick)

        return () => {
            getClick()
        }
    }, [])*/


    
    if (isOpen && loading){
        return (
            <div className="modal">
                <div onClick={() => {setIsOpen(false); existingUser(props.userId)}} className="closeModal">X</div>
                <h1>Welcome to My Basic ToDo list!</h1>
                <br/><br/><br/>
                <p>Get started by adding a ToDo item at the bottom of the page followed by a priority assigned to said item.</p>
                <br/>
                <p>Priorities are sorted 1-9, with 1 being the highest priority.</p>
            </div>
            )
        } else {
            return ("")
        }
    
}

export default WelcomeModal;