import React, { createContext, useContext, useState, useEffect } from 'react';

const LoginContext = createContext();

export const useLoginContext = () => {
  return useContext(LoginContext);
};

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ 
    id: null, 
    token: null
  });
  //console.log(isLoggedIn)

  // Initialize isLoggedIn and userInfo from local storage on component mount
  useEffect(() => {
    try {
      const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
      const storedUserInfo = localStorage.getItem('userInfo');
  
      if (storedIsLoggedIn === 'true' && storedUserInfo) {
        setIsLoggedIn(true);
        setUserInfo(JSON.parse(storedUserInfo));
      }
  
      // Check if the token is null and clear local storage if needed ***
      const parsedUserInfo = JSON.parse(storedUserInfo);
      if (parsedUserInfo.token === null) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userInfo');
      }
      
    } catch (error) {
      console.log(error)
    }
    //added code above from *** can be removed if need be
  }, []);
  
  // Set local storage values whenever isLoggedIn or userInfo changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [isLoggedIn, userInfo]);


  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, userInfo, setUserInfo }}>
      {children}
    </LoginContext.Provider>
  );
};
