// src/ClientDetailsModal.js

import React, { useMemo } from 'react';
import CustomTable from './CustomTable';
import PieChart from './PieChart'; // We will create this next
import './Modal.css'; // And this CSS file

function ClientDetailsModal({ clientId, allData, onClose }) {
  // Memoize filtering and data aggregation to avoid re-calculating on every render
  const { clientData, assetClassData, sectorData } = useMemo(() => {
    // 1. Filter data to get only the rows for the selected client
    const clientData = allData.filter(row => row.client_id === clientId);

    // 2. Aggregate data for the pie charts
    const assetClassAgg = {};
    const sectorAgg = {};

    for (const row of clientData) {
      // Aggregate by Asset Class
      if (row.asset_class) {
        assetClassAgg[row.asset_class] = (assetClassAgg[row.asset_class] || 0) + row.asset_amount;
      }
      // Aggregate by Sector
      if (row.sector_exposure) {
        sectorAgg[row.sector_exposure] = (sectorAgg[row.sector_exposure] || 0) + row.asset_amount;
      }
    }
    return { clientData, assetClassData: assetClassAgg, sectorData: sectorAgg };
  }, [clientId, allData]);

  return (
    // The modal overlay
    <div className="modal-overlay" onClick={onClose}>
      {/* The modal content box. Stop propagation to prevent closing when clicking inside */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>×</button>
        <h2 className="modal-title">Client Portfolio Details: {clientId}</h2>

        <div className="modal-section">
          <h3 className="modal-subtitle">Portfolio Distribution</h3>
          <div className="charts-container">
            <PieChart title="Asset Class" data={assetClassData} />
            <PieChart title="Sector Exposure" data={sectorData} />
          </div>
        </div>

        <div className="modal-section">
          <h3 className="modal-subtitle">Asset Holdings</h3>
          {/* Re-use CustomTable, but show only this client's data and hide the details button */}
          <CustomTable
            data={clientData}
            onRowCheck={() => {}} // Dummy function since we don't need checkbox logic here
            showDetailsButton={false}
          />
        </div>
      </div>
    </div>
  );
}

export default ClientDetailsModal;