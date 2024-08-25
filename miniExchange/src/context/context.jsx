import React from "react";
import { useState, useEffect } from "react";
import { useLocalStorage } from "../context/storage";

const APIKEY = "hola";
const USER_DATA_KEY = "USER_DATA";

const ApiContext = React.createContext();

const initialApiData = {
    user: { email: "admin@example.com", password: "password123" },
    transactions: [],
};
const initialUserData = {
    btcBalance: 0.1,
    usdBalance: Number(1000.0)
};

function ApiProvider({ children }) {
    const {
        item: apiData,
        saveItem: saveApiData,
    } = useLocalStorage(APIKEY, initialApiData);

    const {
        item: userData,
        saveItem: saveUserData,
    } = useLocalStorage(USER_DATA_KEY, initialUserData);

    const login = (email, password) => {
        if (email === apiData.user.email && password === apiData.user.password) {
            return { success: true, user: apiData.user };
        }
        return { success: false, message: "Invalid credentials" };
    };

    const [btcPrice, setBtcPrice] = useState(0);

    const getBtcPrice = async () => {
        const API_URL_BTC_PRICE = 'https://api.coindesk.com/v1/bpi/currentprice.json';
        try {
            const res = await fetch(API_URL_BTC_PRICE);
            const data = await res.json();
            const price = data.bpi.USD.rate;
            const numberWithoutCommas = price.replace(/,/g, '');
            setBtcPrice(parseFloat(numberWithoutCommas))
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getBtcPrice();
        const interval = setInterval(getBtcPrice, 20000); // TODO arreglar el tiempo, esta asi para un facil debugger
        return () => clearInterval(interval);
    }, []);


    const getTransactions = () => {
        return apiData.transactions;
    };

    const createTransaction = (monedaEnv, monedaRec, cant) => {
        // Update user balances
        const numSendAmount = Number(cant)
        
        if ( isNaN(numSendAmount)) {
            throw new Error("El monto no es válidos.");
        }

        
        const updatedUserData = { ...userData };
        
        let receiveAmount;

        // Obtener el precio actual de BTC
    
        const btcPriceUSD = btcPrice
        if (monedaEnv === 'USD' && monedaRec === 'BTC') {
            // Compra de BTC
            if (updatedUserData.usdBalance < numSendAmount) {
                throw new Error("Saldo USD insuficiente para esta compra");
            }
            receiveAmount = numSendAmount / btcPriceUSD;
            updatedUserData.usdBalance -= numSendAmount;
            updatedUserData.btcBalance += receiveAmount;
        } else if (monedaEnv === 'BTC' && monedaRec === 'USD') {
            // Venta de BTC
            if (updatedUserData.btcBalance < numSendAmount) {
                throw new Error("Saldo BTC insuficiente para esta venta");
            }
            receiveAmount = numSendAmount * btcPriceUSD;
            updatedUserData.btcBalance -= numSendAmount;
            updatedUserData.usdBalance += receiveAmount;
        } else {
            throw new Error("Combinación de monedas no válida");
        }

        const newTransaction = {
            id: Date.now(),
            monedaEnv,
            monedaRec,
            sendAmount: numSendAmount,
            receiveAmount,
            price: btcPriceUSD
        };
        const updatedTransactions = [...apiData.transactions, newTransaction];
        saveApiData({ ...apiData, transactions: updatedTransactions });
        saveUserData(updatedUserData);

        return newTransaction;
    };

    return (
        <ApiContext.Provider
            value={{
                login,
                btcPrice,
                getTransactions,
                createTransaction,
                userData
            }}
        >
            {children}
        </ApiContext.Provider>
    );
}

export { ApiContext, ApiProvider };
