import React from 'react';

function useLocalStorage(key, initialValue) {
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  
  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(key);
    
        //let parsedItem;
  
        if (!localStorageItem) {
          localStorage.setItem(key, JSON.stringify(initialValue));
        } else {
          setItem(JSON.parse(localStorageItem));
        }
  
        setLoading(false);
      } catch(error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }, [key, initialValue]);
  });

  const saveItem = (newItem) => {
    try {
      localStorage.setItem(key, JSON.stringify(newItem));
      setItem(newItem);
    } catch(error) {
      console.error(error);
      setError(true);
    }
  };

  return {
    item,
    saveItem,
    loading,
    error,
  };
}

export { useLocalStorage };