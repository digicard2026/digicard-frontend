import React, { createContext, useState } from 'react';
import { getCookie } from '../utility/cookies';
import { uploadFile } from '../service/userApi';
import { useEffect } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState('');
  const [file, setFile] = useState(null);
  const [imgmessage, setimgMessage] = useState({ text: '', type: '' })
  const [user, setUser] = useState({
    profile_url: ''
  });
  const [role, setRole] = useState(''); 

 const path = "http://localhost:3000/"
 
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log('File selected:', selectedFile);
      setFile(selectedFile);
      const objectURL = URL.createObjectURL(selectedFile);
      console.log('Object URL:', objectURL);
      setProfileImage(objectURL);
    } else {
      console.error('No file selected');
    }
  };
  const updateProfileUrl = (url) => {
    setUser((prevUser) => ({
      ...prevUser,
      profile_url: url,
    }));
  };
  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);
  const updateRole = (userRole) => {
    setRole(userRole);
    localStorage.setItem('role', userRole);  // Persist the role in localStorage
  };

  // const handleSaveImage = async (e) => {
  //   e.preventDefault();
  //   const user_id = getCookie('user_id'); // Retrieve user_id from cookies
  //   if (!user_id) {
  //     console.error('User ID not found in cookies');
  //     return;
  //   }

  //   try {
  //     const response = await uploadFile(file, user_id);
  //     //const formattedFilePath = response.data.filePath.replace(/\\/g, '\\');
  //     //setProfile(formattedFilePath)
  //     console.log("logger", response);
  //     if (response.message) {
  //       const formattedFilePath = response.data.filePath.replace(/\\/g, '\\');
  //       setProfileImage(path + formattedFilePath);

  //       setimgMessage({ text: "Updated User image", type: "success" })

  //     }
  //     else {
  //       console.error('Failed to update image:', response.status);
  //       // Handle non-200 responses
  //       setimgMessage({ text: "Updattion Has Failed User Profile Image", type: "error" })

  //     }

  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     setimgMessage({ text: "Updattion Has Failed User Profile Image", type: "error" })
  //   }
  // };  


  return (
    <ProfileContext.Provider value={{ profileImage, handleFileChange ,imgmessage,updateProfileUrl,user , role, updateRole}}>
      {children}
    </ProfileContext.Provider>
  );
};
