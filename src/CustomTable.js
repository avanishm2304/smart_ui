import React from 'react';
import './CustomTable.css';

function CustomTable({ data = [], checkedRows = [], onRowCheck = () => {}, onOpenModal = () => {}, showDetailsButton = true }) {
  if (data.length === 0) {
    return <div className="table-message">Loading data or no items to display...</div>;
  }

  return (
    <div className="table-scroll-wrapper">
      <table className="modern-table">
        <thead>
          <tr>
            <th className="table-header">id</th>
            <th className="table-header">Client ID</th>
            <th className="table-header">Portfolio number</th>
            <th className="table-header">Portfolio type</th>
            <th className="table-header">Instrument ISIN</th>
            <th className="table-header">Instrument Name</th>
            <th className="table-header">asset class</th>
            <th className="table-header">asset type</th>
            <th className="table-header">Sector Exposure </th>
            <th className="table-header">Asset Amount</th>
            <th className="table-header">Is net</th>
            <th className="table-header">summary</th>
            {/* --- NEW: Conditionally render the Details header --- */}
            {showDetailsButton && <th className="table-header">Details</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="table-row">
              <td className="table-cell text-secondary">{row.id}</td>
              <td className="table-cell text-secondary">{row.client_id}</td>
              <td className="table-cell text-secondary">{row.portfolio_number}</td>
              <td className="table-cell">{row.portfolio_type}</td>
              <td className="table-cell">{row.instrument_isin}</td>
              <td className="table-cell text-primary-strong">{row.instrument_name}</td>
              <td className="table-cell">
                <span className={`badge badge-${String(row.asset_class).replace(/\s/g, '').toLowerCase()}`}>
                  {row.asset_class}
                </span>
              </td>
              <td className="table-cell">{row.asset_type}</td>
              <td className="table-cell">{row.sector_exposure}</td>
              <td className="table-cell text-primary-strong">{row.asset_amount}</td>
              <td className="table-cell">
                <input type="checkbox" className="styled-checkbox" checked={row.is_net === 'Yes'} readOnly />
              </td>
              <td className="table-cell text-secondary">{row.summary}</td>
              {/* --- NEW: Conditionally render the Details button cell --- */}
              {showDetailsButton && (
                <td className="table-cell">
                  <button className="details-button" onClick={() => onOpenModal(row.client_id)}>
                    View
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomTable;