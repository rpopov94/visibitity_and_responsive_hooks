import { useState,useEffect, useRef } from 'react';

function getDocumentVisibility() {
    if (typeof document === "undefined") {
        return true;
    }
    return !document.hidden;
}

export const useDocumentVisibility = () => {
    const [visible, setIsVisible] = useState(getDocumentVisibility());
    const [count, setcount] = useState(0);
    const callbacks = useRef([]);

    const onVisibilityChangeAll = () => {
        if(getDocumentVisibility() === false){
            setcount(count => count + 1);
        }
        setIsVisible(getDocumentVisibility());
        callbacks.current.forEach(element => {
            element();
        });
    };

    const onVisibilityChange = (callback) => {
        const event = (() => callback(getDocumentVisibility()));
        callbacks.current.push(() => event());
    };

    useEffect(() => {
        document.addEventListener('visibilitychange', onVisibilityChangeAll, false);
        const cleanCallbacks = callbacks.current;
        return () => {
            document.removeEventListener('visibilitychange', onVisibilityChangeAll);
            cleanCallbacks.length = 0;
        };
    }, []);

    return {
        count,
        visible,
        onVisibilityChange
    };
};

