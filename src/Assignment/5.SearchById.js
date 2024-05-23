import { useState } from "react"
import axios from 'axios'
export default function SearchById(){
    const [id,setId]=useState('')  //input provided by user
    const [user,setUser]=useState({}) //to display response
    const [error,setError]=useState('') //to display error
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.get(` https://jsonplaceholder.typicode.com/users/${id}`)
            .then((response)=>{
                const result=response.data  
                setUser(result)
                //console.log(response.data) only selected user object
                setError('')
                setId('')
            })
            .catch(()=>{
                setError('Record not Found')
                setUser({})
                setId('')
            
            })

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                 placeholder='Enter Id'
                 value={id}
                 type='text'
                 onChange={(e)=>setId(e.target.value)}
                ></input>
                <button type='submit'>search</button><br/>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {Object.keys(user).length>0 && <h1>{user.name} - {user.email} - {user.address.city}</h1>}
            </form>
        </div>
    )
}