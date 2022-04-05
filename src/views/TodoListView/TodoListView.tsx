import { onSnapshot, query, where } from "firebase/firestore"
import React, { useState } from "react"
import AddTodoItem from "../../components/AddTodoItem/AddTodoItem"
import Layout from "../../components/Layout/Layout"
import TodoItem from "../../components/TodoItem/TodoItem"
import { todosRef } from "../../config/firebase-config"
import ITodo from "../../types/ITodo"
import IUser from "../../types/IUser"
import "./TodoListView.css"


const TodoListView: React.FC = () => {
    const currentUser: IUser = JSON.parse(sessionStorage.getItem("currentUser") || '[]') 
    const [userTodos, setUserTodos] = useState<ITodo[]>([])

    const userTodosQuery = query(todosRef, where("userId", "==", currentUser.uid))

    onSnapshot(userTodosQuery, (snapshot) => {
        let todos: ITodo[] = []
        snapshot.docs.forEach((doc) => {
            todos.push({
                id: doc.id, 
                title: doc.data().title, 
                completed: doc.data().completed
            })
        })
        setUserTodos(todos)
    })

    const todosToRender = userTodos.map((todo) => {
        return <TodoItem todo={todo} />
    })

    return (
        <Layout>
            {todosToRender}
            <AddTodoItem />
        </Layout>
    )
}

export default TodoListView