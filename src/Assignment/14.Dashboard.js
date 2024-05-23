import { useState,useEffect } from "react"
import axios from 'axios'
export default function Dashboard(){
    const [users,setUsers]=useState([])
    const [posts,setPosts]=useState([])
    const [todos,setTodos]=useState([])
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users/')
            .then((response)=>{
                setUsers(response.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        axios.get('https://jsonplaceholder.typicode.com/posts/')
            .then((response)=>{
                setPosts(response.data)
                console.log(response.data)
            })
            .catch((err)=>{
                console.log(err)
            }) 
         axios.get('https://jsonplaceholder.typicode.com/todos/')
            .then((response)=>{
                setTodos(response.data)
            })
            .catch((err)=>{
                console.log(err)
            })   
            

    },[])
    return (
        <div>
            <h1>DashBoard</h1>
            <h2>Users-{users.length}</h2>
            <h2>Posts-{posts.length}</h2>
            <h2>Todos-{todos.length}</h2>
        </div>
    )
}