import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import React, { useState } from "react"
import ITodo from "../../types/ITodo"
import { db } from "../../config/firebase-config"

interface TodoProps {
    todo: ITodo
}

const TodoItem: React.FC<TodoProps> = ({ todo }) => {
    const [checked, setChecked] = useState(todo.completed)
    const [editing, setEditing] = useState(false)
    const [title, setTitle] = useState("")

    const handleDelete = async () => {
        const docRef = doc(db, "todos", todo.id)
        await deleteDoc(docRef)
    }

    const handleEdit = async () => {
        setEditing(false)
        const docRef = doc(db, "todos", todo.id)
        await updateDoc(docRef, {title})
    }

    const toggleCheck = async () => {
        const docRef = doc(db, "todos", todo.id)
        await updateDoc(docRef, {completed: checked})
        setChecked(prev => !prev)
    }

    return (
        <div>
            {
                !editing &&
                <>
                    <input type="checkbox" checked={checked} onChange={toggleCheck}/>
                    <h3>{todo.title}</h3>
                    <i onClick={() => setEditing(true)} className="ri-pencil-line"></i>
                    <i onClick={handleDelete} className="ri-close-line"></i>
                </>
            }

            {
                editing &&
                <>
                    <input type="checkbox" checked={checked} onChange={toggleCheck} disabled />
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <i onClick={handleEdit} className="ri-check-line"></i> 
                    <i onClick={handleDelete} className="ri-close-line" aria-disabled></i>
                </>
            }
        </div>
    )
}

export default TodoItem