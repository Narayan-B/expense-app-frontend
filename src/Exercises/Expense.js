import { useEffect, useState } from "react";
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip,Legend ,PieChart,Pie} from 'recharts';
export default function ExpenseForm() {
  const [categories,setCategories]=useState([])
  const [expenses,setExpenses]=useState([])
  const [form, setForm] = useState({
    expenseDate: "",
    title: "",
    amount: "",
    description: "",
    category: "",
  });
  /*
  const [expenseDate, setExpenseDate] = useState('')
  const [title, setTitle] = useState('')
  */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value ||"" });
  };
//console.log(expenses)
const handleSubmit = (e) => {
  e.preventDefault();
  axios.post('http://localhost:3068/create-expense', form)
    .then((response) => {
       const result=response.data
      setExpenses([...expenses,result])
      // Reset the form to its initial state
      setForm({
        expenseDate: "",
        title: "",
        amount: "",
        description: "",
        category: "",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

  //console.log(form)
  
  
  useEffect(()=>{
    axios.get('http://localhost:3068/all-expenses')
  .then((repsonse)=>{

    setExpenses(repsonse.data)
  })
  .catch((err)=>{
    console.log(err)
  })
  axios.get('http://localhost:3068/all-categories')
      .then((repsonse)=>{
        const result=repsonse.data
      setCategories(result)
      })

  },[categories])

  
  const handleRemove = (id) => {
    const userConfirm = window.confirm('Are you sure?')
    if (userConfirm) {
        axios.delete(`http://localhost:3068/delete-expense/${id}`)
            .then((expense) => {
                // Filter out the deleted expense based on its ID
                 const newArr = expense.filter(ele => ele._id !== id);
                 setExpenses(newArr);
                //console.log(expense.data)
                setExpenses(expenses)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}
const handleEdit = (id) => {
  const newTitle = prompt('Enter new title');

  if (newTitle) {
    const updatedExpenses = expenses.map((ele) => {
      if (ele._id === id) {
        return { ...ele, title: newTitle };
      } else {
        return ele;
      }
    });

    axios.put(`http://localhost:3068/update-expense/${id}`, { title: newTitle })
      .then((response) => {
        setExpenses(updatedExpenses);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
const calculateTotalByCategory = (categoryName) => {
  return expenses.reduce((total, expense) => {
    if (expense.category === categoryName) {
      return total + parseFloat(expense.amount);
    }
    return total;
  }, 0);
};

// Format categories data with total expenses
const formattedCategories = categories.map(category => ({
  name: category.name,
  totalExpense: calculateTotalByCategory(category.name)
}));
  return (
    <div>
      <h2>Add Expense </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="expenseDate">Enter Date</label> <br />
        <input
          type="date"
          id="expenseDate"
          value={form.expenseDate}
          name="expenseDate"
          onChange={handleChange}
        />{" "}
        <br />
        
        <label>Title</label>
        <input type='title'
        id='title'
        value={form.title}
        name='title'
        onChange={handleChange}
        ></input><br/>
        <label>Amount</label>
        <input type='amount'
        id='amount'
        value={form.amount}
        name='amount'
        onChange={handleChange}
        ></input><br/>
        <label htmlFor="description">Enter description</label> <br />
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
        ></textarea>{" "}
        <br />
        <label htmlFor="category">Select Category</label> <br />
        <select
  id="category"
  name="category"
  value={form.category}
  onChange={handleChange}
>
  <option value="">Select</option>
  {categories.map((ele, i) => (
    <option key={i} value={ele.name}>{ele.name}</option>
  ))}
</select>

        <br />
        
        <input type="submit" />
        
      </form>
      {expenses.length >0  &&
        <table border='1'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Title</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
  
        </thead>
        <tbody>
          {expenses.map((ele)=>{
            return <tr key={ele._id}> 
              <td>{ele.expenseDate}</td>
              <td>{ele.amount}</td>
              <td>{ele.title}</td>
              <td>{ele.category}</td>
              <td><button onClick={()=>{handleEdit(ele._id)}}>Edit</button>
              <button onClick={()=>{
                handleRemove(ele._id)
              }}>Delete</button></td>
            </tr>
          })}
  
        </tbody>
      </table>
      
      }
      <h1>Total Expenses-{expenses && expenses.reduce((acc,cv)=>{
        return acc+cv.amount
      },0)}</h1>
      <BarChart width={500} height={300} data={formattedCategories} style={{ margin: '0 auto' }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend/>
            <Bar dataKey="totalExpense" fill="#8884d8" />
          </BarChart>
          <PieChart width={500} height={300} style={{ margin: '0 auto' }}>
            <Pie dataKey="totalExpense" data={formattedCategories} nameKey="name" fill="#00bfff " label />
            <Tooltip />
          </PieChart>
      
    </div>
  );
}