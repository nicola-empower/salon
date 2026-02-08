import React from 'react';
import { METRICS } from '../../data/mockData';

const BusinessIntelligence = () => {
    const [dailyRevenue, setDailyRevenue] = React.useState(METRICS.dailyRevenue);

    React.useEffect(() => {
        const updateRevenue = () => {
            const data = localStorage.getItem('salon_transactions');
            if (data) {
                const txns = JSON.parse(data);
                // Calculate total revenue (service amounts)
                // Start with base METRICS.dailyRevenue as "historical" and add new
                const newRevenue = txns.reduce((acc: number, curr: any) => acc + (curr.amount || 0), 0);
                setDailyRevenue(METRICS.dailyRevenue + newRevenue);
            }
        };

        updateRevenue();
        window.addEventListener('transaction-updated', updateRevenue);
        return () => window.removeEventListener('transaction-updated', updateRevenue);
    }, []);

    return (
        <div className="bi-dashboard">
            {/* Revenue Card */}
            <div className="bi-card">
                <div className="card-header">
                    <h4>Daily Revenue</h4>
                    <span className="trend positive">↑ 12%</span>
                </div>
                <div className="metric-value">£{dailyRevenue.toFixed(2)}</div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${(dailyRevenue / METRICS.dailyTarget) * 100}%` }}
                    ></div>
                </div>
                <small className="target-text">Target: £{METRICS.dailyTarget}</small>
            </div>

            {/* Utilization Card */}
            <div className="bi-card">
                <div className="card-header">
                    <h4>Salon Utilization</h4>
                    <span className="trend neutral">~ 2%</span>
                </div>
                <div className="metric-value">{METRICS.utilizationRate}%</div>
                <div className="mini-chart">
                    {/* CSS-only chart representation */}
                    <div className="bar" style={{ height: '40%' }}></div>
                    <div className="bar" style={{ height: '60%' }}></div>
                    <div className="bar" style={{ height: '80%' }}></div>
                    <div className="bar active" style={{ height: '78%' }}></div>
                    <div className="bar" style={{ height: '90%' }}></div>
                </div>
                <small className="target-text">Peak Time: 2:00 PM</small>
            </div>

            {/* Top Service Card */}
            <div className="bi-card highlight">
                <div className="card-header">
                    <h4>Top Performing Service</h4>
                </div>
                <div className="service-name">{METRICS.topService}</div>
                <div className="service-stats">
                    <span>18 Bookings</span>
                    <span>£2,100 Rev</span>
                </div>
            </div>

            <style>{`
                .bi-dashboard {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }
                .bi-card {
                    background: var(--color-surface);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 12px;
                    padding: 1.5rem;
                }
                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                .card-header h4 { margin: 0; font-size: 0.9rem; color: rgba(255, 255, 255, 0.6); }
                .metric-value {
                    font-size: 2rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 1rem;
                }
                .trend { font-size: 0.8rem; padding: 2px 6px; border-radius: 4px; }
                .trend.positive { color: #4ade80; background: rgba(74, 222, 128, 0.1); }
                .trend.neutral { color: #94a3b8; background: rgba(148, 163, 184, 0.1); }
                
                .progress-bar {
                    height: 6px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 3px;
                    margin-bottom: 0.5rem;
                    overflow: hidden;
                }
                .progress-fill {
                    height: 100%;
                    background: var(--color-accent);
                    border-radius: 3px;
                }
                .target-text { color: rgba(255, 255, 255, 0.4); font-size: 0.8rem; }

                .mini-chart {
                    display: flex;
                    align-items: flex-end;
                    gap: 4px;
                    height: 40px;
                    margin-bottom: 0.5rem;
                }
                .bar {
                    flex: 1;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px 2px 0 0;
                }
                .bar.active { background: var(--color-accent); }

                .bi-card.highlight {
                    background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05));
                    border-color: var(--color-accent);
                }
                .service-name {
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: var(--color-accent);
                    margin-bottom: 0.5rem;
                }
                .service-stats {
                    display: flex;
                    gap: 1rem;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.9rem;
                }
                
                .reports-list {
                    background: var(--color-surface);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 12px;
                    padding: 1.5rem;
                }
                .report-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.75rem 0;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    color: rgba(255,255,255,0.8);
                    font-size: 0.9rem;
                    cursor: pointer;
                }
                .report-item:last-child { border-bottom: none; }
                .report-item:hover { color: var(--color-accent); }
            `}</style>

            <div className="reports-list">
                <h4 style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Quick Reports</h4>

                <div className="report-item">
                    <span>📄 End of Day Report</span>
                    <small>↓ PDF</small>
                </div>
                <div className="report-item">
                    <span>📊 Staff Performance</span>
                    <small>↓ CSV</small>
                </div>
                <div className="report-item">
                    <span>💰 VAT/Tax Summary</span>
                    <small>↓ PDF</small>
                </div>
            </div>
        </div>
    );
};

export default BusinessIntelligence;
