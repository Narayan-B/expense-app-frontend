import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ShowCompleted() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [todos, setTodos] = useState([]);
    const [completed,setCompleted]=useState([])

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleUserSelect = (e) => {
        setSelectedUser(e.target.value);
    };

    useEffect(() => {
        
            axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                const result = response.data;
                //console.log(todosData) all todos in an array 
                const filteredTodos = result.filter(ele => ele.userId === Number(selectedUser))
                //console.log(selectedUser) user id 
                setTodos(filteredTodos) 
                //console.log(filteredTodos)     all todos of selected user or particular user   
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
            </select><br/>
            <input   id ='completed'type='checkbox'  onChange={()=>setCompleted(prev=>!prev)}/>
            <label htmlFor='completed'>Completed</label>
            <div>
                <h2>Todos</h2>
                <ul>
                        {/* completed is a state variable that represents whether the "Completed" checkbox is checked or not.
                        todo.completed represents whether the current todo item is marked as completed. */}
                    {todos.map(todo => (
                        (completed || todo.completed) && (
                            <li
                                key={todo.id}
                                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                            >
                                {todo.title}
                            </li>
                        )
                    ))}
                </ul>
            </div>
        </div>
    );
}
