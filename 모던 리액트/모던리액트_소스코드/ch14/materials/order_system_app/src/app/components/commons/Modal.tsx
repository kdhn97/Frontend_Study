import ReactDOM from 'react-dom';
const Modal = (props) => {
   return ReactDOM.createPortal(
        <dialog open>
            <div>
                {props.children}
            </div>
        </dialog>
        , document.body);
};
export default Modal;
