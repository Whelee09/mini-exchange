import { useContext, useEffect, useState } from 'react';
import './TransactionsList.css'
import { ApiContext } from '../context/context';
function TransactionsList(){
    const {getTransactions} = useContext(ApiContext)
    const [transactions, setTransactions] = useState([]);
    useEffect( () =>{
        setTransactions(getTransactions());
    },[getTransactions]);
    return(
       <ul>
        {transactions.map(transaction => (
             <li key={transaction.id}>
                {transaction.type} - Amount: {transaction.amount} - Price: {transaction.price}
             </li>
        ))}
       </ul>
    );
}
export {TransactionsList};