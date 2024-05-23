import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UsersTodos() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                setUsers(response.data)
                //console.log(response.data) all users in an array
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);
    //console.log(users) //all users 

    const handleUserSelect = (e) => {
        setSelectedUser(e.target.value);
    };
    //console.log(selectedUser)  //user id as we set value ={ele.id}
    //console.log(typeof selectedUser) //string
    useEffect(() => {
        
            axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                const result = response.data;
                //console.log(todosData) all todos 
                const filteredTodos = result.filter(ele => ele.userId === Number(selectedUser)) //here we are converting to number
                //console.log(filteredTodos)    array of todos of selected todos
                setTodos(filteredTodos) 
                
                   
            })
            .catch(error => {
                console.error('Error fetching todos:', error);
            });
            
            
        

       
    }, [selectedUser]);

    return (
        <div>
            <select onChange={handleUserSelect}>
                <option value=''>Select User</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
            <div>
                <h2>Todos</h2>
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
