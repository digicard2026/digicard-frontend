import React, { createContext, useState, useContext, useEffect } from 'react';


const KycContext = createContext();


export const KycProvider = ({ children }) => {
  const [isKycVerified, setIsKycVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [kycSubmitted, setKycSubmitted]=useState(false);

  useEffect(() => {
    const storedKycStatus = localStorage.getItem('isKycVerified');
    console.log(storedKycStatus);
    if (storedKycStatus === 'undefined') {
      setIsKycVerified(false);
    }else if(storedKycStatus ) {
      setIsKycVerified(JSON.parse(storedKycStatus));
    
    }
  }, []);
  
  useEffect(() => {
    const storedKycSubmitted = localStorage.getItem('kycSubmitted');
    console.log(storedKycSubmitted);
    if (storedKycSubmitted === 'undefined') {
      setKycSubmitted(false);
    }else if(storedKycSubmitted ) {
      setKycSubmitted(JSON.parse(storedKycSubmitted));
    }
  }, []);

  
  const updateKycStatus = (status) => {
    setIsKycVerified(status);
    localStorage.setItem('isKycVerified', JSON.stringify(status));
  };
  const updateKycSubmitted = (status) => {
    setKycSubmitted(status);
    localStorage.setItem('kycSubmitted', JSON.stringify(status));
  };

  return (
    <KycContext.Provider value={{ isKycVerified, updateKycStatus, isLoading, kycSubmitted, updateKycSubmitted  }}>
      {children}
    </KycContext.Provider>
  );
};


export const useKyc = () => {
  return useContext(KycContext);
};
