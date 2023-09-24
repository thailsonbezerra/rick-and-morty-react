import React, { useState } from "react";
import "./Dropdown.css";

interface DropdownProps {
  children: React.ReactNode;
  items: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ children, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollStyle, setScrollStyle] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setScrollStyle(isOpen ? "" : "scroll");
    const button = document.querySelector(`.dropdown-button`);
    button?.classList.toggle("is-open");
  };

  return (
    <>
      <button onClick={toggleDropdown} className="dropdown-button">
        {children}
      </button>

      <div className={`dropdown ${scrollStyle}`}>
        {isOpen && (
          <ul className="dropdown-menu">
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Dropdown;
