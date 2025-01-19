import React from 'react';
import axios from 'axios';

const Logout = ({ onLogout }:any) => {
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    const accessToken = localStorage.getItem('access_token'); // Get the access token

    try {
      // Check if the access token exists
      if (accessToken && refreshToken) {
        // Send logout request to backend with the refresh token in the body and the access token in the Authorization header
        await axios.post(
          'http://localhost:8000/api/logout/', 
          { refresh_token: refreshToken }, 
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`, // Send the access token as the Authorization header
            },
          }
        );

        console.log('Logged out successfully');

        // Clear tokens from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
        // Call the onLogout function passed as a prop to notify the parent component
        onLogout();
      } else {
        console.error('Tokens not found');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;


// import axios from 'axios';

// const Logout = async () => {
//   try {
//     // Get the refresh token from localStorage
//     const refreshToken = localStorage.getItem('refresh_token');
    
//     if (refreshToken) {
//       // Make a request to the backend to invalidate the refresh token (logout server-side)
//       const response = await axios.post('http://localhost:8000/api/logout/', { refresh_token: refreshToken }, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
//         },
//       });

//       console.log(response.data); // Optional: log the server response

//       // Remove the tokens from localStorage (client-side logout)
//       localStorage.removeItem('access_token');
//       localStorage.removeItem('refresh_token');

//       // Optionally, redirect the user to the login page
//       window.location.href = '/login';  // or use React Router to navigate
//     }
//   } catch (error) {
//     console.error('Error during logout:', error);
//   }
// };


// export default Logout;