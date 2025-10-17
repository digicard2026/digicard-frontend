import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { getCookie } from '../utility/cookies';
import { getUserById, updateUserById } from '../service/userApi';
import { ProfileContext } from './ProfileProvider';
import { LuEye, LuEyeOff } from "react-icons/lu";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { FiCheck, FiX } from 'react-icons/fi';
import Toaster from '../components/Toaster/Toaster';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { FcOldTimeCamera } from "react-icons/fc";
import { USER_URL } from '../utility/constants';

// const apiUrl = import.meta.env.VITE_API_URL;
// const USER_URL = `${apiUrl}/api/v1/user`;

const MyProfile = () => {
  const { profileImage, handleFileChange, imgmessage, updateProfileUrl } = useContext(ProfileContext);

  const [first_name, setfirst_name] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [company_name, setcompany_name] = useState('');
  const [landline_number, setlandline_number] = useState('');
  const [address, setaddress] = useState('');
  const [profile, setProfile] = useState('');
  const [uin_no, setuin_no] = useState();
  const [user_pin, setuser_pin] = useState();
  const [showButton, setShowButton] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [phoneError, setPhoneError] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to track visibility

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState); // Toggle the visibility state
  };


  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleFileChanges = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert('Please select an image to upload');
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append('profileImage', selectedImage);
    try {
      const response = await fetch(`${USER_URL}/upload-profile`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();
      if (data.message === 'Invalid token') {
        showToast('Session Expired redirecting to login page', 'error');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }

      if (response.ok) {
        setImageUrl(data.profile_url);// Set the URL of the uploaded image
        showToast('Image uploaded successfully', 'success');
        document.getElementById('fileInput').value = '';
        setSelectedImage(null);
        setImagePreview(null);
      } else {

        showToast('Error uploading image', 'error');
      }
    } catch (error) {
      console.error('Error uploading image:', error);

      showToast(`${error}` || 'Something went wrong!', 'error');
    } finally {
      setUploading(false);

    }
  };
  const handleDeleteImage = () => {
    document.getElementById('fileInput').value = '';
    setSelectedImage(null);
    setImagePreview(null);
    // Clear the preview
  };

  useEffect(() => {

    const fetchUserData = async () => {
      const user_id = getCookie('user_id');
      console.log('user id from cookie:', user_id); // Log email
      if (user_id) {
        try {
          const { data } = await getUserById(user_id);
          if (data.message === 'Invalid token') {
            showToast('Session Expired redirecting to login page', 'error');
            setTimeout(() => {
              navigate('/');
            }, 3000);
          } // Ensure email is sent correctly
          console.log('User data:', data); // Log user data
          setfirst_name(data.first_name);
          setEmail(data.email);
          setPhone(data.phoneNumber)
          setcompany_name(data.company_name)
          setlandline_number(data.landline_number)
          setaddress(data.address)
          setuin_no(data.uin_no)
          setuser_pin(data.user_pin)
          setImageUrl(data.profile_url);
          updateProfileUrl(data.profile_url);
          setShowButton(data.isEmailVerified)
          console.log("show button", showButton);
          console.log("ismailverified", data.isEmailVerified)
          const formattedFilePath = data.filePath.replace(/\\/g, '\\');
          setProfile(formattedFilePath)
        } catch (error) {
          console.error('Error fetching user data:', error);

        }
      }
    };

    fetchUserData();
  }, [profileImage, imageUrl]);

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  // Validate phone number using a simple regex pattern
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Accepts only 10-digit numbers
    return phoneRegex.test(phone);
  };


  const handleSave = async (event) => {
    event.preventDefault();

    const user_id = getCookie('user_id'); // Retrieve user_id from cookies
    if (!user_id) {
      console.error('User ID not found in cookies');
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError(true); // Show error message
      showToast("Invalid phone number", "error");
      return;
    }
    if (!company_name) {
      showToast("Company name is required", "error");
      return;
    }
    if (!address) {
      showToast("Address is required", "error");
      return;
    }
    if (name) {
      showToast("Name is required", "error");
      return;
    }
    if (first_name.length < 3) {
      showToast("Name must be at least 3 characters", "error");
      return;
    }
    const updatedData = {
      name: name,
      email: email,
      phone_number: phoneNumber,

    };
    console.log('update data', updatedData)
    try {
      const { response, data } = await updateUserById(user_id, updatedData);
      if (data.message === 'Invalid token') {
        showToast('Session Expired redirecting to login page', 'error');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
      console.log("profile dataaaaa",data)
      if (response.ok) {
        console.log('User updated successfully:', data);
        showToast("updated user profile info", "success");
      } else {
        console.error('Failed to update user:', response.status);
        showToast("updattion has failed user profile info", "error");

      }
    } catch (error) {
      console.error('Error updating user:', error);
      showToast("updattion has failed user profile info", "error");
    }
  };

  useEffect(() => {

    const timer = setTimeout(() => {
      setPhoneError(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [phoneError]);

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="MyProfile" />
        {toast && (
          <Toaster
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              {/* <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">

                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
              </div> */}
              <div className="px-6 py-6">
              <div className="px-6 flex flex-row items-center">
                <form action="#">

                  <div className={` relative mb-6 flex items-center justify-center`}>

                   { !imagePreview && 
                   <div className="relative w-24 h-24 bg-slate-500 rounded-full flex items-center justify-center  shadow-lg">
                      <div className="rounded-full overflow-hidden flex items-center justify-center bg-slate-500 text-white text-2xl font-semibold">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt="User"
                            className="w-24 h-24 object-cover"
                          />
                        ) : (
                          <span>
                            {first_name?.charAt(0).toUpperCase() || '?'}
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-2 right-5 transform translate-x-1/2 translate-y-1/2">
                        <FcOldTimeCamera className="w-8 h-8 text-white rounded-full p-1" />
                      </div>
                      
                    </div>}
                   <div className={`absolute ${!imagePreview ? 'w-24 h-24':''} bg-transparent rounded-full flex items-center justify-center  shadow-lg`}>
                   <input
                        type="file"
                        onChange={handleFileChanges}
                        accept="image/*"
                        id="fileInput"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                   </div>
                   {imagePreview && (
                    
                       <div className="relative w-24 h-24 bg-slate-500  rounded-full flex items-center justify-center  shadow-lg">
                      <div className="rounded-full overflow-hidden flex items-center justify-center  text-white text-2xl font-semibold">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-24 h-24 object-cover"
                        />
                      </div>
                      


                      <button
                        onClick={handleDeleteImage}
                        className="absolute bottom-0 right-3 p-0.5 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                      >
                        <FaTimes />
                      </button>

                      {/* <div>
                        <p className="text-xs text-slate-700">
                          <strong>File Name:</strong> {selectedImage.name}
                        </p>
                        <p className="text-xs text-slate-700">
                          <strong>File Size:</strong> {(selectedImage.size / 1024).toFixed(2)} KB
                        </p>
                      </div> */}
                    </div>
                    
                  
                  )}
                   {imagePreview && (
                    <div className="flex pl-10 pt-2 justify-center gap-4">
                    
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90 transition-all ease-in-out duration-200"
                      type="submit"
                      onClick={handleImageUpload}
                      disabled={uploading}
                    >
                      {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                  </div>
                  )}

                  </div>

                 
                 
                  
                </form>
              </div>
                <form action="#">
                  {/* UIN and User Pin Fields */}
                  <div className="mb-6 flex flex-col gap-6 md:flex-row">
                    <div className="w-full md:w-1/2">
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white" htmlFor="uin_no">
                        User ID
                      </label>
                      <input
                        className={`w-full rounded border py-3 px-4 text-black focus:outline-none ${uin_no ? 'border-primary' : 'border-stroke'
                          } dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                        type="number"
                        name="uin_no"
                        id="uin_no"
                        value={uin_no}
                        disabled
                      />
                    </div>

                    <div className="w-full md:w-1/2">
                      <label
                        className="mb-2 block text-sm font-medium text-black dark:text-white"
                        htmlFor="user_pin"
                      >
                        User Pin
                      </label>
                      <div className="relative flex items-center rounded">
                        <input
                          className={`w-full rounded border py-3 px-4 pr-12  text-black focus:outline-none ${user_pin ? "border-primary" : "border-stroke"
                            } dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                          type={isPasswordVisible ? "text" : "password"}
                          name="user_pin"
                          id="user_pin"
                          value={user_pin}
                          disabled={isDisabled}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-4 text-gray-600 dark:text-white"
                          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                        >
                          {isPasswordVisible ? <LuEyeOff size={17} /> : <LuEye size={17} />}
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Full Name and Phone Number Fields */}
                  <div className="mb-6 flex flex-col gap-6 md:flex-row">
                    <div className="w-full md:w-1/2">
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
                        Full Name
                      </label>
                      <input
                        className={`w-full rounded border py-3 px-4 text-black focus:outline-none ${first_name ? 'border-primary' : 'border-stroke'
                          } dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                        type="text"
                        name="fullName"
                        id="fullName"
                        value={first_name}
                        onChange={(e) => setfirst_name(e.target.value)}
                      />
                    </div>

                    <div className="w-full md:w-1/2">
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white" htmlFor="phoneNumber">
                        Phone Number
                      </label>
                      <div className="flex items-center rounded border px-4 py-3 focus-within:border-primary dark:border-strokedark dark:bg-meta-4">
                        <input
                          className="flex-grow bg-transparent text-black dark:text-white focus:outline-none"
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        {/* Verification Icon for Phone */}
                        {showButton ? (

                          <button className="ml-2 relative tooltip">
                            <FiX className="text-red-500 " />
                            <span className="tooltip-text">Verify</span>
                          </button>

                        ) : (
                          <FiCheck className="text-green-500" />
                        )}
                      </div>
                      {phoneError && <p className="text-red-500 text-sm mt-1">Invalid phone number</p>}
                    </div>
                  </div>

                  {/* Address and Email Fields */}
                  <div className="mb-6 flex flex-col gap-6 md:flex-row">
                    <div className="w-full md:w-1/2">
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white" htmlFor="address">
                        Address
                      </label>
                      <input
                        className={`w-full rounded border py-3 px-4 text-black focus:outline-none ${address ? 'border-primary' : 'border-stroke'
                          } dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                        type="text"
                        name="address"
                        id="address"
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
                      />
                    </div>

                    <div className="w-full md:w-1/2">
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white" htmlFor="email">
                        Email
                      </label>
                      <div className="flex items-center  cursor-not-allowed rounded border px-4 py-3 focus-within:border-primary dark:border-strokedark dark:bg-meta-4">
                        <input
                          className="flex-grow bg-transparent text-slate-500  cursor-not-allowed dark:text-white focus:outline-none"
                          type="text"
                          name="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled
                        />
                        {/* Verification Icon for Email */}
                        {!showButton ? (
                          <button className="ml-2" >
                            <FiX className="text-red-500" />
                          </button>
                        ) : (
                          <FaCheckCircle className="text-green-500" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Company Name and Landline Number */}
                  <div className="mb-6 flex flex-col gap-6 md:flex-row">
                    <div className="w-full md:w-1/2">
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white" htmlFor="company_name">
                        Company Name
                      </label>
                      <input
                        className={`w-full rounded border py-3 px-4 text-black focus:outline-none ${company_name ? 'border-primary' : 'border-stroke'
                          } dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                        type="text"
                        name="company_name"
                        id="company_name"
                        value={company_name}
                        onChange={(e) => setcompany_name(e.target.value)}
                      />
                    </div>

                    <div className="w-full md:w-1/2">
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white" htmlFor="landline_number">
                        Landline Number
                      </label>
                      <input
                        className={`w-full rounded border py-3 px-4 text-black focus:outline-none ${landline_number ? 'border-primary' : 'border-stroke'
                          } dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                        type="text"
                        name="landline_number"
                        id="landline_number"
                        value={landline_number}
                        onChange={(e) => setlandline_number(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-4">
                    <button
                      className="rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-lg dark:border-strokedark dark:text-white"
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      className="rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                      type="submit"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark w-72 mx-auto">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                {imgmessage.text && (
                  <p
                    className={`mt-4 absolute z-50 w-full text-center ${imgmessage.type === 'success' ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {imgmessage.text}
                  </p>
                )}
                <h3 className="font-medium text-black dark:text-white">
                  Your Photo
                </h3>
              </div>
             
            </div>
          </div> */}


        </div>
      </div>
    </>
  );
};

export default MyProfile;
