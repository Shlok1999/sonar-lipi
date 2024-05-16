import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Dashboard.css';

const taals = ['Tintaal', 'Dadra', 'Jhaptaal', 'Kaherwa', 'Rupak'];

function Dashboard() {
    const [newFileDetails, setNewFileDetails] = useState({ title: '', description: '', taal: '' });

    const handleCreateNewFile = (taal) => {
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const uniqueId = `file_${timestamp}`; // Generate unique identifier for the file
        setNewFileDetails({ ...newFileDetails, taal, title: uniqueId });
    };

    const handleSubmitNewFile = () => {
        if (newFileDetails.taal && newFileDetails.title) {
            // Save new file details to local storage with a unique key
            localStorage.setItem(newFileDetails.title, JSON.stringify(newFileDetails));
            window.location.href = `/taal-table/${newFileDetails.taal}/${newFileDetails.title}`;
        }
    };

    return (
        <section className='dashboard-section'>
            <div className="dashboard-container">
                <div className="new-doc-section">
                    <div className="new-doc-container">
                        {taals.map((taal, index) => (
                            <div key={index} onClick={() => handleCreateNewFile(taal)}>
                                <div className="card new-file">
                                    <div className="new-file-icon"></div>
                                    <p>{taal}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="my-dashboard">
                    <h2>My Dashboard</h2>
                    <div className="files-container">
                        {Object.keys(localStorage).map((key) => {
                            const file = JSON.parse(localStorage.getItem(key));
                            return (
                                <Link to={`/taal-table/${file.taal}/${file.title}`} key={file.title}>
                                    {/* Use unique title as the key for each file */}
                                    <div className="file-card">
                                        <h3>{file.title}</h3>
                                        <p>{file.description}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
            {newFileDetails.taal && (
                <div className="new-file-popup">
                    <h2>Create New File</h2>
                    <input
                        type="text"
                        value={newFileDetails.title}
                        onChange={(e) => setNewFileDetails({ ...newFileDetails, title: e.target.value })}
                        placeholder="Title"
                    />
                    <textarea
                        value={newFileDetails.description}
                        onChange={(e) => setNewFileDetails({ ...newFileDetails, description: e.target.value })}
                        placeholder="Description"
                    />
                    <button onClick={handleSubmitNewFile}>Create</button>
                </div>
            )}
        </section>
    );
}

export default Dashboard;
