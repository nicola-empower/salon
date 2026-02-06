import React from 'react';
import { INVENTORY } from '../../data/mockData';

const InventoryPanel = () => {
    return (
        <div className="inventory-panel">
            <div className="panel-header">
                <h3>Inventory & Supplies</h3>
                <button className="btn-sm">Generate PO</button>
            </div>

            <div className="table-responsive">
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Last Ordered</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {INVENTORY.map(item => (
                            <tr key={item.id} className={item.status === 'low' || item.status === 'critical' ? 'row-warning' : ''}>
                                <td className="font-medium">{item.name}</td>
                                <td><span className="badge">{item.category}</span></td>
                                <td>
                                    {item.stockLevel} <span className="unit">{item.unit}</span>
                                </td>
                                <td>
                                    <span className={`status-pill ${item.status}`}>
                                        {item.status.toUpperCase()}
                                    </span>
                                </td>
                                <td>{item.lastOrdered}</td>
                                <td>
                                    <button className="btn-icon" title="Reorder">
                                        ↻
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                .inventory-panel {
                    margin-top: 2rem;
                }
                .panel-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                .table-responsive {
                    overflow-x: auto;
                    background: var(--color-surface);
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .inventory-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 0.9rem;
                }
                .inventory-table th, .inventory-table td {
                    padding: 1rem;
                    text-align: left;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                .inventory-table th {
                    color: rgba(255, 255, 255, 0.5);
                    font-weight: 500;
                    text-transform: uppercase;
                    font-size: 0.75rem;
                    letter-spacing: 1px;
                }
                .font-medium { font-weight: 500; color: white; }
                .unit { color: rgba(255, 255, 255, 0.4); font-size: 0.8rem; }
                
                .badge {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                }

                .status-pill {
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }
                .status-pill.ok { background: rgba(74, 222, 128, 0.1); color: #4ade80; }
                .status-pill.low { background: rgba(250, 204, 21, 0.1); color: #facc15; }
                .status-pill.critical { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

                .row-warning { background: rgba(250, 204, 21, 0.02); }
                
                .btn-icon {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    opacity: 0.5;
                    font-size: 1.2rem;
                }
                .btn-icon:hover { opacity: 1; color: var(--color-accent); }
            `}</style>
        </div>
    );
};

export default InventoryPanel;
