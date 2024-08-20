import { useContext } from 'react';
import './LoginButton.css'
import { ApiContext } from '../context/context';

function LoginButton({username,password,onLoginSuccess}){

    const {login} = useContext(ApiContext);

    const handleLogin = () =>{
        const result = login(username,password)
        if(result.success){
            console.log('login existoso my bro');  
            onLoginSuccess();
        }else{
            console.log('Login Fallidos', result.message);
        }
    }
    return(
        <button onClick={handleLogin}>Login</button>
    );
}

export {LoginButton};