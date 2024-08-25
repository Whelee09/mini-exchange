import './TransactionRegister.css'
import { useContext, useState } from "react";
import { ApiContext } from '../context/context';

function TransactionRegister() {
    const { createTransaction, btcPrice } = useContext(ApiContext)
    const [sendCurrency, setSendCurrency] = useState('USD');
    const [receiveCurrency, setReceiveCurrency] = useState('BTC');
    const [sendAmount, setSendAmount] = useState('');
    const [receiveAmount, setReceiveAmount] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            createTransaction(sendCurrency, receiveCurrency, sendAmount)
            setSendAmount('');
            setReceiveAmount('')
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSendAmountChange = (e) => {
        const amount = e.target.value;
        setSendAmount(amount);

        // Calcular automáticamente la cantidad a recibir
        if (sendCurrency === 'USD' && receiveCurrency === 'BTC') {
            setReceiveAmount((Number(amount) / Number(btcPrice)).toFixed(8));
        } else if (sendCurrency === 'BTC' && receiveCurrency === 'USD') {
            setReceiveAmount((Number(amount) * Number(btcPrice)).toFixed(2));
        }
    }

    const handleCurrencySwitch = () => {
        setSendCurrency(sendCurrency === 'USD' ? 'BTC' : 'USD');
        setReceiveCurrency(receiveCurrency === 'USD' ? 'BTC' : 'USD');
        setSendAmount('');
        setReceiveAmount('');
    }


    return (
        <div className='card transaction-form'>
            <form onSubmit={handleSubmit} className="transaction-form">
                <h2>Realizar Transacción</h2>
                <div>
                    <label>Enviar:</label>
                    <input
                        type="number"
                        value={sendAmount}
                        onChange={handleSendAmountChange}
                        placeholder={`Cantidad en ${sendCurrency}`}
                        step={sendCurrency === 'BTC' ? "0.00000001" : "0.01"}
                        min="0"
                        required
                    />
                    <span>{sendCurrency}</span>
                </div>
                <div>
                    <label>Recibir:</label>
                    <input
                        type="number"
                        value={receiveAmount}
                        readOnly
                        placeholder={`Cantidad en ${receiveCurrency}`}
                    />
                    <span>{receiveCurrency}</span>
                </div>
                <button type="button" onClick={handleCurrencySwitch}>
                    Cambiar Dirección
                </button>
                <button type="submit">Realizar Transacción</button>
            </form>
        </div>

    );
}
export { TransactionRegister };