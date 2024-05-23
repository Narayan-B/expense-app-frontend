import axios from 'axios';
import { useEffect,useState } from 'react';

export default function SelectUser() {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            setUsers(response.data);
            console.log(response.data)
            
        })
        .catch((err) => {
            console.log(err);
        });

    },[])
    //console.log(users)  ==response.data
    

    return (
        <div>
            <label>User</label>
            <select>
                <option value=''>Select User</option>
                {users.map((user) => (
                    <option key={user.id} value={user.name}>{user.name}</option>
                ))}
            </select>
        </div>
    );
}
