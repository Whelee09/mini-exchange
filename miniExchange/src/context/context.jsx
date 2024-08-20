import React from "react";
import { useLocalStorage } from "../context/storage";

const APIKEY = "hola";
const USER_DATA_KEY = "USER_DATA";

const ApiContext = React.createContext();

const initialApiData = {
    user: { email: "admin@example.com", password: "password123" },
    transactions: [],
};
const initialUserData = {
    btcBalance: 0.002,
    usdBalance: 1200
};


function ApiProvider({ children }) {
    const {
        item: apiData,
        saveItem: saveApiData,
        loading: apiLoading,
        error: apiError,
    } = useLocalStorage(APIKEY, initialApiData);

    const {
        item: userData,
        saveItem: saveUserData,
        loading: userLoading,
        error: userError,
    } = useLocalStorage(USER_DATA_KEY, initialUserData);

    const login = (email, password) => {
        if (email === apiData.user.email && password === apiData.user.password) {
            return { success: true, user: apiData.user };
        }
        return { success: false, message: "Invalid credentials" };
    };

    const getTransactions = () => {
        return apiData.transactions;
    };

    const createTransaction = (type, amount, price) => {
        const newTransaction = {
            id: Date.now(),
            type,
            amount,
            price,
            date: new Date().toISOString(),
        };
    const updatedTransactions = [...apiData.transactions, newTransaction];
    saveApiData({ ...apiData, transactions: updatedTransactions });

    // Update user balances
    const updatedUserData = { ...userData };
    if (type === 'buy') {
        updatedUserData.btcBalance += amount;
        updatedUserData.usdBalance -= amount * price;
    } else if (type === 'sell') {
        updatedUserData.btcBalance -= amount;
        updatedUserData.usdBalance += amount * price;
    }
    saveUserData(updatedUserData);

    return newTransaction;
};

const loading = apiLoading || userLoading;
const error = apiError || userError;
return (
    <ApiContext.Provider
      value={{
        login,
        getTransactions,
        createTransaction,
        userData,
        loading,
        error,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

    export { ApiContext, ApiProvider };
