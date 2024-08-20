import './Dashboard.css'
import { ApiContext } from '../context/context';
import { useContext } from 'react';
function Dashboard(){
    const {userData} = useContext(ApiContext)
    return(
       <div>
        <h2>Im the Dashboard</h2>
        <p>BTC Balance: {userData.btcBalance}</p>
        <p>USD Balance: {userData.usdBalance}</p>
       </div>
    );
}

export {Dashboard};