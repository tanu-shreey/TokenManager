import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import Login from './Login';
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });

  //to store Value in local Storage
  const handleSubmit = (e) => {
    e.preventDefault(); 
    localStorage.setItem('user', JSON.stringify(input))
    navigate('/Login',{replace :true});

  };
  return (
    <div className='  border container bg-light w-25 p-5 mt-5 ' >

      <div className='text-center p-2'><h3>Create Account</h3></div>
      <div>
        <form onSubmit={handleSubmit}>
          <input className='form-control m-3 ms-3' id='name' type='text' placeholder='Name' name='name' value={input.name}
            onChange={(e) =>
            setInput({ ...input, [e.target.name]: e.target.value, })} />
          <input className='form-control m-3 ms-3' id='email' type='email' placeholder='Email' name='email'  value={input.email}
            onChange={(e) =>
            setInput({ ...input, [e.target.name]: e.target.value ,})} />
          <input className='form-control m-3 ms-3'  id='password' type='password' placeholder='Password' name='password' value={input.password} 
            onChange={(e) =>
            setInput({ ...input, [e.target.name]: e.target.value, })} />
          <button className='btn ms-3' style={{ backgroundColor: '#885f43', color: 'white' }} type='submit'>Register</button>
        </form>
        <p style={{fontSize:'12px'}} className='m-3'>Already have an Account ?<Link to ='/Login'>Login here</Link></p>
         
      </div>
    </div>
  )
}

export default Register
