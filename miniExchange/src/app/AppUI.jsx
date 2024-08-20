import { InputLogin } from '../components/InputLogin'
import { LoginButton } from '../components/LoginButton'
import { TransactionsList } from '../components/TransactionsList'
import { TransactionRegister } from '../components/TransactionRegister'
import { Dashboard } from '../components/Dashboard'

import { useContext, useState } from 'react'
import { ApiContext } from '../context/context'


function AppUI() {
    const { loading, error } = useContext(ApiContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    if (loading) return <p>cargando...</p>
    if (error) return <p>Error: {error}</p>
    return (
        <>
            <h1>miniExchange</h1>
            {!isLoggedIn ? (
                <div>
                    <p>Ingrese sus credenciales</p>
                    <InputLogin 
                        title={'usuario'} 
                        value = {username}
                        onChange = {setUsername}
                    />
                    <InputLogin 
                        title={'contrasenia'} 
                        value = {password}
                        onChange = {setPassword}
                    />
                    <LoginButton 
                        username = {username}
                        password = {password}
                        onLoginSuccess = {() =>setIsLoggedIn(true)}
                    />
                </div>
            ) : (
                <div>
                    <Dashboard />
                    <TransactionRegister />
                    <TransactionsList />
                </div>
            )}
        </>
    );
}

export { AppUI }

