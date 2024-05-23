import {useState,useEffect} from 'react'
export default function CatchEvens(){
    const [time,setTime]=useState('')
    const [even,setEven]=useState([])
    useEffect(()=>{
        const interval=setInterval(()=>{
            const r=Math.round(Math.random()*100)
            setTime(r)
            //console.log(r) the random number that generates
            if(Number(r)%2===0){
                const res=r
                setEven(even=>[...even,res])
            }
            //console.log(even) even number generated randomly

        },1000)
        
        return () => clearInterval(interval)  //The return () => clearInterval(interval) statement inside the useEffect hook is a cleanup function. It serves to clear the interval when the component unmounts or when the dependency array of the useEffect hook changes.
        

    },[even])
    return(
        <div>
            <h1>All Evens-{even.length}</h1>

            <h2>{time}</h2>
            <ul>
            {even.map((ele,i)=>{
                return <li key={i}>{ele}</li>

            })}

            </ul>
            
        </div>
    )
}