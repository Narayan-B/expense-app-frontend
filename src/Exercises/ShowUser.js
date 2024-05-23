import {useState,useEffect} from 'react'
import axios from 'axios'
export default function ShowUser(){
    const ids=[1,2,3,4,5,6,7,8,9,10]
    const  [id,setId]=useState('')
    const [user,setUser]=useState({})
    useEffect(()=>{
        if(id){
            const url=`https://jsonplaceholder.typicode.com/users/${id}`
            axios.get(url)
            .then((response)=>{
                const result=response.data
                console.log(result)
                setUser(result)
            })
        }
    },[id])
     const handleChange=(e)=>{
        setId(e.target.value)

     }
    return(
        <div>
            <h1>Show User</h1>
            <select value={id} onChange={handleChange}>
                <option value=''>Select Category</option>
                {ids.map((ele,i)=>{
                    return <option key={i} value={ele}>{ele}</option>
                })}
            </select>
            <h2>{user.username}</h2>
        </div>
    )
}