import React, { useState, useEffect, useRef } from "react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [modalDisplay, setModalDisplay] = useState<string>("none");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setModalDisplay("flex");
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      setModalDisplay("none");
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div className="modal" style={{ display: modalDisplay }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body" ref={modalRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
