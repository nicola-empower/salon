import React, { useState, useEffect } from 'react';
import type { Staff } from '../../data/mockData';
import { toast } from 'sonner';

interface WalkInManagerProps {
    staff: any[];
    appointments: any[];
}

const WalkInManager: React.FC<WalkInManagerProps> = ({ staff, appointments }) => {
    // Mock current time for demo - in real app would be new Date()
    const [currentTime, setCurrentTime] = useState("10:30");
    const [selectedDate] = useState("2026-02-10"); // Matching the mock data week

    const getStatus = (staffId: string) => {
        const staffApps = appointments.filter(a =>
            a.staffId === staffId &&
            a.date === selectedDate &&
            a.status !== 'cancelled'
        );

        // Sort by time
        staffApps.sort((a, b) => a.time.localeCompare(b.time));

        const currentHour = parseInt(currentTime.split(':')[0]);
        const currentMin = parseInt(currentTime.split(':')[1]);
        const currentTotalMins = currentHour * 60 + currentMin;

        // Find if busy NOW
        // Assuming 60 min slots for simplicity of this demo, effectively blocking [time, time+60]
        const currentApp = staffApps.find(app => {
            const startH = parseInt(app.time.split(':')[0]);
            const startM = parseInt(app.time.split(':')[1]);
            const startTotal = startH * 60 + startM;
            const endTotal = startTotal + 60; // Mock duration 60 mins

            return currentTotalMins >= startTotal && currentTotalMins < endTotal;
        });

        if (currentApp) {
            const startH = parseInt(currentApp.time.split(':')[0]);
            const startM = parseInt(currentApp.time.split(':')[1]);
            const endTotal = (startH * 60 + startM) + 60;
            const minsRemaining = endTotal - currentTotalMins;

            if (currentApp.status === 'break') {
                return {
                    status: 'break',
                    label: `☕ ${currentApp.clientName}`, // "☕ Lunch Break"
                    color: '#9ca3af', // grey
                    subtext: `Back in ${minsRemaining} mins`
                }
            }

            return {
                status: 'busy',
                label: `Busy with ${currentApp.clientName}`,
                color: '#ef4444',
                subtext: `Free in ${minsRemaining} mins`
            };
        }

        // Findings next gap
        const nextApp = staffApps.find(app => {
            const startH = parseInt(app.time.split(':')[0]);
            const startM = parseInt(app.time.split(':')[1]);
            const startTotal = startH * 60 + startM;
            return startTotal > currentTotalMins;
        });

        if (nextApp) {
            const startH = parseInt(nextApp.time.split(':')[0]);
            const startM = parseInt(nextApp.time.split(':')[1]);
            const startTotal = startH * 60 + startM;
            const gapMins = startTotal - currentTotalMins;

            if (gapMins < 15) {
                return { status: 'soon', label: 'Finishing Soon', color: '#f59e0b', subtext: `< ${gapMins} mins gap` };
            }
            return {
                status: 'available',
                label: 'Available Now',
                color: '#4ade80',
                subtext: `Free for ${gapMins} mins` // until next app
            };
        }

        // If no next app, free until end of day (18:00)
        const closeTotal = 18 * 60;
        const remaining = closeTotal - currentTotalMins;
        if (remaining <= 0) {
            return { status: 'off', label: 'Shift Ended', color: '#666', subtext: 'See you tomorrow' };
        }

        return {
            status: 'available',
            label: 'Available Now',
            color: '#4ade80',
            subtext: `Free until close (${Math.floor(remaining / 60)}h ${remaining % 60}m)`
        };
    };

    return (
        <div className="walk-in-manager fade-in">
            <div className="flex-between mb-4">
                <h2>⚡ Walk-In Triage</h2>
                <div className="time-control">
                    <label>Simulated Time:</label>
                    <input
                        type="time"
                        value={currentTime}
                        onChange={(e) => setCurrentTime(e.target.value)}
                        className="input-time"
                    />
                </div>
            </div>

            <div className="triage-grid">
                {staff.map(member => {
                    const info = getStatus(member.id);

                    return (
                        <div key={member.id} className="triage-card" style={{ borderTopColor: info.color }}>
                            <div className="triage-header">
                                <img src={member.photo || member.avatar} alt={member.name} className="avatar-md" />
                                <div>
                                    <h3>{member.name.split(' ')[0]}</h3>
                                    <span className="role">{member.role}</span>
                                </div>
                            </div>

                            <div className="status-badge" style={{ background: `${info.color}20`, color: info.color }}>
                                <div className="indicator" style={{ background: info.color }}></div>
                                {info.label}
                            </div>

                            <p className="availability-text">
                                {info.subtext}
                            </p>

                            <button
                                className="btn-action"
                                disabled={info.status === 'busy' || info.status === 'off' || info.status === 'break'}
                                onClick={() => {
                                    toast.success(`Assigned walk-in client to ${member.name}`, {
                                        description: 'Client checked in and notified.',
                                        duration: 4000,
                                    });
                                }}
                            >
                                {info.status === 'busy' ? 'Wait' : info.status === 'break' ? 'On Break' : 'Assign Walk-In'}
                            </button>
                        </div>
                    );
                })}
            </div>

            <style>{`
                .walk-in-manager {
                    padding: 1rem;
                }
                .time-control {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    background: rgba(255,255,255,0.05);
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                }
                .input-time {
                    background: black;
                    border: 1px solid #444;
                    color: white;
                    padding: 0.2rem 0.5rem;
                    border-radius: 4px;
                }
                .triage-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                    gap: 1.5rem;
                }
                .triage-card {
                    background: var(--color-surface);
                    border-radius: 12px;
                    padding: 1.5rem;
                    border: 1px solid rgba(255,255,255,0.05);
                    border-top: 4px solid #666;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .triage-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .avatar-md {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                .role {
                    font-size: 0.8rem;
                    color: #888;
                }
                .status-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem;
                    border-radius: 6px;
                    font-weight: 600;
                    font-size: 0.9rem;
                }
                .indicator {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }
                .availability-text {
                    font-family: monospace;
                    font-size: 1.1rem;
                    text-align: center;
                    color: white;
                    margin: 0.5rem 0;
                }
                .btn-action {
                    background: white;
                    color: black;
                    border: none;
                    padding: 0.8rem;
                    border-radius: 6px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: opacity 0.2s;
                }
                .btn-action:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }
                .btn-action:hover:not(:disabled) {
                    background: #eee;
                }
            `}</style>
        </div>
    );
};

export default WalkInManager;
