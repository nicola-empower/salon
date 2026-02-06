import React, { useEffect, useState } from 'react';
import '../styles/scanning.css';

const STEPS = [
    "Analyzing skin texture...",
    "Detecting hydration levels...",
    "Identifying concern areas...",
    "Formulating recommendations..."
];

const ScanningOverlay: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % STEPS.length);
        }, 1500); // Change step every 1.5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="scanning-overlay fade-in">
            <div className="scanner-grid"></div>

            <div className="face-frame">
                <div className="scan-line"></div>
                <div className="corner-bl"></div>
                <div className="corner-br"></div>
            </div>

            <div className="status-text">
                <span className="icon">✨</span>
                <span className="loading-dots">AI Analysis in Progress</span>
            </div>

            <div className="processing-step fade-in">
                {STEPS[currentStep]}
            </div>
        </div>
    );
};

export default ScanningOverlay;
