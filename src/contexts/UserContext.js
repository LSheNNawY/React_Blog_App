import React, {createContext, useState} from 'react';

export const UserContext = createContext();
const {Provider} = UserContext;

export const UserProvider = ({children}) => {
    const [ user , setUser ] = useState();
    return (
        <Provider value={{ user , setUser }}>{ children }</Provider>
    );
};
