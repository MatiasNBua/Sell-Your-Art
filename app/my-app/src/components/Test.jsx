import React from 'react';
import './Test.css'; // Importa tu archivo CSS de estilo

export default function ThreeDotsButton ({ onClick }){

  return (
    <button className="three-dots-button" onClick={onClick}>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </button>
  );
};

