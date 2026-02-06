import React, { useState, useRef } from 'react';
import ScanningOverlay from './ScanningOverlay'; // Import the new component

// Import types and data safely
import type { Treatment } from '../data/mockData';

interface TreatmentRec {
    treatmentId: string;
    reason: string;
    priority: 'high' | 'medium' | 'low';
}

interface AnalysisResult {
    skinType: string;
    concerns: string[];
    recommendations: TreatmentRec[];
    summary: string;
}

const SkinConsultation = () => {
    const [step, setStep] = useState<'upload' | 'analysing' | 'results'>('upload');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [cameraActive, setCameraActive] = useState(false);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: 1280, height: 720 }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                setCameraActive(true);
            }
        } catch (err) {
            setError('Unable to access camera. Please check permissions.');
        }
    };

    const capturePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(videoRef.current, 0, 0);

            const imageData = canvas.toDataURL('image/jpeg', 0.8);
            setImagePreview(imageData);

            // Stop camera
            const stream = videoRef.current.srcObject as MediaStream;
            stream?.getTracks().forEach(track => track.stop());
            setCameraActive(false);
        }
    };

    const analyseImage = async () => {
        if (!imagePreview) return;

        setStep('analysing');
        setError(null);

        try {
            const response = await fetch('/api/analyze-skin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageBase64: imagePreview })
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorData;
                try {
                    errorData = JSON.parse(errorText);
                } catch {
                    throw new Error(`Server error: ${response.status}`);
                }
                throw new Error(errorData.details || errorData.error || 'Analysis failed');
            }

            const data = await response.json();
            setResult(data);
            setStep('results');
            console.log('[Client] Analysis complete!');

        } catch (err) {
            console.error('[Client] Analysis error:', err);
            setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
            setStep('upload');
        }
    };

    const resetAnalysis = () => {
        setStep('upload');
        setImagePreview(null);
        setResult(null);
        setError(null);
        setCameraActive(false);
    };

    const getRecommendedTreatments = async () => {
        if (!result) return [];

        try {
            console.log('[Client] Importing TREATMENTS...');
            // Dynamically import TREATMENTS only when needed
            const { TREATMENTS } = await import('../data/mockData');
            console.log('[Client] Loaded treatments catalog:', TREATMENTS.length);

            if (!result.recommendations || !Array.isArray(result.recommendations)) {
                console.error('[Client] Result.recommendations is missing or not an array:', result.recommendations);
                return [];
            }

            const mapped = result.recommendations.map(rec => {
                // Robust matching: trim and case-insensitive
                const cleanId = rec.treatmentId ? rec.treatmentId.toLowerCase().trim() : '';
                console.log(`[Client] Looking for treatment ID: "${cleanId}" (Original: "${rec.treatmentId}")`);

                const treatment = TREATMENTS.find(t => t.id.toLowerCase() === cleanId);

                if (!treatment) {
                    console.warn(`[Client] Warning: Treatment ID "${rec.treatmentId}" not found in catalog.`);
                    // Fallback so the user still sees the recommendation
                    return {
                        ...rec,
                        treatment: {
                            id: rec.treatmentId || 'unknown',
                            name: `Recommended Treatment (${rec.treatmentId})`,
                            category: 'Custom Recommendation',
                            price: 0,
                            duration: 0,
                            description: 'Personalized suggestion from your AI analysis.'
                        }
                    };
                }
                console.log(`[Client] Found match: ${treatment.name}`);
                return { ...rec, treatment };
            });

            console.log('[Client] Mapped treatments:', mapped);
            return mapped;
            // Removed .filter() so we always show the AI's suggestions even if ID mapping fails
        } catch (err) {
            console.error('Error loading treatments:', err);
            return [];
        }
    };

    const [recommendedTreatments, setRecommendedTreatments] = useState<any[]>([]);

    React.useEffect(() => {
        if (result && step === 'results') {
            getRecommendedTreatments().then(setRecommendedTreatments);
        }
    }, [result, step]);

    return (
        <div className="skin-consultation">
            {step === 'upload' && (
                <div className="upload-section fade-in">
                    <h2>AI Skin Analysis</h2>
                    <p className="subtitle">Upload a clear photo of your face for personalised treatment recommendations</p>

                    <div className="privacy-badge">
                        <span className="icon">🔒</span>
                        <span><strong>Privacy First:</strong> Images are processed securely and never stored.</span>
                    </div>

                    {error && (
                        <div className="error-banner">
                            <div className="error-banner">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                                    {error}
                                </span>
                            </div>
                        </div>
                    )}

                    {!imagePreview && !cameraActive && (
                        <div className="upload-options">
                            <button className="option-card" onClick={() => fileInputRef.current?.click()}>
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m16 16-4-4-4 4" /></svg>
                                </div>
                                <h3>Upload Photo</h3>
                                <p>Choose from your device</p>
                            </button>

                            <button className="option-card" onClick={startCamera}>
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
                                </div>
                                <h3>Take Selfie</h3>
                                <p>Use your camera</p>
                            </button>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                style={{ display: 'none' }}
                            />
                        </div>
                    )}

                    {cameraActive && (
                        <div className="camera-container">
                            <video ref={videoRef} className="camera-feed" />
                            <div className="camera-controls">
                                <button className="btn btn-primary" onClick={capturePhoto}>
                                    Capture Photo
                                </button>
                                <button className="btn btn-outline" onClick={() => {
                                    const stream = videoRef.current?.srcObject as MediaStream;
                                    stream?.getTracks().forEach(track => track.stop());
                                    setCameraActive(false);
                                }}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {imagePreview && !cameraActive && (
                        <div className="preview-section">
                            <img src={imagePreview} alt="Preview" className="image-preview" />
                            <div className="preview-actions">
                                <button className="btn btn-outline" onClick={resetAnalysis}>
                                    Choose Different Photo
                                </button>
                                <button className="btn btn-primary" onClick={analyseImage}>
                                    Analyse My Skin
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="disclaimer">
                        <small>
                            ✨ Your photo is analysed instantly and not stored on our servers.
                            This analysis is for informational purposes only.
                        </small>
                    </div>
                </div>
            )}


            {step === 'analysing' && (
                <div className="analysing-section" style={{ position: 'relative', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Render the uploaded image in background for the scanner to layer over */}
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Scanning"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: 0.3,
                                filter: 'blur(2px)'
                            }}
                        />
                    )}
                    <ScanningOverlay />
                </div>
            )}

            {step === 'results' && result && (
                <div className="results-section fade-in">
                    <div className="results-header">
                        <h2>Your Personalised Skin Analysis</h2>
                        <button className="btn btn-outline-sm" onClick={resetAnalysis}>Start Over</button>
                    </div>

                    <div className="results-grid">
                        {/* Image */}
                        <div className="result-image">
                            <img src={imagePreview!} alt="Analysed" />
                        </div>

                        {/* Overview */}
                        <div className="result-overview">
                            <div className="info-card">
                                <h3>Skin Type</h3>
                                <p className="highlight">{result.skinType}</p>
                            </div>

                            <div className="info-card">
                                <h3>Identified Concerns</h3>
                                <ul className="concerns-list">
                                    {result.concerns.map((concern, i) => (
                                        <li key={i}>{concern}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="info-card summary-card">
                                <h3>Expert Summary</h3>
                                <p>{result.summary}</p>
                            </div>
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div className="recommendations-section">
                        <h3 className="section-title">Recommended Treatments</h3>
                        <div className="treatment-grid">
                            {recommendedTreatments.map((rec, i) => (
                                <div key={i} className={`treatment-card priority-${rec.priority}`}>
                                    <div className="priority-badge">{rec.priority} priority</div>
                                    <h4>{rec.treatment?.name}</h4>
                                    <p className="treatment-category">{rec.treatment?.category}</p>
                                    <p className="reason">{rec.reason}</p>
                                    <div className="treatment-meta">
                                        <span className="price">£{rec.treatment?.price}</span>
                                        <span className="duration">{rec.treatment?.duration} mins</span>
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className="cta-footer">
                            <p>Ready to transform your skin?</p>
                            <a href="/book" className="btn btn-primary btn-lg">
                                Book Your Treatment
                            </a>
                        </div>


                    </div>
                </div>
            )}
        </div>
    );
};

export default SkinConsultation;
