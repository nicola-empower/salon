import React, { useState } from 'react';
import { INITIAL_APPOINTMENTS } from '../data/mockData';
import { STAFF_PROFILES as STAFF } from '../data/staff-profiles';
import ManagerDashboard from './admin/ManagerDashboard';
import StaffPortal from './admin/StaffPortal';
import WalkInManager from './admin/WalkInManager';
import '../styles/booking.css';
import '../styles/admin.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<'bookings' | 'staff' | 'walkins'>('bookings');
    const [userRole, setUserRole] = useState<'manager' | 'staff' | 'reception'>('manager');
    const [selectedStaffId, setSelectedStaffId] = useState<string>('');

    // Lifted state for Staff Management
    const [staffMembers, setStaffMembers] = useState(STAFF);

    const activeStaffMember = staffMembers.find(s => s.id === selectedStaffId);

    const handleAddStaff = (newStaff: any) => {
        setStaffMembers([...staffMembers, newStaff]);
    };

    const handleRemoveStaff = (id: string) => {
        setStaffMembers(staffMembers.filter(s => s.id !== id));
    };

    // State for appointments to allow status updates
    const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);

    const handleCheckIn = (id: string) => {
        setAppointments(apps => apps.map(a =>
            a.id === id ? { ...a, status: 'checked-in' as any } : a
        ));
    };

    const getReminderLink = (clientName: string, email: string, date: string, time: string) => {
        const subject = `Appointment Reminder: The Salon`;
        const body = `Dear ${clientName},%0D%0A%0D%0AThis is a friendly reminder of your appointment at The Salon on ${date} at ${time}.%0D%0A%0D%0APlease let us know if you need to reschedule.%0D%0A%0D%0AKind regards,%0D%0AThe Salon Team`;
        return `mailto:${email}?subject=${subject}&body=${body}`;
    };

    return (
        <div className="admin-dashboard">
            <div className="sidebar">
                <div className="user-profile">
                    <div className="avatar">AD</div>
                    <div>
                        <strong>{activeStaffMember ? activeStaffMember.name : 'Admin User'}</strong>
                        <div className="role-switch">
                            <small>
                                {userRole === 'manager' ? 'Owner' :
                                    userRole === 'staff' && activeStaffMember ? activeStaffMember.role : 'Reception'}
                            </small>
                            <select
                                className="role-select"
                                value={userRole === 'manager' ? 'manager' : (activeStaffMember ? activeStaffMember.id : 'reception')}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val === 'manager') {
                                        setUserRole('manager');
                                        setSelectedStaffId('');
                                    } else if (val === 'reception') {
                                        setUserRole('staff'); // Re-using staff role key for reception view
                                        setSelectedStaffId('');
                                    } else {
                                        setUserRole('staff');
                                        setSelectedStaffId(val);
                                    }
                                }}
                            >
                                <option value="manager">Manager/Owner</option>
                                <option value="reception">Reception Node</option>
                                <optgroup label="Staff Portals">
                                    {staffMembers.map(s => (
                                        <option key={s.id} value={s.id}>Login as {s.name.split(' ')[0]}</option>
                                    ))}
                                </optgroup>
                            </select>
                        </div>
                    </div>
                </div>

                <nav>
                    {userRole === 'manager' ? (
                        <div className="manager-badge">
                            <span>MANAGER PORTAL</span>
                        </div>
                    ) : activeStaffMember ? (
                        <div className="manager-badge" style={{ color: activeStaffMember.color || 'white', borderColor: activeStaffMember.color || 'white' }}>
                            <span>STAFF PORTAL</span>
                        </div>
                    ) : (
                        <>
                            <button
                                className={activeTab === 'bookings' ? 'active' : ''}
                                onClick={() => setActiveTab('bookings')}
                            >
                                Bookings
                            </button>
                            <button
                                className={activeTab === 'walkins' ? 'active' : ''}
                                onClick={() => setActiveTab('walkins')}
                            >
                                Walk-In Triage
                            </button>
                            <button
                                className={activeTab === 'staff' ? 'active' : ''}
                                onClick={() => setActiveTab('staff')}
                            >
                                Staff Management
                            </button>
                        </>
                    )}
                </nav>
            </div>

            <div className="content">
                {userRole === 'manager' ? (
                    <ManagerDashboard
                        staff={staffMembers}
                        onAddStaff={handleAddStaff}
                        onRemoveStaff={handleRemoveStaff}
                    />
                ) : activeStaffMember ? (
                    <StaffPortal staff={activeStaffMember} onLogout={() => { setSelectedStaffId(''); setUserRole('manager'); }} />
                ) : (
                    <>
                        {activeTab === 'bookings' && (
                            <div className="fade-in">
                                <h2>Upcoming Appointments</h2>
                                <div className="card-list">
                                    {appointments.map(app => (
                                        <div key={app.id} className="admin-card">
                                            <div className="flex-between">
                                                <strong>{app.date} @ {app.time}</strong>
                                                <span className={`status ${app.status}`}>{app.status === 'checked-in' ? 'Checked In' : app.status}</span>
                                            </div>
                                            <p>{app.clientName} ({app.clientEmail})</p>
                                            <small>Treatment ID: {app.treatmentId} with Staff ID: {app.staffId}</small>

                                            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                                {app.status === 'confirmed' && (
                                                    <button
                                                        className="btn-primary"
                                                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                                                        onClick={() => handleCheckIn(app.id)}
                                                    >
                                                        ✅ Check In
                                                    </button>
                                                )}
                                                {app.status === 'pending' && (
                                                    <a
                                                        href={getReminderLink(app.clientName, app.clientEmail, app.date, app.time)}
                                                        className="btn-outline"
                                                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', textDecoration: 'none', display: 'inline-block' }}
                                                    >
                                                        ✉️ Send Reminder
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'staff' && (
                            <div className="fade-in">
                                <h2>Staff Members</h2>
                                <div className="grid-2">
                                    {STAFF.map((s: any) => (
                                        <div key={s.id} className="admin-card">
                                            <div className="flex-gap">
                                                <img src={s.photo || s.avatar} alt={s.name} className="avatar-sm" />
                                                <div>
                                                    <strong>{s.name}</strong>
                                                    <p className="muted">{s.role}</p>
                                                </div>
                                            </div>
                                            <div className="tags mt-2">
                                                {s.specialties.map((spec: string) => (
                                                    <span key={spec} className="tag">{spec}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'walkins' && (
                            <WalkInManager staff={staffMembers} appointments={appointments} />
                        )}
                    </>
                )}
            </div>

            <style>{`
                .role-switch { display: flex; flex-direction: column; gap: 0.25rem; }
                .role-select {
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.2);
                    color: white;
                    padding: 0.2rem;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    width: 100%;
                }
                .btn-xs-text {
                    background: none;
                    border: none;
                    color: var(--color-accent);
                    text-decoration: underline;
                    cursor: pointer;
                    font-size: 0.7rem;
                    padding: 0;
                }
                .manager-badge {
                    padding: 1rem;
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid var(--color-accent);
                    border-radius: 8px;
                    color: var(--color-accent);
                    text-align: center;
                    font-weight: bold;
                    letter-spacing: 1px;
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
