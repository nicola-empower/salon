import React, { useState } from 'react';
import { TREATMENTS, STAFF, type Treatment, type Staff } from '../data/mockData';
import '../styles/booking.css'; // specific styles for this widget

const steps = ['Service', 'Staff', 'Date', 'Details', 'Confirm'];

const BookingSystem = () => {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [userDetails, setUserDetails] = useState({ name: '', email: '', phone: '' });

    const categories = Array.from(new Set(TREATMENTS.map(t => t.category)));
    const filteredTreatments = selectedCategory
        ? TREATMENTS.filter(t => t.category === selectedCategory)
        : [];

    const relevantStaff = selectedTreatment
        ? STAFF.filter(s => s.specialties.includes(selectedTreatment.category))
        : [];

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const renderStep1_Service = () => (
        <div className="booking-step fade-in">
            <h3>Select Service</h3>
            {!selectedCategory ? (
                <div className="grid-2">
                    {categories.map(cat => (
                        <button key={cat} className="option-card" onClick={() => setSelectedCategory(cat)}>
                            <span>{cat}</span>
                        </button>
                    ))}
                </div>
            ) : (
                <>
                    <button className="text-sm underline mb-4" onClick={() => setSelectedCategory(null)}>← Back to Categories</button>
                    <div className="list-group">
                        {filteredTreatments.map(t => (
                            <button
                                key={t.id}
                                className={`list-item ${selectedTreatment?.id === t.id ? 'active' : ''}`}
                                onClick={() => setSelectedTreatment(t)}
                            >
                                <div className="flex-between">
                                    <strong>{t.name}</strong>
                                    <span>£{t.price}</span>
                                </div>
                                <p className="text-xs muted">{t.duration} mins • {t.description}</p>
                            </button>
                        ))}
                    </div>
                </>
            )}
            <div className="actions">
                <button className="btn btn-primary" disabled={!selectedTreatment} onClick={handleNext}>Next</button>
            </div>
        </div>
    );

    const renderStep2_Staff = () => (
        <div className="booking-step fade-in">
            <h3>Select Professional</h3>
            <div className="grid-2">
                <button
                    className={`option-card ${selectedStaff === null ? 'active' : ''}`}
                    onClick={() => setSelectedStaff(null)} // Any staff
                >
                    <span>Any Professional</span>
                    <small>Maximum availability</small>
                </button>
                {relevantStaff.map(s => (
                    <button
                        key={s.id}
                        className={`option-card ${selectedStaff?.id === s.id ? 'active' : ''}`}
                        onClick={() => setSelectedStaff(s)}
                    >
                        <img src={s.avatar} alt={s.name} className="avatar-sm" />
                        <span>{s.name}</span>
                        <small>{s.role}</small>
                    </button>
                ))}
            </div>
            <div className="actions">
                <button className="btn btn-outline" onClick={handleBack}>Back</button>
                <button className="btn btn-primary" onClick={handleNext}>Next</button>
            </div>
        </div>
    );

    const renderStep3_Date = () => (
        <div className="booking-step fade-in">
            <h3>Select Time</h3>
            <div className="date-picker-placeholder">
                <input
                    type="date"
                    className="input-field"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                />

                {selectedDate && (
                    <div className="time-slots grid-3 mt-4">
                        {['09:00', '10:00', '11:00', '13:00', '14:30', '16:00'].map(time => (
                            <button
                                key={time}
                                className={`time-slot ${selectedTime === time ? 'active' : ''}`}
                                onClick={() => setSelectedTime(time)}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                )}
                {selectedDate && (
                    <p className="text-xs text-center mt-2 muted">
                        <span className="icon">✨</span> Includes 15min sanitisation buffer
                    </p>
                )}
            </div>
            <div className="actions">
                <button className="btn btn-outline" onClick={handleBack}>Back</button>
                <button className="btn btn-primary" disabled={!selectedDate || !selectedTime} onClick={handleNext}>Next</button>
            </div>
        </div>
    );

    const renderStep4_Details = () => (
        <div className="booking-step fade-in">
            <h3>Your Details</h3>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Full Name"
                    className="input-field"
                    value={userDetails.name}
                    onChange={e => setUserDetails({ ...userDetails, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    className="input-field"
                    value={userDetails.email}
                    onChange={e => setUserDetails({ ...userDetails, email: e.target.value })}
                />
                <input
                    type="tel"
                    placeholder="Phone Number"
                    className="input-field"
                    value={userDetails.phone}
                    onChange={e => setUserDetails({ ...userDetails, phone: e.target.value })}
                />
            </div>
            <div className="actions">
                <button className="btn btn-outline" onClick={handleBack}>Back</button>
                <button
                    className="btn btn-primary"
                    disabled={!userDetails.name || !userDetails.email}
                    onClick={handleNext}
                >
                    Review Booking
                </button>
            </div>
        </div>
    );

    const renderStep5_Confirm = () => (
        <div className="booking-step fade-in">
            <h3>Confirm Booking</h3>
            <div className="summary-card">
                <div className="summary-row">
                    <span>Service</span>
                    <strong>{selectedTreatment?.name}</strong>
                </div>
                <div className="summary-row">
                    <span>Professional</span>
                    <strong>{selectedStaff?.name || 'Any'}</strong>
                </div>
                <div className="summary-row">
                    <span>Date & Time</span>
                    <strong>{selectedDate} at {selectedTime}</strong>
                </div>
                <div className="summary-row total">
                    <span>Total</span>
                    <strong>£{selectedTreatment?.price}</strong>
                </div>
            </div>
            <div className="actions">
                <button className="btn btn-outline" onClick={handleBack}>Back</button>
                <button className="btn btn-primary" onClick={() => setStep(6)}>Confirm Booking</button>
            </div>
        </div>
    );

    const renderSuccess = () => (
        <div className="booking-step text-center fade-in">
            <div className="success-icon">✓</div>
            <h3>Booking Confirmed!</h3>
            <p>Thank you {userDetails.name}. A confirmation email has been sent to {userDetails.email}.</p>
            <a href="/" className="btn btn-outline mt-4">Return Home</a>
        </div>
    );

    return (
        <div className="booking-widget">
            <div className="step-indicator">
                {steps.map((s, i) => (
                    <div key={s} className={`step ${i + 1 <= step ? 'completed' : ''} ${i + 1 === step ? 'current' : ''}`}>
                        <div className="step-num">{i + 1}</div>
                        <span className="step-label">{s}</span>
                    </div>
                ))}
            </div>

            <div className="step-content">
                {step === 1 && renderStep1_Service()}
                {step === 2 && renderStep2_Staff()}
                {step === 3 && renderStep3_Date()}
                {step === 4 && renderStep4_Details()}
                {step === 5 && renderStep5_Confirm()}
                {step === 6 && renderSuccess()}
            </div>
        </div>
    );
};

export default BookingSystem;
