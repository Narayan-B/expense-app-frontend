import {useState} from 'react'
export default function Increment(){
    const [count,setCount]=useState(0)
    const [value,setValue]=useState('')
    const handleClick=()=>{
        setCount(count+1)
    }
    const handleDec=()=>{
       setCount(count>0?count-1:0)
       

        
    }
    const handleReset=()=>{ setCount(0)}
    const handleSubmit=(e)=>{
        e.preventDefault()
        setCount(typeof value==Number ? count+Number(value):count)
        setValue('')
    }
    
       
    

    return (
        <div>
            <h1>Increment</h1>
            <h2>count-{count}</h2>
            <button onClick={handleClick}>+1</button>
            <button onClick={handleDec}>-1</button>
            <button onClick={handleReset}> Reset</button>
            <form onSubmit={handleSubmit}>
                <input placeholder='enter count'  value={value}  onChange= {(e)=>setValue(e.target.value)}/>
                <input type='submit'></input>
            </form>
            
        </div>
    )

}