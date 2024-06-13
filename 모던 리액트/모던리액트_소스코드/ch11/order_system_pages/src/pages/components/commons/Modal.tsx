import ReactDOM from 'react-dom';
const Modal = (props) => {
   return ReactDOM.createPortal(
        <dialog open>
            <p>
                {props.children}
            </p>
        </dialog>
        , document.body);
};
export default Modal;
