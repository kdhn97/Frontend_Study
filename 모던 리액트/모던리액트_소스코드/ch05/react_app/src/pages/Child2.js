import GrandChild from "./GrandChild2";
const Child = () => {
    return (
        <>
            <h3>Child 자산</h3>
            <ul>
                <li>없음</li>
            </ul>
            <GrandChild/>
        </>
    );
}
export default Child;