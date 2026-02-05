import React, { useState } from 'react';
import type { DaySchedule, EnhancedBooking } from '../../types/booking';

interface WeeklyCalendarProps {
    staffId: string;
    weekStart: Date;
    bookings: EnhancedBooking[];
    onBookingClick?: (booking: EnhancedBooking) => void;
}

const HOURS = Array.from({ length: 10 }, (_, i) => i + 9); // 9am to 6pm
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
    staffId,
    weekStart,
    bookings,
    onBookingClick
}) => {
    // Internal state for week navigation
    const [currentWeekStart, setCurrentWeekStart] = useState(weekStart);

    const changeWeek = (direction: 'next' | 'prev') => {
        const newDate = new Date(currentWeekStart);
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        setCurrentWeekStart(newDate);
    };

    const getWeekDays = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(currentWeekStart);
            date.setDate(date.getDate() + i);
            days.push(date);
        }
        return days;
    };

    const weekDays = getWeekDays();

    const getBookingsForTimeSlot = (date: Date, hour: number): EnhancedBooking | null => {
        const dateStr = date.toISOString().split('T')[0];
        const timeStr = `${hour.toString().padStart(2, '0')}:00`;

        return bookings.find(booking =>
            booking.staffId === staffId &&
            booking.date === dateStr &&
            booking.time.startsWith(hour.toString().padStart(2, '0'))
        ) || null;
    };

    const formatTime = (hour: number) => {
        if (hour === 12) return '12pm';
        if (hour > 12) return `${hour - 12}pm`;
        return `${hour}am`;
    };

    return (
        <div className="weekly-calendar-container">
            {/* Controls */}
            <div className="calendar-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0 }}>Week of {currentWeekStart.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        className="btn btn-outline"
                        onClick={() => changeWeek('prev')}
                        style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        ← Previous Week
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={() => changeWeek('next')}
                        style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Next Week →
                    </button>
                </div>
            </div>

            <div className="weekly-calendar">
                {/* Header with days */}
                <div className="calendar-header">
                    <div className="time-column-header">Time</div>
                    {weekDays.map((date, idx) => (
                        <div key={idx} className="day-column-header">
                            <div className="day-name">{DAYS[idx]}</div>
                            <div className="day-date">{date.getDate()}</div>
                        </div>
                    ))}
                </div>

                {/* Time slots grid */}
                <div className="calendar-grid">
                    {HOURS.map(hour => (
                        <div key={hour} className="time-row">
                            {/* Time label */}
                            <div className="time-label">{formatTime(hour)}</div>

                            {/* Day columns */}
                            {weekDays.map((date, dayIdx) => {
                                const booking = getBookingsForTimeSlot(date, hour);
                                const isToday = date.toDateString() === new Date().toDateString();

                                return (
                                    <div
                                        key={dayIdx}
                                        className={`time-slot ${isToday ? 'today' : ''} ${booking ? 'has-booking' : ''}`}
                                        onClick={() => booking && onBookingClick?.(booking)}
                                    >
                                        {booking && (
                                            <div className={`booking-card status-${booking.status}`}>
                                                <div className="booking-time">{booking.time}</div>
                                                <div className="booking-client">{booking.clientName}</div>
                                                <div className="booking-treatment">{booking.treatmentName}</div>
                                                <div className="booking-duration">{booking.duration} mins</div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeeklyCalendar;
