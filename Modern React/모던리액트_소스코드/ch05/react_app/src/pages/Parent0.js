import Child from "./Child0";
const Parent = (props) => {
    return (
        <>
            <h3>Parent 자산</h3>
                <ul>
                    {props.inheritance.map(estate => (
                        <li key={estate.id}>{estate.property}</li>
                    ))}
                </ul>
            <Child inheritance={props.inheritance}/>
        </>
    );
}
export default Parent;