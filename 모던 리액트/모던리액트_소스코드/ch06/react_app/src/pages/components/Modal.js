import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
const Modal = (props) => {
    // const [isCSR, setIsCSR] = useState(false); 
    // useEffect(() => {
    //   setIsCSR(true);
    // }, [])
    
    // if (typeof window === 'undefined') return <></>;
    // if (!isCSR) return <></>;
  
    return ReactDOM.createPortal(
        <dialog open>
            <p>
                {props.children}
            </p>
            <button onClick={props.onClose}>확인</button>
        </dialog>
        , document.getElementById("modal")/*document.body*/);
};

export default Modal;