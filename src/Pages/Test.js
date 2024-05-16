import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/Test.css'

const Table = ({ noOfCols, bol }) => {
    bol = ['Dha', 'Dhin', 'Dhin', 'Dha', 'Dha', 'Dhin', 'Dhin', 'Dha', 'Dha', 'Tin', 'Tin', 'Ta', 'Ta', 'Dhin', 'Dhin', 'Dha'];

    const { taal } = useParams();
    let editCell = true
    const [tableData, setTableData] = useState([Array(16).fill('')]);
    const [selectedCell, setSelectedCell] = useState(null);

    const handleCellChange = (rowIndex, colIndex, value) => {
        const newData = [...tableData];
        newData[rowIndex][colIndex] = value;
        setTableData(newData);
    };

    const handleCellClick = (rowIndex, colIndex) => {
        setSelectedCell({ rowIndex, colIndex });
        console.log([rowIndex, colIndex])
    };

    const handleKeyboardInput = (value) => {
        if (selectedCell !== null) {
            const { rowIndex, colIndex } = selectedCell;
            const currentValue = tableData[rowIndex][colIndex];
            if (value === 'Backspace') {
                // Remove last character from cell value
                handleCellChange(rowIndex, colIndex, currentValue.slice(0, -1));
            } else {
                handleCellChange(rowIndex, colIndex, currentValue + value);
            }
            console.log(value)
            
        }
    };

    const handleAddRow = () => {
        const newRow = Array(16).fill('');
        setTableData(prevTableData => [...prevTableData, newRow]);
    };

    const VirtualKeyboard = () => {
        const keyboardElements = [
            "सा.", "रे.", "ग.", "म.", "प.", "ध.", "नि.", "सा*",
            "सा", "रे", "ग", "म", "प", "ध", "नि","सा*",
            "रे*", "ग*", "म*", "प*", "ध*", "नि*","-", "Backspace"
        ];

        return (
            <div>
                {keyboardElements.map((element, index) => (
                    <button key={index} onClick={() => handleKeyboardInput(element)}>
                        {element}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                    {Array.from({ length: 16 }, (_, index) => (
                            <td key={index} style={{ border: '2px solid black', fontWeight: '800' }}>
                                {index + 1}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        {bol.map((bolItem, index) => (
                            <td contentEditable={false} style={{ border: '2px solid black', fontWeight: '800' }} key={index}>{bolItem}</td>
                        ))}
                    </tr>
                    
                </thead>
                <tbody>

                    {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td className={
                                    editCell?'active-cell':''
                                }
                                    key={colIndex}
                                    onClick={() => {
                                        handleCellClick(rowIndex, colIndex);
                                        editCell=true
                                        }
                                        
                                        }
                                    style={{ fontWeight: selectedCell && selectedCell.rowIndex === rowIndex && selectedCell.colIndex === colIndex ? 'bold' : 'normal' }}
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleAddRow}>Add Row</button>
            <VirtualKeyboard />
        </div>
    );
};

const TeenTaal = ()=>{
    let bol = ['Dha', 'Dhin', 'Dhin', 'Dha', 'Dha', 'Dhin', 'Dhin', 'Dha', 'Dha', 'Tin', 'Tin', 'Ta', 'Ta', 'Dhin', 'Dhin', 'Dha'];
    <Table noOfCols={16} bol={bol}/>
}

const Jhaptaal = () => {
    let bol = ['Dhi', 'Na', 'Dhi', 'Dhi', 'Na', 'Ti', 'Na', 'Dhi', 'Dhi', 'Na']
    return <Table noOfCols={10} bol={bol} han />;
};
const Tables = {TeenTaal, Jhaptaal}

export default Table;
