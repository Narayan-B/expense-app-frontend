import {useState,useEffect} from 'react'

export default function Count(){
    const [count,setCount]=useState(0)
    const [click,setClick]=useState(10)
    useEffect(()=>{
        console.log('use Effect without []')
    })
    useEffect(()=>{
        console.log('use effect with []')
    },[])
    useEffect(()=>{
        console.log('use effect click')
    },[click])
    const handleClick=()=>{
        console.log('event handler count')
        setCount(count+1)
    }
    const handle10=()=>{
        console.log('event handler click')
        setClick(click+10)
    }
    return(
        <div>
            {console.log('jsx')}
            <h1>Counter</h1>
            <h2>Count-{count}</h2>
            <button onClick={handleClick}>+1</button>
            <button onClick={handle10}>+10</button>
        </div>
    )
}