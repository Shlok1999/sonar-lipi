import React, { useState, useEffect } from 'react'
import '../Styles/TaalTable.css'
import { useParams } from 'react-router-dom';

function TaalTable({noOfCols, bol=[]}) {
    const [heading, setHeading] = useState('Untitle')
    const [table, setTable] = useState([Array(noOfCols).fill('')])
    const [selectedCell, setSelectedCell] = useState({rowIndex:0, colIndex: 0});
    const {filename} = useParams()

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem(filename));
        if (savedData) {
            setTable(savedData.table);
            setHeading(savedData.heading);
        }
    }, [filename]);

    useEffect(() => {
        localStorage.setItem(filename, JSON.stringify({ table, heading }));
    }, [table, heading, filename]);

    // ... (other functions remain the same)

    const handleHeadingChange = (e) => {
        setHeading(e.target.value);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            const { rowIndex, colIndex } = selectedCell;
            switch (event.key) {
                case 'ArrowUp':
                    if (rowIndex > 0) {
                        setSelectedCell({ rowIndex: rowIndex - 1, colIndex });
                    }
                    break;
                case 'ArrowDown':
                    if (rowIndex < table.length - 1) {
                        setSelectedCell({ rowIndex: rowIndex + 1, colIndex });
                    }
                    break;
                case 'ArrowLeft':
                    if (colIndex > 0) {
                        setSelectedCell({ rowIndex, colIndex: colIndex - 1 });
                    }
                    break;
                case 'ArrowRight':
                    if (colIndex < noOfCols - 1) {
                        setSelectedCell({ rowIndex, colIndex: colIndex + 1 });
                    }
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedCell, table, noOfCols]);

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem(filename));
        if (savedData) {
            setTable(savedData.table);
            setHeading(savedData.heading);
        }
    }, [filename]);

    useEffect(() => {
        localStorage.setItem(filename, JSON.stringify({ table, heading }));
    }, [table, heading, filename]);
    

    const handleCellClick =(rowIndex, colIndex)=>{
        setSelectedCell({rowIndex, colIndex})
        console.log({rowIndex, colIndex})
    }

    const handleCellChange =(rowIndex, colIndex, value)=>{
        const newData = [...table];
        newData[rowIndex][colIndex] = value;
        setTable(newData);
    }

    const handleAddRow = ()=>{
        const newRow = Array(noOfCols).fill('')
        setTable(previousTable=>[...previousTable, newRow])
    }

    const handleKeyboardInput =(value)=>{
        if (selectedCell !== null) {
            const { rowIndex, colIndex } = selectedCell;
            const currentValue = table[rowIndex][colIndex];
            if (value === 'Backspace') {
                // Remove last character from cell value
                handleCellChange(rowIndex, colIndex, currentValue.slice(0, -1));
            } else {
                handleCellChange(rowIndex, colIndex, currentValue + value);
            }
            console.log(value)
            
        }
    }

    const VirtualKeyboard = ()=>{
        const keyboardElements = [
            "सा.", "रे.", "ग.", "म.", "प.", "ध.", "नि.", "सा*",
            "सा", "रे", "ग", "म", "प", "ध", "नि","सा*",
            "रे*", "ग*", "म*", "प*", "ध*", "नि*","-", "Backspace"
        ];

        return (
            <div className='keyboard'>
                {keyboardElements.map((element, index) => (
                    <button key={index} onClick={() => handleKeyboardInput(element)}>
                        {element}
                    </button>
                ))}
            </div>
        );
    }

  return (
    <div className='taal-table-component'>
        <table className='table'>
            <thead>
                <tr className='table-head'>
                    {
                        Array.from({length: noOfCols}, (_,index)=>(
                            <td key={index}>
                                {index+1}
                            </td>
                        ))
                    }
                </tr>
                <tr className='table-head'>
                    {
                       bol.map((bolElement, index)=>(
                        <td key={index}>{bolElement}</td>
                       ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    table.map((row, rowIndex)=>(
                        <tr key={rowIndex}>
                            {
                                row.map((cell, colIndex)=>(
                                    <td
                                    key={colIndex}
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                    className={selectedCell && selectedCell.rowIndex === rowIndex && selectedCell.colIndex === colIndex ? 'selected' : ''}
                                >
                                    {cell}
                                </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>

        <button className='add-row' onClick={handleAddRow}>Add Row</button>
        <VirtualKeyboard/>
    </div>
  )
}


export default TaalTable