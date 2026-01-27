// Function to verify user
// const apiUrl = import.meta.env.VITE_API_URL;

import { DELETE_METHOD_NO_AUTH, GET_METHOD_NO_AUTH } from "../utility/constants";
// const USER_URL = 'http://localhost:3000/api/v1/user';
// const PRODUCT_URL='http://localhost:3000/api/v1/poduct';

// Access the base API URL from the environment variable
const apiUrl = import.meta.env.VITE_API_URL;

// Define the full API URLs by concatenating apiUrl with the specific endpoint paths
const USER_URL = `${apiUrl}/api/v1/user`;
const PRODUCT_URL = `${apiUrl}/api/v1/product`;

export async function verifyUser(values) {
    const response = await fetch(`${USER_URL}/verify-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials:'include',
      body: JSON.stringify(values),
    });
  
    const data = await response.json();
    return { response, data };
  }


  export async function register(values) {
    const response = await fetch(`${USER_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  
    const data = await response.json();
    return { response, data };
  }

  export async function registerForm(values) {
    const response = await fetch(`${USER_URL}/registerForm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials:'include',
      body: JSON.stringify(values),
    });
    const data = await response.json();
    return { response, data };
  }


  
  export async function getUserById(user_id) {
    try {
       console.log("getUserById called with user_id:", user_id);
    console.log("USER_URL:", USER_URL);
      const response = await fetch(`${USER_URL}/${user_id}`, GET_METHOD_NO_AUTH);
      const data = await response.json();
      // if (!response.ok) {
      //   // Handle HTTP errors
      //   const errorText = await response.text();
      //   throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      // }
  
      
      return { response, data };
    } catch (error) {
      console.error('Error in getUserById:', error);
      throw error;
    }
  }

  export async function getUsers() {
    try {
      const response = await fetch(`${USER_URL}/?page=${page+1}&limit=10`, GET_METHOD_NO_AUTH);
  
      if (!response.ok) {
        // Handle HTTP errors
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const data = await response.json();
      return { response, data };
    } catch (error) {
      console.error('Error in getUserById:', error);
      throw error;
    }
  }
  
  export async function updateUserById(user_id, updatedData) {
    try {
      const response = await fetch(`${USER_URL}/${user_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        // Handle HTTP errors
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const data = await response.json();
      return { response, data };
    } catch (error) {
      console.error('Error in updateUserById:', error);
      throw error;
    }
  }

  export async function DeleteByUserId(user_id) {
    try {
      const response = await fetch(`${USER_URL}/${user_id}`, DELETE_METHOD_NO_AUTH);
  
      if (!response.ok) {
        // Handle HTTP errors
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const data = await response.json();
      return { response, data };
    } catch (error) {
      console.error('Error in Deleting:', error);
      throw error;
    }
  }
  

  export async function uploadFile(file, user_id) {
  const formData = new FormData();
  formData.append('file', file);
 formData.append('user_id', user_id);

  try {
    const response = await fetch(`${USER_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', response.status, errorText);
      throw new Error('Network response was not ok');
    }

    const data = await response.json(); // Parse the JSON response
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function  getUserProfile(user_id) {
  try {
    const response = await fetch(`${USER_URL}/profile/${user_id}`, GET_METHOD_NO_AUTH);

    if (!response.ok) {
      // Handle HTTP errors
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return { response, data };
  } catch (error) {
    console.error('Error in updateUserById:', error);
    throw error;
  }
}
  //product 
  export async function getProducts() {
    try {
      const response = await fetch(`${PRODUCT_URL}/?page=${page+1}&limit=10`,GET_METHOD_NO_AUTH);
  
      if (!response.ok) {
        // Handle HTTP errors
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const data = await response.json();
      return { response, data };
    } catch (error) {
      console.error('Error in getUserById:', error);
      throw error;
    }
  }

  export const resendVerificationEmail = async (email) => {
  const response = await fetch(`${USER_URL}/resend-verification-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  return { response, data };
};

 
