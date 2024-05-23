import {useEffect, useState} from 'react'
import axios from 'axios'
export default function UsdToInd(){
    const [usd,setUsd] =useState(0)
    const [ind,setInd]=useState(0)
    

    useEffect(()=>{
        axios.get('https://v6.exchangerate-api.com/v6/da2aae6c65108738d6a03302/latest/USD')
            .then((response)=>{
                setInd(response.data.conversion_rates.INR)
                console.log(ind)
            })
            .catch((err)=>{
                console.log(err)
            })

    },[ind])
    return (
        <div>
            <h1>Usd-{usd}</h1>
            <h1>Ind-{usd*ind}</h1>
            <input type="range" 
            min="0" max="100" 
            value={usd}  
            onChange={(e)=>{setUsd(e.target.value)}}/>
        
            

        </div>
    )
}