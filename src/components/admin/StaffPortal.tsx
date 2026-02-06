import React, { useState } from 'react';
import type { StaffProfile } from '../../types/booking';
import { INITIAL_APPOINTMENTS, TREATMENTS } from '../../data/mockData';
import { toast } from 'sonner';

interface StaffPortalProps {
    staff: StaffProfile;
    onLogout: () => void;
}

const StaffPortal: React.FC<StaffPortalProps> = ({ staff, onLogout }) => {
    const [view, setView] = useState<'diary' | 'performance' | 'stock'>('diary');
    const [selectedDate, setSelectedDate] = useState<string>('2026-02-23'); // Default to the demo week monday
    const [tips, setTips] = useState(0);

    React.useEffect(() => {
        const updateTips = () => {
            // Read from localStorage directly for sync
            const data = localStorage.getItem('salon_transactions');
            if (data) {
                const txns = JSON.parse(data);
                // Sum tips for this staff member
                const myTips = txns
                    .filter((t: any) => t.staffId === staff.id)
                    .reduce((acc: number, curr: any) => acc + (curr.tip || 0), 0);
                setTips(myTips);
            }
        };

        // Initial load
        updateTips();

        // Listen for updates
        window.addEventListener('transaction-updated', updateTips);
        return () => window.removeEventListener('transaction-updated', updateTips);
    }, [staff.id]);

    // Filter appointments for this staff member and SORT by time for the SELECTED DATE
    const myAppointments = INITIAL_APPOINTMENTS
        .filter(app => app.staffId === staff.id && app.date === selectedDate)
        .sort((a, b) => a.time.localeCompare(b.time));

    return (
        <div className="staff-portal">
            <div className="portal-header" style={{ borderLeftColor: staff.color || '#fff' }}>
                <div className="header-info">
                    <img src={staff.photo} alt={staff.name} className="staff-avatar-lg" />
                    <div>
                        <h1>Welcome, {staff.name.split(' ')[0]}</h1>
                        <p className="subtitle">{staff.role} • <span className="status-online">Shift Active</span></p>
                    </div>
                </div>
                <div className="header-actions">
                    <div className="stat-pill">
                        <span className="label">Today's Tips</span>
                        <span className="value">£{tips.toFixed(2)}</span>
                    </div>
                    <button className="btn-logout" onClick={onLogout}>Sign Out</button>
                </div>
            </div>

            <div className="staff-nav">
                <button className={view === 'diary' ? 'active' : ''} onClick={() => setView('diary')}>
                    📅 My Diary
                </button>
                <button className={view === 'performance' ? 'active' : ''} onClick={() => setView('performance')}>
                    📈 Performance
                </button>
                <button className={view === 'stock' ? 'active' : ''} onClick={() => setView('stock')}>
                    ⚠️ Report Wastage
                </button>
            </div>

            <div className="staff-content">
                {view === 'diary' && (
                    <div className="fade-in">
                        <div className="diary-timeline">
                            <div className="flex-between mb-4">
                                <h3>Daily Schedule</h3>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="bg-transparent border border-white/20 rounded px-2 py-1 text-white text-sm"
                                />
                            </div>
                            {myAppointments.length === 0 ? (
                                <p className="empty-state">No appointments scheduled for today.</p>
                            ) : (
                                myAppointments.map(app => (
                                    <div
                                        key={app.id}
                                        className={`diary-card ${app.status}`}
                                        style={{ borderLeftColor: staff.color }}
                                    >
                                        <div className="time-col">
                                            <span className="time">{app.time}</span>
                                            {(() => {
                                                const treatment = TREATMENTS.find(t => t.id === app.treatmentId);
                                                return <span className="duration">{treatment ? `${treatment.duration}m` : '60m'}</span>;
                                            })()}
                                        </div>
                                        <div className="details-col">
                                            <h4>{app.clientName}</h4>
                                            <p>{app.treatmentId}</p>
                                        </div>
                                        <div className="action-col">
                                            {app.status === 'confirmed' && (
                                                <button
                                                    className="btn-checkin"
                                                    onClick={() => toast.success(`Checked in ${app.clientName}`, { icon: '✅' })}
                                                >
                                                    Check In
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {view === 'stock' && (
                    <div className="fade-in report-form">
                        <h3>Report Stock Issue / Wastage</h3>
                        <p className="hint">"I spilled the Olaplex..." - It happens! Let us know so we can reorder.</p>

                        <div className="form-group">
                            <label>Product / Item</label>
                            <select>
                                <option>Select item...</option>
                                <option>Olaplex No.1</option>
                                <option>Loreal Developer 20vol</option>
                                <option>Cotton Pads (Pack)</option>
                                <option>Botox Vial</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Reason</label>
                            <div className="radio-group">
                                <label><input type="radio" name="reason" /> Spillage/Breakage</label>
                                <label><input type="radio" name="reason" /> Empty/Used Up</label>
                                <label><input type="radio" name="reason" /> Damaged on Arrival</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Notes</label>
                            <textarea placeholder="Any additional details..."></textarea>
                        </div>

                        <button
                            className="btn-submit"
                            onClick={() => toast.error('Stock issue reported', { description: 'Manager has been notified.' })}
                        >
                            Submit Report
                        </button>
                    </div>
                )}

                {view === 'performance' && (
                    <div className="fade-in performance-dashboard">
                        <div className="kpi-card">
                            <h4>Commission (MTD)</h4>
                            <div className="value">£1,250</div>
                        </div>
                        <div className="kpi-card">
                            <h4>Retail Sales</h4>
                            <div className="value">£420</div>
                        </div>
                        <div className="kpi-card">
                            <h4>Client Retention</h4>
                            <div className="value">85%</div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .staff-portal {
                    color: white;
                }
                .portal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(255,255,255,0.05);
                    padding: 1.5rem;
                    border-radius: 12px;
                    border-left: 6px solid;
                    margin-bottom: 2rem;
                }
                .header-info { display: flex; gap: 1rem; align-items: center; }
                .staff-avatar-lg { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; }
                .portal-header h1 { margin: 0; font-size: 1.5rem; }
                .subtitle { color: rgba(255,255,255,0.6); margin: 0; }
                .status-online { color: #4ade80; font-size: 0.8rem; text-transform: uppercase; font-weight: bold; }

                .header-actions { display: flex; gap: 1rem; align-items: center; }
                .stat-pill { 
                    background: rgba(0,0,0,0.3); padding: 0.5rem 1rem; border-radius: 20px; 
                    display: flex; flex-direction: column; align-items: flex-end;
                }
                .stat-pill .label { font-size: 0.7rem; color: #aaa; }
                .stat-pill .value { font-weight: bold; color: var(--color-accent); }
                .btn-logout { background: none; border: 1px solid rgba(255,255,255,0.2); color: white; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; }

                .staff-nav { display: flex; gap: 1rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
                .staff-nav button {
                    background: none; border: none; padding: 1rem; color: rgba(255,255,255,0.5); cursor: pointer; font-size: 1rem;
                    border-bottom: 2px solid transparent;
                }
                .staff-nav button.active { color: white; border-bottom-color: var(--color-accent); }

                .diary-timeline { display: flex; flex-direction: column; gap: 1rem; }
                .diary-card {
                    display: flex; align-items: center; gap: 1.5rem;
                    background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 8px;
                    border-left: 4px solid #666;
                }
                .diary-card.confirmed { border-left-color: #4ade80; }
                .time-col { display: flex; flex-direction: column; text-align: center; min-width: 60px; }
                .time { font-weight: bold; font-size: 1.1rem; }
                .duration { font-size: 0.8rem; color: #888; }
                .details-col { flex: 1; }
                .details-col h4 { margin: 0; font-size: 1rem; }
                .btn-checkin { background: #4ade80; color: black; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-weight: bold; }

                .report-form { max-width: 500px; }
                .form-group { margin-bottom: 1.5rem; }
                .form-group label { display: block; margin-bottom: 0.5rem; color: #ccc; }
                .form-group select, .form-group textarea { width: 100%; padding: 0.8rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 6px; }
                .radio-group { display: flex; gap: 1rem; }
                .btn-submit { background: var(--color-accent); color: black; border: none; padding: 1rem 2rem; border-radius: 6px; cursor: pointer; font-weight: bold; }

                .performance-dashboard { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
                .kpi-card { background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 8px; text-align: center; }
                .kpi-card .value { font-size: 2rem; font-weight: bold; color: white; margin-top: 0.5rem; }
            `}</style>
        </div>
    );
};

export default StaffPortal;
