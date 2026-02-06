import React, { useState } from 'react';
import AIOpsAssistant from './AIOpsAssistant';
import BusinessIntelligence from './BusinessIntelligence';
import InventoryPanel from './InventoryPanel';
import SmartRota from './SmartRota';
import { CLIENTS } from '../../data/mockData';

interface ManagerDashboardProps {
    staff?: any[];
    onAddStaff?: (staff: any) => void;
    onRemoveStaff?: (id: string) => void;
}

const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ staff = [], onAddStaff, onRemoveStaff }) => {
    const [view, setView] = useState<'overview' | 'rota' | 'crm' | 'team'>('overview');
    const [isAddingStaff, setIsAddingStaff] = useState(false);
    const [newStaff, setNewStaff] = useState({ name: '', role: '', color: '#000000' });

    const handleCreateStaff = () => {
        if (!newStaff.name || !newStaff.role) return;
        const id = `staff-${Date.now()}`;
        // Create a basic profile
        const profile = {
            id,
            ...newStaff,
            email: `${newStaff.name.toLowerCase().replace(' ', '.')}@thesalon.com`,
            photo: 'https://i.pravatar.cc/150?u=' + id, // Placeholder
            specialties: ['General'],
            categories: ['Hair'],
            workingHours: {}
        };
        onAddStaff?.(profile);
        setIsAddingStaff(false);
        setNewStaff({ name: '', role: '', color: '#000000' });
    };

    return (
        <div className="manager-dashboard">
            <div className="manager-nav">
                <button
                    className={view === 'overview' ? 'tab active' : 'tab'}
                    onClick={() => setView('overview')}
                >
                    Overview & Ops
                </button>
                <button
                    className={view === 'rota' ? 'tab active' : 'tab'}
                    onClick={() => setView('rota')}
                >
                    Smart Rota
                </button>
                <button
                    className={view === 'team' ? 'tab active' : 'tab'}
                    onClick={() => setView('team')}
                >
                    Team Management
                </button>
                <button
                    className={view === 'crm' ? 'tab active' : 'tab'}
                    onClick={() => setView('crm')}
                >
                    Client CRM
                </button>
            </div>

            <div className="content-area">
                {view === 'overview' && (
                    <div className="fade-in">
                        <AIOpsAssistant />
                        <BusinessIntelligence />
                        <InventoryPanel />
                    </div>
                )}
                {view === 'team' && (
                    <div className="fade-in">
                        <div className="flex-between mb-4">
                            <h3>Team Management</h3>
                            <button className="btn-primary" onClick={() => setIsAddingStaff(true)}>+ Add Staff</button>
                        </div>

                        {isAddingStaff && (
                            <div className="add-staff-form mb-4 p-4 border rounded bg-surface">
                                <h4>New Staff Member</h4>
                                <div className="grid-3 gap-2">
                                    <input
                                        type="text" placeholder="Name" className="input"
                                        value={newStaff.name} onChange={e => setNewStaff({ ...newStaff, name: e.target.value })}
                                    />
                                    <input
                                        type="text" placeholder="Role (e.g. Stylist)" className="input"
                                        value={newStaff.role} onChange={e => setNewStaff({ ...newStaff, role: e.target.value })}
                                    />
                                    <input
                                        type="color" className="input h-10 w-full cursor-pointer"
                                        value={newStaff.color} onChange={e => setNewStaff({ ...newStaff, color: e.target.value })}
                                    />
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <button className="btn-primary" onClick={handleCreateStaff}>Save</button>
                                    <button className="btn-outline" onClick={() => setIsAddingStaff(false)}>Cancel</button>
                                </div>
                            </div>
                        )}

                        <div className="grid-2">
                            {staff.map(s => (
                                <div key={s.id} className="staff-card p-3 border rounded flex justify-between items-center" style={{ borderColor: s.color }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                                            <img src={s.photo || s.avatar} alt={s.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <div className="font-bold">{s.name}</div>
                                            <div className="text-xs opacity-70">{s.role}</div>
                                            <div className="text-xs font-mono mt-1" style={{ color: '#4ade80' }}>
                                                {Math.floor(Math.random() * 30 + 70)}% Utilization
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="text-red-400 hover:text-red-300 text-sm"
                                        onClick={() => {
                                            if (confirm(`Remove ${s.name}?`)) onRemoveStaff?.(s.id);
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'crm' && (
                    <div className="fade-in">
                        <h3>Client Relationship Manager</h3>
                        <div className="crm-grid">
                            {CLIENTS.map(client => (
                                <div key={client.id} className="client-card">
                                    <div className="client-header">
                                        <img src={client.avatar} alt={client.name} className="avatar" />
                                        <div>
                                            <h4>{client.name}</h4>
                                            <span className={`tag ${client.type.toLowerCase()}`}>{client.type}</span>
                                        </div>
                                    </div>
                                    <div className="client-details">
                                        <p><strong>Spend:</strong> £{client.totalSpend}</p>
                                        <p><strong>Last Visit:</strong> {client.lastVisit}</p>
                                        {client.upcomingAppointment && (
                                            <p className="highlight">Next: {client.upcomingAppointment}</p>
                                        )}
                                    </div>
                                    <p className="notes">"{client.notes}"</p>
                                    <div className="actions">
                                        <button className="btn-text">View History</button>
                                        <button className="btn-text danger">Flag</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'rota' && (
                    <div className="fade-in">
                        <SmartRota staff={staff} />
                    </div>
                )}
            </div>

            <style>{`
                .manager-nav {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 2rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    padding-bottom: 1rem;
                }
                .tab {
                    background: none;
                    border: none;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 1rem;
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .tab:hover { color: white; }
                .tab.active {
                    color: var(--color-accent);
                    border-bottom: 2px solid var(--color-accent);
                }
                
                .crm-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                    margin-top: 1.5rem;
                }
                .client-card {
                    background: var(--color-surface);
                    padding: 1.5rem;
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .client-header {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                .client-header h4 { margin: 0; color: white; }
                .client-details {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.7);
                    margin-bottom: 1rem;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.5rem;
                }
                .notes {
                    font-style: italic;
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.85rem;
                    background: rgba(0,0,0,0.2);
                    padding: 0.75rem;
                    border-radius: 6px;
                }
                .tag {
                    font-size: 0.75rem;
                    padding: 2px 6px;
                    border-radius: 4px;
                    background: rgba(255, 255, 255, 0.1);
                }
                .tag.vip { background: rgba(212, 175, 55, 0.2); color: var(--color-accent); border: 1px solid var(--color-accent); }
                .tag.flagged { background: rgba(239, 68, 68, 0.2); color: #fca5a5; }

                .btn-text {
                    background: none;
                    border: none;
                    color: rgba(255, 255, 255, 0.6);
                    cursor: pointer;
                    font-size: 0.8rem;
                }
                .btn-text:hover { color: white; }
                .btn-text.danger:hover { color: #fca5a5; }
                .actions {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 1rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    padding-top: 0.75rem;
                }
            `}</style>
        </div>
    );
};

export default ManagerDashboard;
