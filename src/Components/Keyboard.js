import React, { useState } from 'react';
import '../Styles/Keyboard.css'

function Keyboard() {

  const keyboardElements = [
    "सा.", "रे.", "ग.", "म.", "प.", "ध.", "नि.", "सा*",
    "सा", "रे", "ग", "म", "प", "ध", "नि", "सा*",
    "रे*", "ग*", "म*", "प*", "ध*", "नि*", "-", "Backspace"
  ];

  return (
    <div>
      {keyboardElements.map((element, index) => (
        <button key={index}>
          {element}
        </button>
      ))}
    </div>

  );
}

export default Keyboard;
