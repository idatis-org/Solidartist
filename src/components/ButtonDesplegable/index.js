
import React, { useState } from 'react';
import './ButtonDesplegable.css'
import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';

const ButtonDesplegable = ({ onEditClick, onDeleteClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleEditClick = () => {
    onEditClick();
    setIsOpen(false);
  };

  const handleDeleteClick = () => {
    onDeleteClick();
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={handleButtonClick}>
        <FaEllipsisV />
      </button>
      {isOpen && (
        <div className="dropdown-options">
          <button className="dropdown-option" onClick={handleEditClick}>
            <FaEdit />
            Editar
          </button>
          <button className="dropdown-option" onClick={handleDeleteClick}>
            <FaTrash />
            Borrar
          </button>
        </div>
      )}
    </div>
  );
};

export default ButtonDesplegable;