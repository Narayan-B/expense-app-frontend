import axios from 'axios';
import { useEffect,useState } from 'react';

export default function SelectUser() {
    const [users, setUsers] = useState([])
    const [user,setUser]=useState({})
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            setUsers(response.data);
            //console.log(response)- entire  array of users
        })
        .catch((err) => {
            console.log(err);
        });

    },[])
    console.log(user) //selected user name
    const selectedUser = users.find((ele) => ele.name === user)  //finding obj of that selected user
    //console.log(selectedUser) object of selected user
    
    return (
        <div>
            <label>User</label>
            <select onChange={(e)=>{setUser(e.target.value)}}>
                <option value=''>Select User</option>
                {users.map((user) => (
                    <option key={user.id} value={user.name}>{user.name}</option>
                ))}
            </select>
            {selectedUser &&<h2>{selectedUser.name} -{selectedUser.email}-{selectedUser.address.city}</h2>}
        </div>
    );
}
 