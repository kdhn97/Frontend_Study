import GrandChild from "./GrandChild0";
const Child = (props) => {
    return (
        <>
            <h3>Child 자산</h3>
            <ul>
            {props.inheritance.map(estate => (
                <li key={estate.id}>{estate.property}</li>
            ))}
            </ul>
            <GrandChild inheritance={props.inheritance}/>
        </>
    );
}
export default Child;