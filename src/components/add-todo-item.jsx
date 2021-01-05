import React, { useState } from 'react'
import firebase from './firebase'

const AddTodoItem = () => {
    const [name, setName] = useState('')
    const [priority, setPriority] = useState('')

    function onSubmit(e) {
        e.preventDefault()

        firebase
            .firestore()
            .collection('items')
            .add({
                name,
                priority: parseInt(priority)
            })
            .then(() => {
                setName('')
                setPriority('')
            })
    }

    return (
        <form className="newItem" onSubmit={onSubmit}>
            <div>
                <label>To-Do</label>
                <input type="text" value={name} onChange={e => setName(e.currentTarget.value)} />
                <label>Priority</label>
                <input type="number" min="1" max="9" value={priority} onChange={e => setPriority(e.currentTarget.value)} />
            </div>
            <button>Add Todo Item</button>
        </form>
    )
}

export default AddTodoItem;