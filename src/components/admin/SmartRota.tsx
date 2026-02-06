import React from 'react';
import { INITIAL_APPOINTMENTS } from '../../data/mockData';
// Removed direct import of STAFF_PROFILES to allow dynamic props
// import { STAFF_PROFILES } from '../../data/staff-profiles';

interface SmartRotaProps {
    staff?: any[]; // Allow passing dynamic staff list
}

const SmartRota: React.FC<SmartRotaProps> = ({ staff = [] }) => {
    // Generate time slots (9:00 to 18:00)
    const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

    // Filter out some staff for the view to keep it clean, or use all
    const staffView = staff.length > 0 ? staff : [];

    const getAppointmentForSlot = (staffId: string, time: string) => {
        return INITIAL_APPOINTMENTS.find(app => app.staffId === staffId && app.time === time);
    };

    return (
        <div className="smart-rota">
            <div className="rota-header">
                <h3>Global Staff Rota</h3>
                <div className="rota-controls">
                    <button className="btn-sm active">Day View</button>
                    <button className="btn-sm">Week View</button>
                    <span className="rota-date">Feb 10, 2026</span>
                </div>
            </div>

            <div className="rota-grid-container">
                {/* Header Row: Hours */}
                <div className="rota-row header">
                    <div className="rota-cell staff-col">Staff</div>
                    {hours.map(hour => (
                        <div key={hour} className="rota-cell time-col">{hour}</div>
                    ))}
                </div>

                {/* Staff Rows */}
                {staffView.map((staff: any) => (
                    <div key={staff.id} className="rota-row">
                        <div className="rota-cell staff-col" style={{ borderLeft: `3px solid ${staff.color || 'transparent'}` }}>
                            <div className="staff-info">
                                <img
                                    src={staff.photo || staff.avatar}
                                    alt={staff.name}
                                    className="rota-avatar"
                                    style={{ borderColor: staff.color || '#444' }}
                                />
                                <div>
                                    <span className="staff-name">{staff.name.split(' ')[0]}</span>
                                    <span className="staff-role">{staff.role.split(' ')[0]}</span>
                                </div>
                            </div>
                        </div>

                        {hours.map(hour => {
                            const apt = getAppointmentForSlot(staff.id, hour);
                            // Check working hours logic
                            const isWorking = true;

                            return (
                                <div key={`${staff.id}-${hour}`} className={`rota-cell time-slot ${isWorking ? 'slot-working' : 'slot-off'}`}>
                                    {apt ? (
                                        <div
                                            className={`appointment-block ${apt.status}`}
                                            title={`${apt.clientName} - ${apt.treatmentId}`}
                                            style={{
                                                borderLeftColor: staff.color || '#34d399',
                                                background: staff.color ? `${staff.color}20` : undefined // 20% opacity
                                            }}
                                        >
                                            <span className="client-name" style={{ color: staff.color || 'white' }}>{apt.clientName.split(' ')[0]}</span>
                                            <small className="svc-id" style={{ color: staff.color ? `${staff.color}cc` : undefined }}>{apt.treatmentId}</small>
                                        </div>
                                    ) : (
                                        <div className="empty-slot" title="Available"></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <div className="rota-legend">
                <div className="legend-item"><span className="dot confirmed"></span> Confirmed</div>
                <div className="legend-item"><span className="dot pending"></span> Pending</div>
                <div className="legend-item"><span className="dot blocked"></span> Blocked/Break</div>
            </div>

            <style>{`
                .smart-rota {
                    background: #111; /* Force dark background */
                    border: 1px solid #333;
                    border-radius: 12px;
                    padding: 1.5rem;
                }
                .rota-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }
                .rota-controls {
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }
                .rota-date {
                    margin-left: 1rem;
                    color: white;
                    font-weight: 500;
                }

                /* Grid Layout */
                .rota-grid-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1px;
                    overflow-x: auto;
                    padding-bottom: 1rem;
                    background: #222; /* Grid lines color */
                    border-radius: 4px;
                }
                .rota-row {
                    display: grid;
                    grid-template-columns: 150px repeat(10, minmax(80px, 1fr));
                    gap: 1px;
                    background: #111;
                }
                .rota-cell {
                    background: #0f0f0f;
                    padding: 0.5rem;
                    min-height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                .rota-row.header .rota-cell {
                    background: #1a1a1a;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.8rem;
                    font-weight: 600;
                    min-height: 40px;
                }
                
                /* Staff Column */
                .staff-col {
                    justify-content: flex-start;
                    background: #1a1a1a; /* Slight contrast for names */
                    position: sticky;
                    left: 0;
                    z-index: 10;
                }
                .staff-info {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .rota-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 1px solid #444;
                }
                .staff-name {
                    display: block;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: white;
                }
                .staff-role {
                    display: block;
                    font-size: 0.7rem;
                    color: #888;
                }

                /* Time Slots & Appointments */
                .time-slot {
                    position: relative;
                }
                .time-slot:hover { background: #1f1f1f; }
                .slot-off { background: repeating-linear-gradient(45deg, #111, #111 10px, #222 10px, #222 20px); opacity: 0.5; }

                .appointment-block {
                    position: absolute;
                    top: 2px;
                    bottom: 2px;
                    left: 2px;
                    right: 2px;
                    border-radius: 4px;
                    padding: 6px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    overflow: hidden;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }
                
                .appointment-block.confirmed {
                    background: #064e3b; /* Dark Green bg */
                    border-left: 3px solid #34d399; /* Bright Green accent */
                }
                .appointment-block.confirmed .client-name { color: white; }
                .appointment-block.confirmed .svc-id { color: #a7f3d0; }
                
                .appointment-block.pending {
                    background: #78350f; /* Dark Amber bg */
                    border-left: 3px solid #fbbf24; /* Bright Amber accent */
                }
                 .appointment-block.pending .client-name { color: white; }
                 .appointment-block.pending .svc-id { color: #fde68a; }

                .appointment-block.checked-in {
                    background: #1e3a8a; /* Dark Blue */
                    border-left: 3px solid #60a5fa; /* Blue */
                    animation: pulse-border 2s infinite;
                }
                .appointment-block.checked-in .client-name { color: white; }
                .appointment-block.checked-in .svc-id { color: #bfdbfe; }

                .appointment-block.break {
                    background: repeating-linear-gradient(
                        45deg,
                        #333,
                        #333 10px,
                        #2a2a2a 10px,
                        #2a2a2a 20px
                    );
                    border-left: 3px solid #666;
                    opacity: 0.8;
                }
                .appointment-block.break .client-name { color: #aaa; font-style: italic; }
                .appointment-block.break .svc-id { display: none; }

                @keyframes pulse-border {
                    0% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.4); }
                    70% { box-shadow: 0 0 0 4px rgba(96, 165, 250, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0); }
                }

                .client-name {
                    font-size: 0.8rem;
                    font-weight: 700;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .svc-id {
                    font-size: 0.7rem;
                    opacity: 0.9;
                }

                .empty-slot {
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                }

                /* Legend */
                .rota-legend {
                    display: flex;
                    gap: 1.5rem;
                    margin-top: 1rem;
                    padding-top: 1rem;
                    border-top: 1px solid #333;
                    font-size: 0.8rem;
                    color: #888;
                }
                .legend-item { display: flex; align-items: center; gap: 0.5rem; }
                .dot { width: 8px; height: 8px; border-radius: 50%; }
                .dot.confirmed { background: #34d399; }
                .dot.pending { background: #fbbf24; }
                .dot.blocked { background: #ef4444; }

                .btn-sm {
                    padding: 0.4rem 0.8rem;
                    background: #222;
                    border: 1px solid #444;
                    color: #ccc;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    cursor: pointer;
                }
                .btn-sm.active {
                    background: var(--color-accent);
                    color: black;
                    border-color: var(--color-accent);
                    font-weight: 600;
                }
            `}</style>
        </div>
    );
};

export default SmartRota;
