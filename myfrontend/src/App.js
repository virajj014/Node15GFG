import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [apires, setApiRes] = useState('No Response')
  const [registerdata, setRegisterData] = useState({
    password: '', email: '', age: '', gender: '', name: ''
  })
  const [logindata, setLoginData] = useState({
    password: '', email: ''
  })

  const [userdata, setUserData] = useState(null)
  

  const checkApi = () => {
    fetch('http://localhost:8000', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        //  console.log(data.message)
        setApiRes(data.message)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    checkApi()
  }, [])



  const handleRegister = () => {
    // console.log(registerdata)

    fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerdata)
    })
      .then(res => res.json())
      .then(data => {
          alert(data.message)
      })
      .catch(err => console.log(err))
  }


  const handleLogin = () => {
    // console.log(registerdata)

    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logindata)
    })
      .then(res => res.json())
      .then(data => {
          alert(data.message)
          console.log(data.accesstoken)
          localStorage.setItem('accesstoken', data.accesstoken)
      })
      .catch(err => console.log(err))
  }


  const getSavedToken = () => {
    const token = localStorage.getItem('accesstoken')
    console.log(token)
  }


  const getUserData = () => {
    const token = localStorage.getItem('accesstoken')

    fetch('http://localhost:8000/getmyprofile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
          setUserData(data.user)
      })
      .catch(err => console.log(err))
  }
  return (
    <div className="App">
      {/* <header className="App-header">
        <p>
          {apires}
        </p>
      </header> */}


      {/* Register */}
      <h1>Register Form</h1>
      <input type="text" placeholder="Name" 
        onChange={(e)=>{
          setRegisterData({...registerdata, name: e.target.value})
        }}
      />
      <input type="text" placeholder="Email" 
       onChange={(e)=>{
        setRegisterData({...registerdata, email: e.target.value})
      }}
      />
      <input type="text" placeholder="Password" 
       onChange={(e)=>{
        setRegisterData({...registerdata, password: e.target.value})
      }}
      />
      <input type="text" placeholder="Age" 
       onChange={(e)=>{
        setRegisterData({...registerdata, age: e.target.value})
      }}
      />
      <input type="text" placeholder="Gender"
       onChange={(e)=>{
        setRegisterData({...registerdata, gender: e.target.value})
      }}
      />

      <button
        onClick={handleRegister}
      >
        Register
      </button>

      <br></br>
      <br></br>
      <br></br>
      <h1>Login Form</h1>
      <input type="text" placeholder="Email" 
       onChange={(e)=>{
        setLoginData({...logindata, email: e.target.value})
      }}
      />
      <input type="text" placeholder="Password" 
       onChange={(e)=>{
        setLoginData({...logindata, password: e.target.value})
      }}
      />


<button
        onClick={handleLogin}
      >
        Login
      </button>


      <br></br>
      <br></br>
      <button onClick={getSavedToken}>Get Saved Token</button>


      <br></br>
      <br></br>
      <br></br>

      <button onClick={getUserData}>Get User Data</button>
      <h1>User Data</h1>
      {
        userdata && <div>
          <p>{userdata.name}</p>
      <p>{userdata.email}</p>
      <p>{userdata.age}</p>
      <p>{userdata.gender}</p>
          </div>
      }

    </div>
  );
}

export default App;
