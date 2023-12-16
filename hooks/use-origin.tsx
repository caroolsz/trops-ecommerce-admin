import { useState, useEffect } from "react"

export const useOrigin = () => {
    const [mounted, setMounted] = useState(false);
    // checking if the window is avaliable; if it is we check if the window location exists; if it exists, uses the location, if not it passes an empty string
    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : ''; 

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return '';
    }

    return origin;
}