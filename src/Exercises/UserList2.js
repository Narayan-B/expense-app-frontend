import {useState} from 'react'
import axios from 'axios'
export default function UserList2(){
    const [id,setId]=useState('')
    const [user,setUser]=useState({})
    const [todo,setTodo]=useState([])
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(id){
            axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((response)=>{
                const result=response.data
                setUser(result)
                
            })
        axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${id}`)
        .then((response)=>{
            const result=response.data
            setTodo(result)
            
        })


        }
       
        
    }
    return (
        <div>
            <h1>UserList</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='id' type='text' >Enter ID</label>
               
                <input type='text' id='id'  value={id} onChange={(e)=>setId(e.target.value)}/>
                <input type='submit'/>
            </form>
            <h2>{user.name}{user.email}</h2>
            <ul>
                {todo.map((ele)=>{
                    return <li key={ele.id}>{ele.title}</li>
                })}
            </ul>
        </div>
    )
}