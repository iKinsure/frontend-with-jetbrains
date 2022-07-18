import React from "react";

const Modal = ({message, onClick}) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span onClick={onClick} className="modal-close">&times;</span>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Modal