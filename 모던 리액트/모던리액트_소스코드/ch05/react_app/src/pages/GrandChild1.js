import { useContext } from 'react';
import InheritanceContext from './InheritnaceContext1';

// const GrandChild = () => {
//     const context = useContext(InheritanceContext);
//     return (
//         <InheritanceContext.Consumer>
//         { context => {
//             return (
//                 <>
//                     <h3>GrandChild 자산</h3>
//                     <ul>
//                         {context.inheritance.map(estate => (
//                             <li key={estate.id}>{estate.property}</li>
//                         ))}
//                     </ul>
//                 </>
//             )
//         }}
//         </InheritanceContext.Consumer>
//     );
// }
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

