import { addDoc } from "firebase/firestore"
import React, { useState } from "react"
import { todosRef } from "../../config/firebase-config"
import IUser from "../../types/IUser"

const AddTodoItem: React.FC = () => {
    const [adding, setAdding] = useState(false)
    const [title, setTitle] = useState("")
    const currentUser: IUser = JSON.parse(sessionStorage.getItem("currentUser") || '[]') 

    const handleAddTodo = async () => {
        setAdding(false)
        await addDoc(todosRef, {
            userId: currentUser.uid,
            title,
            completed: false
        })
        setTitle("")    
    }
    console.log(title)
    return (    
        <div>
            {
                adding &&

                <>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title..." />
                    <i onClick={handleAddTodo} className="ri-check-line"></i>
                </> 
            }
            {
                !adding &&

                <i onClick={() => setAdding(true)} className="ri-add-line"></i> 
            }
        </div>
    )
}

export default AddTodoItem