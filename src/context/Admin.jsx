import { createContext, useState } from "react";

export const LoginContext = createContext(null);

export const LoginContextProvider = (props) => {
  const [adminData, setAdminData] = useState("");
  const [userData, setuserData] = useState([]);
  return (
    <LoginContext.Provider
      value={{
        adminData,
        setAdminData,
        userData,
        setuserData,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
