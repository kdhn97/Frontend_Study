import { useState } from 'react';
import Parent from "./Parent0";
const rootEstates = [
    {id: 1, property: '대저택'}
];
const Root = () => {
    const [estates, setEstates] = useState(rootEstates);
    return (
        <>
            <Parent inheritance={estates} />
        </>
    );
}
export default Root;