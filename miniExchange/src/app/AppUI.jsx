import './AppUI.css'
import { InputLogin } from '../components/InputLogin'
import { LoginButton } from '../components/LoginButton'
import { TransactionsList } from '../components/TransactionsList'
import { TransactionRegister } from '../components/TransactionRegister'
import { Dashboard } from '../components/Dashboard'

import {useState } from 'react'


function AppUI() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <div className='app'>
                <header className='app-header'>
                    <h1>miniExchange</h1>
                </header>
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
            ) :  (
                    <div className='app-main'>
                        <Dashboard />
                        <TransactionRegister />
                        <TransactionsList />
                    </div>
                     )} 
                
            </div>

        </>
    );
}

export { AppUI }

