import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";


const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light")
    useEffect(() => {
        document.body.className = theme
    }, [theme])


    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}

export default ThemeProvider;
