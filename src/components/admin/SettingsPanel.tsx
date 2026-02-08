import React, { useState } from 'react';
import { toast } from 'sonner';

const SettingsPanel = () => {
    // MOCK SALON DATA
    const [settings, setSettings] = useState({
        salonName: 'The Salon',
        email: 'hello@thesalon.com',
        phone: '020 7123 4567',
        address: '123 High Street, London, W1 2AB',
        currency: 'GBP',
        taxRate: 20,
        bookingDeposit: 50, // percent
        cancellationPolicy: '24h',
        autoConfirm: true,
        allowWalkIns: true
    });

    const [hours, setHours] = useState([
        { day: 'Monday', open: '09:00', close: '18:00', closed: false },
        { day: 'Tuesday', open: '09:00', close: '18:00', closed: false },
        { day: 'Wednesday', open: '09:00', close: '20:00', closed: false },
        { day: 'Thursday', open: '09:00', close: '20:00', closed: false },
        { day: 'Friday', open: '09:00', close: '19:00', closed: false },
        { day: 'Saturday', open: '10:00', close: '17:00', closed: false },
        { day: 'Sunday', open: '11:00', close: '16:00', closed: true },
    ]);

    const handleChange = (field: string, value: any) => {
        setSettings({ ...settings, [field]: value });
    };

    const handleHourChange = (index: number, field: string, value: any) => {
        const newHours = [...hours];
        newHours[index] = { ...newHours[index], [field]: value };
        setHours(newHours);
    };

    const handleSave = () => {
        // Save to API simulation
        toast.success('Settings saved successfully');
    };

    return (
        <div className="settings-panel fade-in">
            <div className="flex-between mb-4">
                <h2>Global Settings</h2>
                <button className="btn-primary" onClick={handleSave}>Save Changes</button>
            </div>

            <div className="settings-grid">
                {/* General Info */}
                <div className="settings-card">
                    <h3>Salon Information</h3>
                    <div className="form-group">
                        <label>Business Name</label>
                        <input className="input" value={settings.salonName} onChange={e => handleChange('salonName', e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input className="input" value={settings.email} onChange={e => handleChange('email', e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input className="input" value={settings.phone} onChange={e => handleChange('phone', e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <textarea className="input" value={settings.address} onChange={e => handleChange('address', e.target.value)} rows={3} />
                    </div>
                </div>

                {/* Operating Hours */}
                <div className="settings-card">
                    <h3>Operating Hours</h3>
                    <div className="hours-list">
                        {hours.map((h, i) => (
                            <div key={h.day} className="flex-between py-2 border-b border-white/5 last:border-0">
                                <span className="w-24 font-medium">{h.day}</span>
                                <div className="flex gap-2 items-center">
                                    <label className="flex items-center gap-2 text-sm text-muted">
                                        <input
                                            type="checkbox"
                                            checked={h.closed}
                                            onChange={e => handleHourChange(i, 'closed', e.target.checked)}
                                        />
                                        Closed
                                    </label>
                                    {!h.closed && (
                                        <>
                                            <input
                                                type="time"
                                                className="input-sm"
                                                value={h.open}
                                                onChange={e => handleHourChange(i, 'open', e.target.value)}
                                            />
                                            <span>to</span>
                                            <input
                                                type="time"
                                                className="input-sm"
                                                value={h.close}
                                                onChange={e => handleHourChange(i, 'close', e.target.value)}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Booking Rules */}
                <div className="settings-card">
                    <h3>Booking Rules</h3>
                    <div className="flex-between py-3 border-b border-white/5">
                        <div>
                            <div className="font-medium">Deposit Required</div>
                            <div className="text-xs text-muted">Percentage of service cost</div>
                        </div>
                        <div className="flex items-center bg-black/30 rounded px-2">
                            <input
                                type="number"
                                className="bg-transparent border-none text-white w-12 text-sm text-right"
                                value={settings.bookingDeposit}
                                onChange={e => handleChange('bookingDeposit', parseInt(e.target.value))}
                            />
                            <span className="text-gray-500 text-sm">%</span>
                        </div>
                    </div>
                    <div className="flex-between py-3 border-b border-white/5">
                        <div>
                            <div className="font-medium">Cancellation Notice</div>
                            <div className="text-xs text-muted">Minimum hours before appointment</div>
                        </div>
                        <select
                            className="input-sm"
                            value={settings.cancellationPolicy}
                            onChange={e => handleChange('cancellationPolicy', e.target.value)}
                        >
                            <option value="12h">12 Hours</option>
                            <option value="24h">24 Hours</option>
                            <option value="48h">48 Hours</option>
                        </select>
                    </div>
                    <div className="flex-between py-3">
                        <div className="font-medium">Auto-Confirm Bookings</div>
                        <label className="switch">
                            <input type="checkbox" checked={settings.autoConfirm} onChange={e => handleChange('autoConfirm', e.target.checked)} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="flex-between py-3">
                        <div className="font-medium">Allow New Walk-ins</div>
                        <label className="switch">
                            <input type="checkbox" checked={settings.allowWalkIns} onChange={e => handleChange('allowWalkIns', e.target.checked)} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>

            <style>{`
                .settings-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 2rem;
                    padding-bottom: 2rem;
                }
                .settings-card {
                    background: var(--color-surface);
                    border: 1px solid rgba(255,255,255,0.05);
                    padding: 1.5rem;
                    border-radius: 12px;
                }
                .settings-card h3 {
                    margin-bottom: 1.5rem;
                    color: var(--color-accent);
                    font-size: 1.1rem;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    padding-bottom: 0.5rem;
                }
                .form-group {
                    margin-bottom: 1rem;
                }
                .form-group label {
                    display: block;
                    font-size: 0.85rem;
                    color: rgba(255,255,255,0.7);
                    margin-bottom: 0.4rem;
                }
                .input {
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.2);
                    color: white;
                    padding: 0.6rem;
                    border-radius: 6px;
                    width: 100%;
                    font-size: 0.95rem;
                }
                .input-sm {
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.2);
                    color: white;
                    padding: 0.3rem 0.5rem;
                    border-radius: 4px;
                    font-size: 0.85rem;
                }
            `}</style>
        </div>
    );
};

export default SettingsPanel;
