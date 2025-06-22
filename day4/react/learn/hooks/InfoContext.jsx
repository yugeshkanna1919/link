import { createContext } from 'react';
export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
    const info = { name: 'Shabbeer', age: 25, dept: 'IT' };
    return (
        <InfoContext.Provider value={{ info }}>
            {children}
        </InfoContext.Provider>
    );
};
export default InfoProvider;