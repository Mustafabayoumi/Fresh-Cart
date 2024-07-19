/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
export  let  CounterContext = createContext(0);
//React Component
export default function CounterContextProvider(props)
{

    const [Counter, setCounter] = useState(0);
    const [UsernName, setUsernName] = useState('');


    return <CounterContext.Provider value={{Counter , UsernName , setCounter , setUsernName }}>
                {props.children}
    </CounterContext.Provider>
}

