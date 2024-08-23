import { React, useState } from "react";
const ApiLoginContext = React.createContext();

function LoginContext({children}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const loginContextValue = {
        username,
        setUsername,
        password,
        setPassword,
        isLoggedIn,
        setIsLoggedIn
      };
    
    return (
        <ApiLoginContext.Provider value={loginContextValue}>
          {children}
        </ApiLoginContext.Provider>
    );
}

export {LoginContext}
