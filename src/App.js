import './App.css';
import logo from './logo.svg'; // <-- NEW: Import your logo
import CustomTable from './CustomTable';
import ClientDetailsModal from './ClientDetailsModal';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [checkedRows, setCheckedRows] = useState([]);
  const [modalClientId, setModalClientId] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const handleCheck = (id) => {
    setCheckedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleOpenModal = (clientId) => {
    setModalClientId(clientId);
  };

  const handleCloseModal = () => {
    setModalClientId(null);
  };

  return (
    // --- NEW: A main layout container ---
    <div className="app-layout">
      {/* --- NEW: The top red section --- */}
      <header className="top-section">
        <img src={logo} className="app-logo" alt="Smart Stacks Logo" />
        <h1 className="welcome-message">Welcome to Smart Stacks</h1>
      </header>
      
      {/* --- NEW: The bottom white section containing the table card --- */}
      <main className="bottom-section">
        <div className="table-card">
          <div className="card-header">
            <div className="card-title-container">
              <h2 className="card-title">Portfolio Dashboard</h2>
              <span className="title-badge">Live Data</span>
            </div>
          </div>

          <CustomTable
            data={data}
            checkedRows={checkedRows}
            onRowCheck={handleCheck}
            onOpenModal={handleOpenModal}
          />
        </div>
      </main>

      {/* The modal logic is kept at the top level to overlay everything correctly */}
      {modalClientId && (
        <ClientDetailsModal
          clientId={modalClientId}
          allData={data}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;