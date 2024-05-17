import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Dashboard.css';

const taals = ['Tintaal', 'Dadra', 'Jhaptaal', 'Kaherwa', 'Rupak'];

function Dashboard() {
    const [newFileDetails, setNewFileDetails] = useState({ title: '', description: '', taal: '' });
    const [files, setFiles] = useState([]);

    useEffect(() => {
        // Fetch all files on component mount
        axios.get('http://localhost:5000/files')
            .then(response => {
                setFiles(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the files!', error);
            });
    }, []);

    const handleCreateNewFile = (taal) => {
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const uniqueId = `file_${timestamp}`;
        setNewFileDetails({ ...newFileDetails, taal, title: uniqueId });
    };

    const handleSubmitNewFile = () => {
        if (newFileDetails.taal && newFileDetails.title) {
            const existingFile = files.find(file => file.title === newFileDetails.title);
            if (existingFile) {
                alert('File already exists');
            } else {
                // Save new file details to the server
                axios.post('http://localhost:5000/files', newFileDetails)
                    .then(response => {
                        setFiles([...files, response.data]);
                        window.location.href = `/taal-table/${newFileDetails.taal}/${newFileDetails.title}`;
                    })
                    .catch(error => {
                        console.error('There was an error creating the file!', error);
                    });
            }
        }
    };

    return (
        <section className='dashboard-section'>
            <div className="dashboard-container">
                <div className="new-doc-section">
                <h3>Create New Composition</h3>
                    <div className="new-doc-container">
                        {taals.map((taal, index) => (
                            <div key={index} >
                                <div className="card new-file">
                                    <div className="new-file-icon" onClick={() => handleCreateNewFile(taal)}><h2>+</h2></div>
                                </div>
                                <p>{taal}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="my-dashboard">
                    <div className="files-container">
                    <h3>Recent Files</h3>
                        {files.map((file) => (
                            <>
                            <Link to={`/taal-table/${file.taal}/${file.title}`} key={file.id}>
                                <div className="file-card">
                                    <p>{file.title}</p>
                                    <p>{file.description}</p>
                                </div>
                            </Link>
                            </>
                        ))}
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
