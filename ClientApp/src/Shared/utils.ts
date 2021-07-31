import { useEffect, useState } from 'react';

export function useOutsideAlerter(ref: any, callback: Function) {
    useEffect(() => {
        function hadleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback(event);
            }
        }

        document.addEventListener('mousedown', hadleClickOutside);
        document.addEventListener('touchstart', hadleClickOutside)
        return () => {
            document.removeEventListener('mousedown', hadleClickOutside);
            document.removeEventListener('touchstart', hadleClickOutside);
        }
    }, [ref, callback]);
}


export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);
    
    useEffect(() => {
        const media = window.matchMedia(query);
        setMatches(media.matches);

        const listener = (ev: MediaQueryListEvent): any => {
            setMatches(ev.matches);
        }
        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
}

export function deepCopy<T extends object>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}