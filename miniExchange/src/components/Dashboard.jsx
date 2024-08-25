import './Dashboard.css'
import { ApiContext } from '../context/context';
import { useContext } from 'react';
function Dashboard() {
    const { userData, btcPrice } = useContext(ApiContext)
    return (
        <div className='card dashboard'>
            <h2>Dashboard</h2>
            <p>BTC Balance: {userData.btcBalance}</p>
            <p>USD Balance: {userData.usdBalance}</p>
            <p>BTC price: {btcPrice}</p>
        </div>
    );
}

export { Dashboard };