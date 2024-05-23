import {useEffect,useState} from 'react'
import axios from 'axios'

export default function UsersTable(){
    const [users,setUsers]=useState([])
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response)=>{
                setUsers(response.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        

    },[])
    return(
        <div>
            <h1>UsersList</h1>
            <h2>Listing User-{users.length}</h2>
            <table border='1'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((ele)=>{
                        return <tr>
                            <td>{ele.id}</td>
                            <td>{ele.name}</td>
                            <td>{ele.email}</td>
                            <td>{ele.address.city}</td>
                            <td>{users && ele.address.geo.lat},{ele.address.geo.lng}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}