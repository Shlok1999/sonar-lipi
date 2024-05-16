import React, { useState } from 'react';
import Keyboard from '../Components/Keyboard';
import { useParams } from 'react-router-dom';
import Taals from '../Components/Taals';

function Filepage() {
    
    const { taal } = useParams();
    const [rows, setRows] = useState([Array(16).fill('')])


    // Check if the taal exists in TaalComponents
    if (Taals.hasOwnProperty(taal)) {
        const Taal = Taals[taal];
        return (
            <div className='taal-table'>
                <Taal rows={rows}   />
            </div>
        );
    } else {
        return <div>Taal not found</div>;
    }
}

export default Filepage;
