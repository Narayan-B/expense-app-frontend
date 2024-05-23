import {useEffect,useState } from 'react'

import axios from 'axios'
export default function UserList(){
    const [users,setUsers]=useState([])
    const [name,setName]=useState('')
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response)=>{
            setUsers(response.data)

        })
    },[])
    const handleRemove = (id) => {
        const updatedUsers = users.filter(ele => ele.id !== id);
        setUsers(updatedUsers)
    }
    const handleEdit = (id) => {
        const newName = prompt('Enter new Name');
        if (newName) {
            const updatedUsers = users.map(ele => {
                if (ele.id === id) {
                    console.log(ele)
                    return { ...ele, name: newName };
                }
                return ele
            });
            setUsers(updatedUsers);
        }
    };
    const handleSubmit=(e)=>{
        e.preventDefault()
        const newUser={
            id:Number(new Date()),
            name:name
        }
        setUsers([...users,newUser])
        setName('')
    }
    
    return (
        <div>
            <h1>UserList</h1>
            <h2>userlist-{users.length}</h2>
            <ul>
                {users.map((ele)=>{
                    return <li key={ele.id}>{ele.name}
                    <button onClick={()=>handleRemove(ele.id)}>Remove</button>
                    <button onClick={()=>handleEdit(ele.id)}>Edit</button>
                    
                    </li>
                })}
            </ul>
            <form onSubmit={handleSubmit}>
                <label htmlFor='user'>Add Name</label>
                <input type='text' id='user' value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type='submit'/>
            </form>
        </div>
    )
}