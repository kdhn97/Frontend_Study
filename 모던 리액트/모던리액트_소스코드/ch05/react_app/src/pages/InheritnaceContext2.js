import { createContext, useState } from "react";
const InheritanceContext = createContext();

const rootEstates = [
    {id: 1, property: '대저택'}
];
const InheritanceProvider = ({children}) => {
    const [estates, setEstates] = useState(rootEstates);
    const increaseProperty = (estate) => {
        setEstates(prev => 
            [...prev, {id: Math.floor(Math.random() * 1000), property: estate}]
        );
    }
    const context = {
        inheritance: estates,
        increase: increaseProperty
    };
    return (
        <InheritanceContext.Provider value={context}>
            {children}
        </InheritanceContext.Provider>
    )
};
const { Consumer : InheritanceConsumer } = InheritanceContext;
export { InheritanceProvider, InheritanceConsumer}
export default InheritanceContext;


