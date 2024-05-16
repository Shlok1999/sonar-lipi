import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Dashboard.css';

const taals = ['Tintaal', 'Dadra', 'Jhaptaal', 'Kaherwa', 'Rupak'];

function Dashboard() {
    const generateUniqueFilename = () => {
        const date = new Date();
        const dateString = date.toISOString().replace(/[:\-T]/g, '').slice(0, 15);
        return `untitled_${dateString}`;
    };
    
    const savedFiles = Object.keys(localStorage);

    return (
        <section className='dashboard-section'>
            <div className="dashboard-container">
                <div className="new-doc-section">
                    <div className="new-doc-container">
                        {taals.map((taal, index) => (
                            <Link key={index} to={`/taal-table/${taal}/${generateUniqueFilename()}`}>
                                <div className="card new-file">
                                    <div className="new-file" />
                                    <p>{taal}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="my-dashboard">
                    {savedFiles.map((filename) => {
                        const data = JSON.parse(localStorage.getItem(filename));
                        return (
                            <Link key={filename} to={`/taal-table/${data.taal}/${filename}`}>
                                <div className="card saved-file">
                                    <div className="saved-file" />
                                    <p>{data.heading}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
