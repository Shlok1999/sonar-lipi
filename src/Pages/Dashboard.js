import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Dashboard.css';

const taals = ['Tintaal', 'Dadra', 'Jhaptaal', 'Kaherwa', 'Rupak', 'Adha'];

function Dashboard() {
    const [newFileDetails, setNewFileDetails] = useState({ title: '', description: '', taal: '' });
    const [files, setFiles] = useState([]);
    const [modal, setModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false); // No loading needed for local state

    // Load files from localStorage on component mount
    useEffect(() => {
        const savedFiles = localStorage.getItem('compositionFiles');
        if (savedFiles) {
            setFiles(JSON.parse(savedFiles));
        }
    }, []);

    const handleCreateNewFile = (taal) => {
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const uniqueId = `file_${timestamp}`;
        setModal(true);
        setNewFileDetails({ ...newFileDetails, taal, title: uniqueId });
    };

    const handleSubmitNewFile = () => {
        if (newFileDetails.taal && newFileDetails.title) {
            const existingFile = files.find(file => file.title === newFileDetails.title);
            if (existingFile) {
                alert('File already exists');
            } else {
                const newFile = {
                    ...newFileDetails,
                    id: Date.now().toString(), // Simple unique ID
                    createdAt: new Date().toISOString()
                };
                
                const updatedFiles = [...files, newFile];
                setFiles(updatedFiles);
                localStorage.setItem('compositionFiles', JSON.stringify(updatedFiles));
                
                window.location.href = `/taal-table/${newFileDetails.taal}/${newFileDetails.title}`;
            }
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredFiles = files.filter(file =>
        file.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className='dashboard-section'>
            <div className="dashboard-container">
                <div className="new-doc-section">
                    <h3>Create New Composition</h3>
                    <div className="new-doc-container">
                        {taals.map((taal, index) => (
                            <div key={index}>
                                <div className="card new-file">
                                    <div className="new-file-icon" onClick={() => handleCreateNewFile(taal)}>
                                        <h2>+</h2>
                                    </div>
                                </div>
                                <p>{taal}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="my-dashboard">
                    <div className="files-container">
                        <h3>Recent Files</h3>
                        <input
                            type="text"
                            placeholder="Search files"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="search-input"
                        />
                        {filteredFiles.map((file) => (
                            <Link to={`/taal-table/${file.taal}/${file.title}`} key={file.id}>
                                <div className="file-card">
                                    {file.thumbnail && (
                                        <img width={'300px'} height={'300px'} src={file.thumbnail} alt={file.title} className="file-thumbnail" />
                                    )}
                                    <p>{file.title}</p>
                                    <p>{file.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            {modal && (
                <div className="new-file-popup">
                    <h2>Create New File</h2>
                    <input
                        type="text"
                        value={newFileDetails.title}
                        onChange={(e) => setNewFileDetails({ ...newFileDetails, title: e.target.value })}
                        placeholder="Title"
                    />
                    <button onClick={handleSubmitNewFile}>Create</button>
                    <button onClick={() => setModal(false)}>Cancel</button>
                </div>
            )}
        </section>
    );
}

export default Dashboard;
