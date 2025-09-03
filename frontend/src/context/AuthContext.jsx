import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [signUpPopup, setSignUpPopup] = useState(false);
  return(
    <AuthContext.Provider value={{
        showPopup,
        setShowPopup,
        signUpPopup,
        setSignUpPopup,
      }} >
        {props.children}
        </AuthContext.Provider>
  )
   
};
