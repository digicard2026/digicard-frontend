import React, { useState, useRef, useEffect } from 'react';
import { useKyc } from './Authentication/KycContext';
import { USER_URL } from '../utility/constants';
import { useNavigate } from 'react-router-dom';
import Toaster from '../components/Toaster/Toaster';

const KycVerification = () => {
  
  const navigate = useNavigate();

  const { isKycVerified,kycSubmitted } = useKyc(); 

  if (isKycVerified) {
             
    setTimeout(() => {
      
      navigate('/purchase');
    }, );
  }  
  else if(kycSubmitted){
    setTimeout(()=>{
      navigate('/Kycsubmitted'); 
    },)
   }
   
   const [toast, setToast] = useState(null);
  
   const showToast = (message, type) => {
     setToast({ message, type });
   };
 
  const [fileNames, setFileNames] = useState({
    inc_certificate: '',
    gst_certificate: '',
    dot_licence: '',
    pan_certificate: ''
  });

  const [fileSizes, setFileSizes] = useState({
    inc_certificate: 0,
    gst_certificate: 0,
    dot_licence: 0,
    pan_certificate: 0
  });

  const fileInputRefs = {
    inc_certificate: useRef(null),
    gst_certificate: useRef(null),
    dot_licence: useRef(null),
    pan_certificate: useRef(null),
  };


  const [files, setFiles] = useState({
    inc_certificate: null,
    gst_certificate: null,
    dot_licence: null,
    pan_certificate: null
  });

  const [previews, setPreviews] = useState({
    inc_certificate: null,
    gst_certificate: null,
    dot_licence: null,
    pan_certificate: null
  });

  const [loading, setLoading] = useState(false);

  const handleDelete = (fileKey) => {
    setFiles((prevFiles) => ({ ...prevFiles, [fileKey]: null }));
    setPreviews((prevPreviews) => ({ ...prevPreviews, [fileKey]: null }));
    setFileNames((prevFileNames) => ({ ...prevFileNames, [fileKey]: '' }));
    setFileSizes((prevFileSizes) => ({ ...prevFileSizes, [fileKey]: 0 }));

    if (fileInputRefs[fileKey].current) {
      fileInputRefs[fileKey].current.value = '';
    }
  };

  const handleFileChange = (event) => {
    const { name, files: selectedFiles } = event.target;
    const file = selectedFiles[0];

    if (file) {
      setFiles((prevFiles) => ({ ...prevFiles, [name]: file }));
      setPreviews((prevPreviews) => ({
        ...prevPreviews,
        [name]: URL.createObjectURL(file)
      }));
      setFileNames((prevFileNames) => ({ ...prevFileNames, [name]: file.name }));
      setFileSizes((prevFileSizes) => ({ ...prevFileSizes, [name]: file.size }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 
    const requiredFields = ['inc_certificate', 'gst_certificate', 'dot_licence', 'pan_certificate'];
    const missingFields = requiredFields.filter(field => !files[field]);
    if (missingFields.length > 0) {
      showToast(`Please upload all required files: ${missingFields.join(', ')}`, "error");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    Object.keys(files).forEach((key, index) => {
      if (files[key]) {
        formData.append(key, files[key]);
        formData.append(`documentNumbers[${key}]`, `DOC-${index + 1}`);
      }
    });

    try {
      const response = await fetch(`${USER_URL}/uploadkyc`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      const result = await response.json();
      if (response.ok) {
        showToast('Documents uploaded successfully', "success");


        setFiles({
          inc_certificate: null,
          gst_certificate: null,
          dot_licence: null,
          pan_certificate: null,
        });
        setPreviews({
          inc_certificate: null,
          gst_certificate: null,
          dot_licence: null,
          pan_certificate: null,
        });

        setFileNames({
          inc_certificate: '',
          gst_certificate: '',
          dot_licence: '',
          pan_certificate: ''
        });
        setFileSizes({
          inc_certificate: 0,
          gst_certificate: 0,
          dot_licence: 0,
          pan_certificate: 0
        });

        Object.values(fileInputRefs).forEach(ref => {
          if (ref.current) {
            ref.current.value = '';
          }
        });
        setTimeout(() => {
          navigate('/Kycsubmitted');
        }, 2000);
        
      } else {
        // setErrorMessage(result.message || 'An error occurred while uploading the documents.');
        showToast(`${result.message}` || 'An error occurred while uploading the documents.', "error");
      }
    } catch (error) {
      console.error('Error uploading documents:', error);


      setErrorMessage('An error occurred while uploading the documents.');
    }finally {
      setLoading(false); 
    }
  };


  return (
    <>


      <form onSubmit={handleSubmit} className="p-6 bg-white max-w-full mx-auto rounded-lg shadow-lg space-y-6">
        {Object.keys(files).map((key) => (
          <div key={key} className="w-full border border-gray-300 rounded-lg p-6 bg-white space-y-4">
            <label className="text-lg font-semibold text-gray-700 capitalize">{key.replace('_', ' ')}</label>
            <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 hover:bg-blue-100 cursor-pointer">
              <label htmlFor={key} className="flex flex-col items-center cursor-pointer">
                <div class="mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="upload-cloud" class="lucide lucide-upload-cloud block mx-auto size-12 text-slate-500 fill-slate-200 dark:text-zink-200 dark:fill-zink-500"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m16 16-4-4-4 4"></path></svg>
                </div>
                <span className="text-sm text-gray-600 mt-2">Click to upload file</span>
                <span className="text-xs text-gray-500">Max file size: 2MB | Formats: JPG, PNG</span>
                <input
                  id={key}
                  type="file"
                  ref={fileInputRefs[key]}
                  name={key}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
            {/* Preview Section */}
            {previews[key] && (
              <div className="mt-2 border-spacing-4 border-slate-300 border rounded-lg  p-4 ">
                <div className="mt-2 flex items-center space-x-4">
                  {/* Image Preview */}
                  <div className="w-30 h-10 overflow-hidden rounded-md ">
                    <img
                      src={previews[key]}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* File Name and Size */}
                  <div className="flex-1 font-semibold text-sm text-slate-700">
                    <p>File Name: {fileNames[key]}</p>
                    <p>File Size: {(fileSizes[key] / 1024).toFixed(2)} KB</p>
                  </div>

                  {/* Delete Button */}
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleDelete(key)}
                      className="px-2 py-1.5 text-xs text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-slate-400/20"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        ))}
         {loading && (
        <p className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50">Loading...</p>
      )}
      {!loading && toast &&(
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {!loading && toast && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
        <button
         disabled={loading} 
          type="submit"
          className={`w-full ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300`}
        >
           {loading ? 'Submitting...' : 'Submit Documents'}
        </button>
      </form>

    </>

  );
};

export default KycVerification;