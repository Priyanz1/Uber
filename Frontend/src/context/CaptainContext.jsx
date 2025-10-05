import { createContext, useState } from "react";


export const CaptainDataContext = createContext({})
const UserContext=({ children })=>{
  const [captain, setCaptain] = useState(
    {
       email:'',
       name:''
    }
  );

  return (<div>
    <CaptainDataContext.Provider value={{ user, setUser }}>
      {children}
      </CaptainDataContext.Provider>;
  </div>)
}

export default UserContext;
