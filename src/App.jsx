import { useEffect, useState } from 'react';
import './App.css'

function App() {



  const [user,setUSer] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/user')
    .then(res => res.json())
    .then(data => {
      setUSer(data);
    })
  },[])

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target;
    const name =form.name.value;
    const email =form.email.value;
    const password =form.password.value;
    const user = {name,email,password}
    console.log(user);
    fetch('http://localhost:5000/user',{
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.insertedId){
        alert('data added successfully')
        form.reset();
      }
    })
  }

  const handleDelete = _id =>{
    console.log(_id);
    fetch(`http://localhost:5000/user/${_id}`,{
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data =>{
      console.log(data);
      if(data.deletedCount > 0){
        alert('User deleted successfully')
      }
    })
  }
  

  return (
    <>
      
        
      <h1>Vite + React</h1>
      <h1>{user.length}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name"  />
        <br />
        <input type="email" name="email"  />
        <br />
        <input type="password" name="password"  />
        <br />
        <input type="submit" value="Add User" />
      </form>

      {
        user.map(use => <p key={use._id}>{use.name} : :{use.password} {use.email} :{use._id} <button onClick={()=>handleDelete(use._id)} >X</button> </p>)
      }
      
    </>
  )
}

export default App
