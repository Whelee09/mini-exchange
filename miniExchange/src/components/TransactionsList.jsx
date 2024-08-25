import { useContext, useEffect, useState } from 'react';
import './TransactionsList.css'
import { ApiContext } from '../context/context';
function TransactionsList() {
    const { getTransactions } = useContext(ApiContext)
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        setTransactions(getTransactions());
    }, [getTransactions]);

    return (
        transactions.length > 0 ? (
            <div className='car transaction-history'>
                <ul>
                    {transactions.map(transaction => (
                        <li key={transaction.id}>
                            {`Sent: ${transaction.sendAmount} ${transaction.monedaEnv}  Price: (${transaction.price} per bitcoin)   || Recieve: ${transaction.receiveAmount} ${transaction.monedaRec}`}
                        </li>
                    ))}
                </ul>
            </div>

        ) :
            (
                <p>No hay transacciones para mostrar</p>
            )
    );
}
export { TransactionsList };
