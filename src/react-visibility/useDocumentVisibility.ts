import { useState,useEffect, useRef } from 'react';

function getDocumentVisibility() {
    if (typeof document === "undefined") {
        return true;
    }
    return !document.hidden;
}

export const useDocumentVisibility = () => {
    const [visible, setIsVisible] = useState(getDocumentVisibility());
    const [camel, setCamel] = useState(0);
    const callbacks = useRef([]);

    const onVisibilityChangeAll = () => {
        if(getDocumentVisibility() === false){
            setCamel(count => count + 1);
        }
        setIsVisible(getDocumentVisibility());
        callbacks.current.forEach(element => {
            element();
        });
    };

    const onVisibilityChange = (callback) => {
        callbacks.current.push(
            () => callback(getDocumentVisibility())
        )
    };

    useEffect(() => {
        document.addEventListener('visibilitychange', onVisibilityChangeAll);
        return () => {
            document.removeEventListener('visibilitychange', onVisibilityChangeAll);
        };
    }, []);

    return {
        count: camel,
        visible,
        onVisibilityChange
    };
};

