import axios from 'axios'
import {useState,useEffect} from 'react'
export default function Category(){
  const [categories,setCategories]=useState([])
  const [name,setName]=useState('')
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
  
  
  useEffect(()=>{
    axios.get('http://localhost:3068/all-categories')
    .then((response)=>{
      setCategories(response.data)

    })
    .catch((err)=>{
      console.log(err)

    })
  },[])
  
  const handleRemove = (id) => {
    const userConfirm=window.confirm('Are you sure?')
    if(userConfirm){
      axios.delete(`http://localhost:3068/delete-category/${id}`)
      .then(() => {
        setCategories(categories.filter(ele => ele._id !== id))
      })
      .catch((err) => {
        console.log(err)
      })
    }
    /*
    const handleRemove = (id) => {
    const userConfirm = window.confirm('Are you sure?')
    if (userConfirm) {
        axios.delete(`http://localhost:3068/delete-category/${id}`)
            .then((response) => {
                const result = response.data;
                const newArr = categories.filter(ele => ele._id !== result._id)
                setCategories(newArr);
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

    */
    
  }
  const handleUpdate=(id)=>{
    const newName=prompt('Enter name')
    if (newName) {
      axios.put(`http://localhost:3068/update-category/${id}`, { name: newName })
        .then(() => {
          setCategories(categories.map((ele) => {
            if (ele._id === id) {
              return { ...ele, name: newName };
            } else {
              return ele;
            }
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  /*const handleEdit=(id)=>{
    const name=prompt('Enter category')
    const formData={
      name:name
    }
    if(name){
      axios.put(`http://localhost:3068/update-category/${id}`,formData)
      .then((response)=>{
        const result=response.data
        const newArr=categories.map((ele)=>{
          if(ele._id==result._id){
            return result
          }else{
            return ele
          }
        })
        setCategories(newArr)
      })
    }
  } */
  
 
  return(
    <div>
      <h2>Listing Categories-{categories.length}</h2>
      
      <ul>
        {categories.map((ele)=>{
          return <li key={ele._id}>{ele.name}
           <button onClick={()=>{handleUpdate(ele._id)}}>Edit</button>
          <button onClick={()=>{handleRemove(ele._id)}}>Remove</button>
         
          
          </li>
        })}
      </ul>
      <form onSubmit={handleSubmit}>
        <label  
        htmlFor='name'
        type='text'
        
        
        >Enter Category</label>
        <input 
        type='text'
        id='name'
        value={name}
        onChange={(e)=>{setName(e.target.value)}}></input>
        <input type='submit'></input>
      </form>
    </div>
  )
}