import {useState,useEffect} from 'react'
import axios from 'axios'
export default function App1(){
    const [categories,setCategories]=useState([])
    const [name,setName]=useState('')
    useEffect(()=>{
        axios.get('http://localhost:3068/all-categories')
            .then((response)=>{
                setCategories(response.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    },[])
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:name
        }
        axios.post('http://localhost:3068/create-category',formData)
        .then((response)=>{
            const result=response.data
            setCategories([...categories,result])
            setName('')
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return(
        <div>
            <h1>Practice</h1>
            <h2>Listing Categories-{categories.length}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='category'>Enter Category</label>
                <input type='text' id='category' value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type='submit'/>
            </form>
            <ul>
                {categories.map((ele=>{
                    return <li key={ele._id}>{ele.name}</li>
                }))}
            </ul>
        </div>
    )
}