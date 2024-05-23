import {useState} from 'react'
export default function Todo(){
    const [todos,setTodos]=useState([])   //for all todos to render
    const [name,setName]=useState('')   // for input given by the user to track what the user is typing
    const handleSubmit=(e)=>{
        e.preventDefault()
        const newTodo={
            id:Number(new  Date()),
            name:name, 
            isCompleted:false  
        }
        setTodos([...todos,newTodo])
        setName('')
    }
    const handleEdit=(id)=>{
        const editName=prompt('Enter name')
       const newArr= todos.map((ele)=>{
            if(ele.id===id){
                return {...ele,name:editName}
            }else{
                return ele

            }
            
        })
       setTodos(newArr)
    }
    const handleRemove=(id)=>{
        const userConfirm =window.confirm('Are u sure?')
        if(userConfirm){
            const newArr=todos.filter((ele)=>{
                return ele.id!==id
            })
            setTodos(newArr)
        }

    }
    const handleChange=(id)=>{
        const newArr=todos.map((ele)=>{
            if(ele.id===id){
            return {...ele,isCompleted:!ele.isCompleted}
            }else{
               return  {...ele}
            }
        })
        setTodos(newArr)
    }
    return (
        <div>
            <h1>Todo List</h1>
            <h2>Todos-{todos.length}</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder='Enter todo'  value={name} type='text' onChange={(e)=>setName(e.target.value)}></input>
                <input type='submit'/>
            </form>
            {
                todos.length===0 ? <p>Add your todo</p> :(
                    <ul>
                {todos.map((ele)=>{
                    return <li key={ele.id}>{ele.name}
                    <button onClick={()=>{handleEdit(ele.id)}}>Edit</button>
                    <button onClick={()=>{handleRemove(ele.id)}}>Remove</button>
                    <input type='checkbox' checked={ele.isCompleted} onChange={()=>{handleChange(ele.id)}}/>
                    
                    </li>
                })}
            </ul>
                )
            }
            
        </div>
    )
}