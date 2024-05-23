import {useState} from 'react'
export default function ChangeBg(){
    const colors=['red','green','yellow','black','pink','orange']
    const [color,setColor]=useState('')
    const handleColorChange = (e) => {
        setColor(e.target.value);
        document.body.style.backgroundColor = e.target.value
    }
    return(
        <div style={{ backgroundColor: color }}>
            <h1>BG</h1>
            <select onChange={handleColorChange}>
                <option value=''>Select</option>
                {colors.map((ele,i)=>{
                    return <option key={i}value={ele}>{ele}</option>
                })}
            </select>
            
        </div>
    )
}