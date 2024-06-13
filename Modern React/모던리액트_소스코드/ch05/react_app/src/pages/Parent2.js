import { useContext } from 'react';
import InheritanceContext from './InheritnaceContext2';
import Child from "./Child2";
const Parent = () => {
    const context = useContext(InheritanceContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        context.increase(e.target.property.value);
    }
    return (
        <>
            <h3>Parent 자산</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor='property'>자산: </label>
                <input id="property"/>
                <button>증식</button>
            </form>
            <ul>
                {context.inheritance.map(estate => (
                    <li key={estate.id}>{estate.property}</li>
                ))}
            </ul>
            <Child />
        </>
    );
}
export default Parent;
