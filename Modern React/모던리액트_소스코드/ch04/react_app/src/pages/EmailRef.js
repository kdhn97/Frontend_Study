import { useState, forwardRef } from 'react';

// const EmailRef = forwardRef((props, ref) => {
const EmailRef = (props, ref) => {    
    const [email, setEmail] = useState('');
    const handleChange = (e) => {
        setEmail(e.target.value);
    }
    return (
        <div>
            <label htmlFor="email">이메일: </label>
            <input id="email" ref={ref} type="email" onChange={handleChange}/>
        </div>
    );
};
// export default EmailRef;
export default forwardRef(EmailRef);

