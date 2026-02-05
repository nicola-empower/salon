import React, { useState } from 'react';
import { STAFF, INITIAL_APPOINTMENTS } from '../data/mockData';
import '../styles/booking.css';
import '../styles/admin.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<'bookings' | 'staff'>('bookings');

    return (
        <div className="admin-dashboard">
            <div className="sidebar">
                <div className="user-profile">
                    <div className="avatar">AD</div>
                    <div>
                        <strong>Admin User</strong>
                        <small>Owner</small>
                    </div>
                </div>

                <nav>
                    <button
                        className={activeTab === 'bookings' ? 'active' : ''}
                        onClick={() => setActiveTab('bookings')}
                    >
                        Bookings
                    </button>
                    <button
                        className={activeTab === 'staff' ? 'active' : ''}
                        onClick={() => setActiveTab('staff')}
                    >
                        Staff Management
                    </button>
                </nav>
            </div>

            <div className="content">
                {activeTab === 'bookings' && (
                    <div>
                        <h2>Upcoming Appointments</h2>
                        <div className="card-list">
                            {INITIAL_APPOINTMENTS.map(app => (
                                <div key={app.id} className="admin-card">
                                    <div className="flex-between">
                                        <strong>{app.date} @ {app.time}</strong>
                                        <span className={`status ${app.status}`}>{app.status}</span>
                                    </div>
                                    <p>{app.clientName} ({app.clientEmail})</p>
                                    <small>Treatment ID: {app.treatmentId} with Staff ID: {app.staffId}</small>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'staff' && (
                    <div>
                        <h2>Staff Members</h2>
                        <div className="grid-2">
                            {STAFF.map(s => (
                                <div key={s.id} className="admin-card">
                                    <div className="flex-gap">
                                        <img src={s.avatar} alt={s.name} className="avatar-sm" />
                                        <div>
                                            <strong>{s.name}</strong>
                                            <p className="muted">{s.role}</p>
                                        </div>
                                    </div>
                                    <div className="tags mt-2">
                                        {s.specialties.map(spec => (
                                            <span key={spec} className="tag">{spec}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
