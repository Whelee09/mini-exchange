// import { useState } from 'react';
import './InputLogin.css'

function InputLogin({title, value, onChange}){

    //const [inputValue, setInputValue] = useState('');
    const handleChange = (e) =>{
       // setInputValue(e.target.value)
       onChange(e.target.value);
    }

    return(
       <input 
        type={title === 'contrasenia' ? 'password' : 'text'}
        placeholder={title} 
        value={value}
        onChange={handleChange}
        />
    );
}


export {InputLogin};