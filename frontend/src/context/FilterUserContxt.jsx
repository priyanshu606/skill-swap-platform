import { useState } from "react";
import { createContext } from "react";

export const FilterUserContext = createContext({
    publicUser: [],
    setPublicUser: () => {},
});

export const FilterUserProvider = (props)=>{
    const [publicUser, setPublicUser] = useState([]);
    return (
       <FilterUserContext.Provider value={{publicUser, setPublicUser}}>
        {props.children}
       </FilterUserContext.Provider>
    )
}