// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [data, setData] = useState({
//     name: '',
//     password: ''
//   })
//   const [message, setMessage] = useState('')

//   const handleChange = (e: { target: { name: string; value: string } }) => {
//     const { name, value } = e.target
//     setData({
//       ...data, [name]: value
//     })
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     // Validate form fields
//     if (!data.name || !data.password) {
//       setMessage('Both fields are required!')
//       return
//     }

//     // Display success message
//     setMessage(`Success! Name: ${data.name}, Password: ${data.password}`)

//     // Reset the form fields
//     setData({
//       name: '',
//       password: ''
//     })
//   }

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="card">
//           <label>Name: </label>
//           <input
//             type="text"
//             placeholder="name"
//             name="name"
//             value={data.name}
//             onChange={handleChange}
//           />
//           <br />
//           <label>Password: </label>
//           <input
//             type="password"
//             placeholder="password"
//             name="password"
//             value={data.password}
//             onChange={handleChange}
//           />
//           <br />
//           <button type="submit">Login</button>
//         </div>
//       </form>

//       {/* Show message after submission */}
//       {message && <p>{message}</p>}

      
//     </>
//   )
// }

// export default App


import { useState } from 'react';
import Login from '../src/component/auth/Login';
import Logout from '../src/component/auth/Logout'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState('')

  const handleLogin = (tokens: any) => {
    console.log('Logged in with tokens:', tokens);
    console.log(tokens)
    setIsAuthenticated(true);
    setName(tokens.username)
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div>
      <h1>JWT Authentication with Django and React</h1>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <h2>Welcome {name}!</h2>
          <Logout onLogout={handleLogout} />
        </>
      )}
    </div>
  );
};

export default App;
