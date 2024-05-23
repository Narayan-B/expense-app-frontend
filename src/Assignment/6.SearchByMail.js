// import { useState } from "react"
// import axios from 'axios'
// export default function SearchByMail(){
//     const [mail,setMail]=useState('')
//     const [user,setUser]=useState({})
//     const [err,setErr]=useState('')
//     const handleSubmit=(e)=>{
//         e.preventDefault()
//         axios.get('https://jsonplaceholder.typicode.com/users')
//             .then((response)=>{
//                 const result=response.data
//                 const found=result.find((ele)=>ele.email===mail)
//                 if(found){
//                     setUser(found)
//                     setErr('')
//                 }else{
//                     setErr('Record Not Found')
//                     setUser({})
//                 }
                
//             })
//             .catch(()=>{
//                 setErr('Record Not Found')
//                 setUser({})
//             })
//     }
//     return (
//         <div>
        
//             <form onSubmit={handleSubmit}>
//                 <input
//                 placeholder='enter mail'
//                 type='text'
//                 value={mail}
//                 onChange={(e)=>setMail(e.target.value)}
//                 ></input>
//                 <button 
//                 type='submit'
//                 >Search</button><br/>
//                 {err && err }
//                 {Object.keys(user).length>0 && <h1>{user.name} - {user.email} - {user.address.city}</h1>}
//             </form>
//         </div>
//     )
// }
import { useState } from "react"
import axios from 'axios'
export default function SearchByMail(){
    const [mail,setMail]=useState('')
    const [user,setUser]=useState([])
    const [err,setErr]=useState('')
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.get(`https://jsonplaceholder.typicode.com/users?email=${mail}`)
            .then((response)=>{
                const result=response.data //array of selected user details
              setUser(result)
              setErr(result.length ? '' : 'Record Not Found')
            
                
            })
            .catch((err)=>{
                console.log(err)
                setUser([])
            })
    }
    console.log(user[0])
    return (
        <div>
        
            <form onSubmit={handleSubmit}>
                <input
                placeholder='enter mail'
                type='text'
                value={mail}
                onChange={(e)=>setMail(e.target.value)}
                ></input>
                <button 
                type='submit'
                >Search</button><br/>
                {err && <p style={{color:'red'}}>{err}</p> }
                {user[0] && <h2>{user[0].name}-{user[0].email}-{user[0].address.city}</h2>}
                
            </form>
        </div>
    )
}