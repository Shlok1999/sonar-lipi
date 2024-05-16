import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import '../Styles/TaalTable.css';

function TaalTable({ noOfCols, bol = [], initialData = [], title }) {
    const [description, setDescription] = useState("");
    const { filename } = useParams()
    console.log(filename)
    console.log(title)
    const [table, setTable] = useState(() => {
        // Retrieve table data from localStorage based on the file's title
        const savedTable = localStorage.getItem(`tableData_${filename}`);
        return savedTable ? JSON.parse(savedTable) : (initialData.length > 0 ? initialData : [Array(noOfCols).fill('')]);
    });
    const [selectedCell, setSelectedCell] = useState(null);

    useEffect(() => {
        // Save table data to localStorage based on the file's title whenever it changes
        localStorage.setItem(`tableData_${filename}`, JSON.stringify(table));
    }, [table, filename]);

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

    const handleKeyboardInput = (value) => {
        if (selectedCell !== null) {
            const { rowIndex, colIndex } = selectedCell;
            const currentValue = table[rowIndex][colIndex];
            if (value === 'Backspace') {
                handleCellChange(rowIndex, colIndex, currentValue.slice(0, -1));
            } else {
                handleCellChange(rowIndex, colIndex, currentValue + value);
            }
        }
    };

    const VirtualKeyboard = () => {
        const keyboardElements = [
            "सा.", "रे.", "ग.", "म.", "प.", "ध.", "नि.", "सा*",
            "सा", "रे", "ग", "म", "प", "ध", "नि", "सा*",
            "रे*", "ग*", "म*", "प*", "ध*", "नि*", "-", "Backspace"
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

    const handleDownloadPDF = () => {
        const tableElement = document.querySelector('.table');

    // Use html2canvas to capture the table as an image
    html2canvas(tableElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        
        // Initialize jsPDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        // Add the image of the table to the PDF
        pdf.addImage(imgData, 'PNG', 0, 0);
        
        // Download the PDF
        pdf.save(`${filename}.pdf`);
    });
};

return (
    <div className='taal-table-component'>
        <div>{filename}</div>
        <div>{description}</div>
        <table className='table'>
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
        <button className='add-row' onClick={handleAddRow}>Add Row</button>
        <button onClick={handleDownloadPDF}>Download as PDF</button>

        <VirtualKeyboard />
    </div>
);
}

export default TaalTable;
