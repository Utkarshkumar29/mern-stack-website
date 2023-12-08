import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const UserContext = createContext({});

const UserContextProvider=({children})=>{
  const [user,setUser] = useState(null);
  
  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({data}) => {
        console.log("User data fetched:", data);
        setUser(data);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider