import { createContext } from 'react';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const name = 'Yugesh';
    const email = 'yugeshkanna@gmail.com';
    const phone = '1234567890';
    return (
        <UserContext.Provider value={{ name, email, phone }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserProvider;