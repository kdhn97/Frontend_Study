import InheritanceContext from './InheritnaceContext1';
import Child from "./Child1";
const Parent = (props) => {
    const context = {
        inheritance: props.inheritance
    };
    return (
        <InheritanceContext.Provider value={context}>
            <h3>Parent 자산</h3>
                <ul>
                    {props.inheritance.map(estate => (
                        <li key={estate.id}>{estate.property}</li>
                    ))}
                </ul>
            <Child />
        </InheritanceContext.Provider>
    );
}
export default Parent;


