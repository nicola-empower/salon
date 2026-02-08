import React, { useState } from 'react';
import { toast } from 'sonner';

const MarketingHub = () => {
    const [activeTab, setActiveTab] = useState<'campaigns' | 'automations' | 'promotions'>('campaigns');

    // MOCK DATA
    const [campaigns, setCampaigns] = useState([
        { id: 'c1', name: 'Spring Glow Offer', type: 'Email', status: 'Sent', sent: 1250, opened: '45%', revenue: '£2,400' },
        { id: 'c2', name: 'Valentine\'s Duo', type: 'SMS', status: 'Scheduled', sent: 0, date: '2026-02-12', revenue: '--' },
        { id: 'c3', name: 'New Staff Intro', type: 'Email', status: 'Draft', sent: 0, revenue: '--' }
    ]);

    const [automations, setAutomations] = useState([
        { id: 'a1', name: 'Birthday Treat', trigger: 'Client Birthday', action: 'Send 10% Off Email', active: true },
        { id: 'a2', name: 'Re-booking Reminder', trigger: '6 Weeks Post-Appointment', action: 'Send SMS', active: true },
        { id: 'a3', name: 'No-Show Follow Up', trigger: 'Status = No Show', action: 'Charge Fee + Email', active: false },
        { id: 'a4', name: 'Review Request', trigger: '24h Post-Appointment', action: 'Send Google Review Link', active: true },
    ]);

    const [promotions, setPromotions] = useState([
        { id: 'p1', code: 'WELCOME20', type: 'Percentage', value: '20%', uses: 45, active: true },
        { id: 'p2', code: 'SUMMER5', type: 'Fixed', value: '£5.00', uses: 12, active: false },
    ]);

    const toggleAutomation = (id: string) => {
        setAutomations(prev => prev.map(a =>
            a.id === id ? { ...a, active: !a.active } : a
        ));
        toast.info('Automation updated');
    };

    const togglePromotion = (id: string) => {
        setPromotions(prev => prev.map(p =>
            p.id === id ? { ...p, active: !p.active } : p
        ));
    };

    return (
        <div className="marketing-hub fade-in">
            <div className="header-section">
                <h2>Marketing & Growth Hub</h2>
                <div className="tabs">
                    <button className={activeTab === 'campaigns' ? 'active' : ''} onClick={() => setActiveTab('campaigns')}>Campaigns</button>
                    <button className={activeTab === 'automations' ? 'active' : ''} onClick={() => setActiveTab('automations')}>Automations</button>
                    <button className={activeTab === 'promotions' ? 'active' : ''} onClick={() => setActiveTab('promotions')}>Promotions</button>
                </div>
            </div>

            <div className="content-panel">
                {activeTab === 'campaigns' && (
                    <div className="fade-in">
                        <div className="flex-between mb-4">
                            <h3>Active Campaigns</h3>
                            <button className="btn-primary">+ New Campaign</button>
                        </div>
                        <div className="card-list">
                            {campaigns.map(c => (
                                <div key={c.id} className="marketing-card">
                                    <div className="flex-between">
                                        <div className="flex gap-3 items-center">
                                            <span className={`icon-box ${c.type.toLowerCase()}`}>
                                                {c.type === 'Email' ? '✉️' : '📱'}
                                            </span>
                                            <div>
                                                <div className="font-bold">{c.name}</div>
                                                <div className="text-xs text-muted">{c.type} • {c.status}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-mono text-accent">{c.revenue}</div>
                                            <div className="text-xs text-muted">{c.status === 'Sent' ? `Open Rate: ${c.opened}` : c.date || 'Draft'}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'automations' && (
                    <div className="fade-in">
                        <div className="flex-between mb-4">
                            <h3>Client Journey Automations</h3>
                            {/* <button className="btn-outline">View Flow</button> */}
                        </div>
                        <div className="grid-2">
                            {automations.map(a => (
                                <div key={a.id} className={`automation-card ${a.active ? 'active' : 'inactive'}`}>
                                    <div className="flex-between mb-2">
                                        <div className="font-bold">{a.name}</div>
                                        <label className="switch">
                                            <input type="checkbox" checked={a.active} onChange={() => toggleAutomation(a.id)} />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="text-sm text-muted">
                                        <div><strong>Trigger:</strong> {a.trigger}</div>
                                        <div><strong>Action:</strong> {a.action}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'promotions' && (
                    <div className="fade-in">
                        <div className="flex-between mb-4">
                            <h3>Discount Codes</h3>
                            <button className="btn-primary">+ Create Code</button>
                        </div>
                        <div className="table-responsive">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-muted text-sm border-b border-white/10">
                                        <th className="pb-2">Code</th>
                                        <th className="pb-2">Value</th>
                                        <th className="pb-2">Uses</th>
                                        <th className="pb-2">Status</th>
                                        <th className="pb-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {promotions.map(p => (
                                        <tr key={p.id} className="border-b border-white/5">
                                            <td className="py-3 font-mono font-bold text-accent">{p.code}</td>
                                            <td className="py-3">{p.value}</td>
                                            <td className="py-3">{p.uses}</td>
                                            <td className="py-3">
                                                <span className={`status-pill ${p.active ? 'active' : 'inactive'}`}>
                                                    {p.active ? 'Active' : 'Expired'}
                                                </span>
                                            </td>
                                            <td className="py-3">
                                                <button className="btn-text" onClick={() => togglePromotion(p.id)}>
                                                    {p.active ? 'Disable' : 'Enable'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .header-section {
                    margin-bottom: 2rem;
                }
                .tabs {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }
                .tabs button {
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.6);
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                    border-bottom: 2px solid transparent;
                    transition: all 0.2s;
                }
                .tabs button:hover { color: white; }
                .tabs button.active {
                    color: var(--color-accent);
                    border-bottom-color: var(--color-accent);
                }

                .marketing-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    padding: 1rem;
                    border-radius: 8px;
                    margin-bottom: 0.5rem;
                }
                .icon-box {
                    width: 40px;
                    height: 40px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                }
                .icon-box.email { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }
                .icon-box.sms { background: rgba(16, 185, 129, 0.2); color: #34d399; }

                .automation-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    padding: 1.5rem;
                    border-radius: 12px;
                    transition: all 0.2s;
                }
                .automation-card.active {
                    border-color: rgba(74, 222, 128, 0.3);
                    background: rgba(74, 222, 128, 0.05);
                }
                
                /* Toggle Switch */
                .switch {
                    position: relative;
                    display: inline-block;
                    width: 40px;
                    height: 24px;
                }
                .switch input { opacity: 0; width: 0; height: 0; }
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background-color: #333;
                    transition: .4s;
                    border-radius: 24px;
                }
                .slider:before {
                    position: absolute;
                    content: "";
                    height: 18px;
                    width: 18px;
                    left: 3px;
                    bottom: 3px;
                    background-color: white;
                    transition: .4s;
                    border-radius: 50%;
                }
                input:checked + .slider { background-color: var(--color-accent); }
                input:checked + .slider:before { transform: translateX(16px); }

                .status-pill {
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 600;
                }
                .status-pill.active { background: rgba(74, 222, 128, 0.1); color: #4ade80; }
                .status-pill.inactive { background: rgba(148, 163, 184, 0.1); color: #94a3b8; }
            `}</style>
        </div>
    );
};

export default MarketingHub;
