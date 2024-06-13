const GrandChild = (props) => {
    return (
        <>
            <h3>GrandChild 자산</h3>
            <ul>
                {props.inheritance.map(estate => (
                    <li key={estate.id}>{estate.property}</li>
                ))}
            </ul>
        </>
    );
}
export default GrandChild;