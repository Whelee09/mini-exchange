import './TransactionRegister.css'
import { useContext,useState } from "react";
import { ApiContext} from '../context/context';

function TransactionRegister(){
    const { createTransaction} = useContext(ApiContext)
    const [type, setType] = useState('buy');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        const price = Math.random * 1000;//TODO hacer que se consuma
        createTransaction(type, parseFloat(amount), price)
        setAmount('')
    }
    return(
       <form onSubmit={handleSubmit}>
        <select value ={type} onChange = { e => setType(e.target.value)}>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
        </select>
        <input 
            type="number"
            value = {amount}
            onChange = {e =>setAmount(e.target.value)}
            placeholder = "amount"
        />
        <button type="submit">submit</button>
       </form>
    );
}
export {TransactionRegister};