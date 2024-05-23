import {useState,useEffect} from 'react'
import axios from 'axios'
export default function User(){
    const [user,setUser]=useState({})
    useEffect(()=>{
       axios.get('https://jsonplaceholder.typicode.com/users/1')
        .then((response)=>{
           setUser(response.data)
        })

    },[])

    return(
        <div>
          {user && <h1>{user.name}-{user.email}-{user.address.city}</h1>}  
        </div>
    )
}