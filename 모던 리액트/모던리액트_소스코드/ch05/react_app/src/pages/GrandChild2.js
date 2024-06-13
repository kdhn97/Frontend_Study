import { useContext } from 'react';
import InheritanceContext, { InheritanceConsumer } from './InheritnaceContext2';

// const GrandChild = () => {
//     return (
//         <InheritanceConsumer>
//             {context => { return (
//                 <>
//                     <h3>GrandChild 자산</h3>
//                     <ul>
//                         {context.inheritance.map(estate => (
//                             <li key={estate.id}>{estate.property}</li>
//                         ))}
//                     </ul>
//                 </>
//             )}}
//         </InheritanceConsumer>
//     );
// }
// export default GrandChild;
const GrandChild = () => {
    const context = useContext(InheritanceContext);
    return (
        <>
            <h3>GrandChild 자산</h3>
            <ul>
                {context.inheritance.map(estate => (
                    <li key={estate.id}>{estate.property}</li>
                ))}
            </ul>
        </>
    );
}
export default GrandChild;