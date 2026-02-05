import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    alt?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
    beforeImage,
    afterImage,
    alt = 'Before and After Comparison'
}) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = (x / rect.width) * 100;

        // Clamp between 0 and 100
        const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
        setSliderPosition(clampedPercentage);
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            handleMove(e.clientX);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length > 0) {
            handleMove(e.touches[0].clientX);
        }
    };

    // Global mouse up listener
    useEffect(() => {
        const handleGlobalMouseUp = () => setIsDragging(false);
        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }, []);

    return (
        <div
            ref={containerRef}
            className="before-after-slider"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            style={{ position: 'relative', overflow: 'hidden', cursor: 'ew-resize' }}
        >
            {/* After Image (Full) */}
            <div className="after-image" style={{ width: '100%', height: '100%' }}>
                <img
                    src={afterImage}
                    alt={`${alt} - After`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    draggable={false}
                />
                <span className="image-label after-label">After</span>
            </div>

            {/* Before Image (Clipped) */}
            <div
                className="before-image"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                }}
            >
                <img
                    src={beforeImage}
                    alt={`${alt} - Before`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    draggable={false}
                />
                <span className="image-label before-label">Before</span>
            </div>

            {/* Slider Handle */}
            <div
                className="slider-handle"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: `${sliderPosition}%`,
                    width: '4px',
                    height: '100%',
                    backgroundColor: 'var(--color-accent)',
                    transform: 'translateX(-50%)',
                    cursor: 'ew-resize',
                    boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
            >
                {/* Handle Button */}
                <div
                    className="handle-button"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '48px',
                        height: '48px',
                        backgroundColor: 'var(--color-accent)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        cursor: 'ew-resize',
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 6l-6 6 6 6" />
                        <path d="M9 6l6 6-6 6" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default BeforeAfterSlider;
