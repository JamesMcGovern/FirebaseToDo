import React, { useState, useEffect } from 'react'
import SignOut from './SignOut'
import SignIn from './SignIn'
import AddTodoItem from './add-todo-item'
import firebase from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const auth = firebase.auth()
const firestore = firebase.firestore()

const SORT_OPTIONS = {
    'PRIORITY_ASC': {column: 'priority', direction: 'asc'},
    'PRIORITY_DESC': {column: 'priority', direction: 'desc'}
}

function useItems(sortBy = 'PRIORITY_ASC') {
    const [items, setItems] = useState([])

    useEffect(() => {
        const unsubscribe = firebase
        .firestore()
        .collection('items')
        .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
        .onSnapshot((snapshot) => {
            const newItems = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setItems(newItems)
        })

        return () => unsubscribe()
    }, [sortBy])

    return items
}

function onRemove(dItem) {

    firebase
        .firestore()
        .collection('items')
        .doc(dItem)
        .delete();

}

const ToDo = () => {
    const [user] = useAuthState(auth)
    const [sortBy, setSortBy] = useState('PRIORITY_ASC')
    const items = useItems(sortBy)

    if (user){
        return (
            <section>
                <header>Hello, {user.displayName}! <SignOut /> </header>
                <h1>To-Do List</h1>
                <div>
                    <label>Sort By:</label>{' '}
                    <select value={sortBy} onChange={e => setSortBy(e.currentTarget.value)}>
                        <option value="PRIORITY_ASC">Priority (High to Low)</option>
                        <option value="PRIORITY_DESC">Priority (Low to High)</option>
                    </select>
                </div>
                <ol>
                    {items.map((item) =>  
                        <li key={item.id}>
                            <div className="todo-item">
                                <p>{item.name}</p>
                                <code className="priority">{item.priority}</code>
                                <button className="escapeBtn" onClick={() => {onRemove(item.id)}}>X</button>
                            </div>
                            
                        </li>
                    )}
                </ol>
                <AddTodoItem />
            </section>
        )
    } else {
        return (
            <SignIn />
        )
    }
}

export default ToDo;