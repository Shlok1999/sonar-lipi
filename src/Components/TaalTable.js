import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import '../Styles/TaalTable.css';

function TaalTable({ noOfCols, bol = [], initialData = [] }) {
    const { filename } = useParams();
    const [description, setDescription] = useState("");
    const [table, setTable] = useState(initialData.length > 0 ? initialData : [Array(noOfCols).fill('')]);
    const [selectedCell, setSelectedCell] = useState(null);


    const tableComp = useRef();

    const generatePdf = useReactToPrint({
        content: () => tableComp.current,
        documentTitle: filename,
        onAfterPrint: () => alert("Data Downloaded")
    })

    // Fetch data from server on component mount
    useEffect(() => {
        fetch(`http://localhost:5000/files/${filename}`)
            .then(response => response.json())
            .then(data => {
                if (data.tableData) {
                    setTable(JSON.parse(data.tableData));
                    setDescription(data.description);
                }
            })
            .catch(error => {
                console.error('Error fetching the table data!', error);
            });
    }, [filename]);

    // Debounced function to save data to the server
    const saveData = useCallback(() => {
        fetch(`http://localhost:5000/files/${filename}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description, tableData: table })
        })
            .then(response => response.json())
            .catch(error => {
                console.error('Error updating the table data!', error);
            });
    }, [description, table, filename]);
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (selectedCell !== null) {
                const { rowIndex, colIndex } = selectedCell;
                switch (event.key) {
                    case 'ArrowUp':
                        setSelectedCell({
                            rowIndex: Math.max(rowIndex - 1, 0),
                            colIndex
                        });
                        break;
                    case 'ArrowDown':
                        setSelectedCell({
                            rowIndex: Math.min(rowIndex + 1, table.length - 1),
                            colIndex
                        });
                        break;
                    case 'ArrowLeft':
                        setSelectedCell({
                            rowIndex,
                            colIndex: Math.max(colIndex - 1, 0)
                        });
                        break;
                    case 'ArrowRight':
                        setSelectedCell({
                            rowIndex,
                            colIndex: Math.min(colIndex + 1, noOfCols - 1)
                        });
                        break;
                    default:
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedCell, table.length, noOfCols]);


    // Debounce saveData to prevent excessive server updates
    useEffect(() => {
        const timer = setTimeout(saveData, 500); // Adjust debounce delay as needed
        return () => clearTimeout(timer);
    }, [table, description, saveData]);

    const handleCellClick = (rowIndex, colIndex) => {
        setSelectedCell({ rowIndex, colIndex });
    };

    const handleCellChange = (rowIndex, colIndex, value) => {
        const newData = [...table];
        newData[rowIndex][colIndex] = value;
        setTable(newData);
    };

    const handleAddRow = () => {
        const newRow = Array(noOfCols).fill('');
        setTable(previousTable => [...previousTable, newRow]);
    };

    const handleSubtractRow = () => {
        setTable(previousTable => {
            // Ensure there's at least one row before removing
            if (previousTable.length > 1) {
                // Create a copy of the previous table excluding the last row
                const updatedTable = previousTable.slice(0, -1);
                return updatedTable;
            } else {
                // If there's only one row, return the current table without any changes
                return previousTable;
            }
        });
    }

    const handleKeyboardInput = (value) => {
        if (selectedCell !== null) {
            const { rowIndex, colIndex } = selectedCell;
            const currentValue = table[rowIndex][colIndex];
            if (value === 'X') {
                handleCellChange(rowIndex, colIndex, currentValue.slice(0, -1));
            } else {
                handleCellChange(rowIndex, colIndex, currentValue + value);
            }
        }
    };

    const VirtualKeyboard = () => {
        const keyboardElements = [
            "सा़", "रे़॒", "रे़", "ग़॒", "ग़", "म़", "म़॑", "प़", "ध़॒", "ध़", "नि़॒", "नि़",
            "सा", "रे॒", "रे", "ग॒", "ग", "म", "म॑", "प", "ध॒", "ध", "नि॒", "नि",
            "साँ", "रेँ॒", "रेँ", "गँ॒", "गँ", "मँ", "मँ॑", "पँ", "धँ॒", "धँ", "निँ॒", "निँ", "-", "X"
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
    };

    return (

        <div className='taal-table-component'>
            <div><h2>{filename}</h2></div>
            <div>{description}</div>
            <div className='print-table-section'>
                <table ref={tableComp} className='table'>
                    <thead>
                        <tr className='table-head'>
                            {Array.from({ length: noOfCols }, (_, index) => (
                                <td key={index}>
                                    {index + 1}
                                </td>
                            ))}
                        </tr>
                        <tr className='table-head'>
                            {bol.map((bolElement, index) => (
                                <td key={index}>{bolElement}</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, colIndex) => (
                                    <td
                                        onClick={() => handleCellClick(rowIndex, colIndex)}
                                        key={colIndex}
                                        className={selectedCell?.rowIndex === rowIndex && selectedCell?.colIndex === colIndex ? 'selected-cell' : ''}
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="buttons">
                <button className='add-row' onClick={handleAddRow}>Add Row</button>
                <button className='add-row' onClick={handleSubtractRow}>Remove Row</button>
            </div>

            <VirtualKeyboard />
            <button onClick={generatePdf} className='add-row'>Download Table As Pdf</button>

        </div>
    );
}

export default TaalTable;
