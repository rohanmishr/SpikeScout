import { useState, useContext, createContext } from 'react'

const GlobalContext = createContext();

export const useGlobalState = () => {
    return useContext(GlobalContext);
}

/*export const GlobalProvider = ({ children }) => {
    const [tab, switchTab] = useState("datasets");

    return (
        <GlobalContext.Provider value={{ tab, switchTab }}>
            {children}
        </GlobalContext.Provider>
    )
}*/
