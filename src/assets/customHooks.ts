import { useState } from "react"

export const useLocalSorage = <T>(key: string, initialValue: T) => {

    const [state, setState] = useState<T>(() => {
        try {
            const storedValue = window.localStorage.getItem(key);
            if (storedValue) {
                return JSON.parse(storedValue);
            }
            else {
                return initialValue;
            }
        }
        catch (error) {
            console.log(error)
            return initialValue;
        }
    })
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(state) : value;
            setState(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        catch(error) {
            console.log(error)
        }
    }
    return [state, setValue] as const;
}