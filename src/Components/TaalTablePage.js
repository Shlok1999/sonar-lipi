import React from 'react';
import { useParams } from 'react-router-dom';
import Taals from './Taals'; // Import the Taal components

function TaalTablePage() {
    const { taal, filename, title } = useParams();
    const TaalComponent = Taals[taal] || null;

    if (!TaalComponent) {
        return <div>Taal not found</div>;
    }

    return (
        <div className='taal-table'>
            <TaalComponent
                filename={filename}
                title={title}
            />
        </div>
    );
}

export default TaalTablePage;
