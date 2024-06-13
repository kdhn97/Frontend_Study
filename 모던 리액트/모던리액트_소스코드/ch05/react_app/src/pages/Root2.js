import { InheritanceProvider } from './InheritnaceContext2';
import Parent from "./Parent2";
const Root = () => {
    return (
        <InheritanceProvider>
            <Parent/>
        </InheritanceProvider>
    );
}
export default Root;