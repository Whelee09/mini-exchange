import React from 'react';

function useLocalStorage(key, initialValue) {
  const [item, setItem] = React.useState(initialValue);

  React.useEffect(() => {
    try {
      const localStorageItem = localStorage.getItem(key);

      if (!localStorageItem) {
        localStorage.setItem(key, JSON.stringify(initialValue));
      } else {
        setItem(JSON.parse(localStorageItem));
      }
    } catch (error) {
      console.log(error);
    }
  }
    , [key, initialValue]);

  const saveItem = (newItem) => {
    try {
      localStorage.setItem(key, JSON.stringify(newItem));
      setItem(newItem);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    item,
    saveItem
  };
}

export { useLocalStorage };