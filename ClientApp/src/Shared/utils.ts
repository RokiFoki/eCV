import { useEffect } from 'react';

export function useOutsideAlerter(ref: any, callback: any) {
    useEffect(() => {
        function hadleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback(event);
            }
        }

        document.addEventListener('mousedown', hadleClickOutside);
        return () => {
            document.removeEventListener('mousedown', hadleClickOutside);
        }
    }, [ref]);
}