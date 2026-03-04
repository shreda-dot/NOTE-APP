import React, { useEffect } from 'react'

const useLocalStorage = <T>(key: string, initialValue: T | (() => T)) => {
    const [storedValue, setStoredValue] = React.useState<T>(() => {

        try {
            const item = window.localStorage.getItem(key);
            if (item === null) {
                if (typeof initialValue === 'function') {
                    return (initialValue as () => T)();


                } else {
                    return initialValue
                }

            } else {
                return JSON.parse(item);
            }
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

   useEffect(() => {

    localStorage.setItem(key, JSON.stringify(storedValue));
   }, [storedValue, key])


    return [storedValue, setStoredValue] as [T, typeof setStoredValue]
}

export default useLocalStorage
