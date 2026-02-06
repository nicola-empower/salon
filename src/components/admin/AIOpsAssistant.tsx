import React from 'react';
import { METRICS, INVENTORY, CLIENTS } from '../../data/mockData';
import type { Appointment } from '../../data/mockData';

const AIOpsAssistant = () => {
    // Logic to generate the briefing content dynamically
    const generateBriefing = () => {
        const criticalStock = INVENTORY.filter(i => i.status === 'critical');
        const lowStock = INVENTORY.filter(i => i.status === 'low');
        const vipsToday = CLIENTS.filter(c => c.type === 'VIP' && c.lastVisit === '2026-01-20'); // Mock date match
        // In a real app, we'd filter appointments by today's date

        const utilization = METRICS.utilizationRate;

        let greeting = "Good morning, Sarah. ";
        let status = `The salon is currently ${utilization}% booked for the day. `;

        if (utilization < 50) {
            status += "It's a quieter day than usual. I recommend sending a 'Flash Sale' email to fill the afternoon slots. ";
        } else if (utilization > 90) {
            status += "It's fully booked! Great work. Staff breaks might need to be staggered. ";
        }

        let alerts = "";
        if (criticalStock.length > 0) {
            alerts += `⚠️ CRITICAL: Stock for ${criticalStock.map(i => i.name).join(', ')} is critically low. please reorder immediately. `;
        }
        if (vipsToday.length > 0) {
            alerts += `🌟 You have ${vipsToday.length} VIP(s) visiting today. `;
        }

        return { greeting, status, alerts };
    };

    const briefing = generateBriefing();

    return (
        <div className="ai-ops-card">
            <div className="ai-header">
                <div className="ai-avatar">
                    <span className="icon">✨</span>
                </div>
                <div>
                    <h3>AI Operations Assistant</h3>
                    <p className="subtitle">Daily Briefing & Recommendations</p>
                </div>
            </div>

            <div className="ai-content">
                <p className="greeting">{briefing.greeting}</p>
                <div className="briefing-section">
                    <p>{briefing.status}</p>
                </div>

                {briefing.alerts && (
                    <div className="briefing-alerts">
                        <p>{briefing.alerts}</p>
                    </div>
                )}

                <div className="ai-actions">
                    <button className="btn-xs">Generate End-of-Day Report</button>
                    <button className="btn-xs outline">Check Email Drafts</button>
                </div>
            </div>

            <style>{`
                .ai-ops-card {
                    background: linear-gradient(135deg, #1a1a2e, #16213e);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                    border-left: 4px solid var(--color-accent);
                }
                .ai-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }
                .ai-avatar {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: rgba(212, 175, 55, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    color: var(--color-accent);
                    border: 1px solid var(--color-accent);
                }
                .subtitle {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.85rem;
                    margin: 0;
                }
                h3 { margin: 0; font-size: 1.1rem; }
                .ai-content {
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 0.95rem;
                    line-height: 1.5;
                }
                .greeting { font-weight: 500; margin-bottom: 0.5rem; }
                .briefing-alerts {
                    background: rgba(255, 77, 77, 0.1);
                    border: 1px solid rgba(255, 77, 77, 0.3);
                    padding: 0.75rem;
                    border-radius: 6px;
                    margin: 1rem 0;
                    font-size: 0.9rem;
                    color: #ffcccc;
                }
                .ai-actions {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }
                .btn-xs {
                    padding: 0.4rem 0.8rem;
                    font-size: 0.8rem;
                    border-radius: 4px;
                    cursor: pointer;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: white;
                    transition: all 0.2s;
                }
                .btn-xs:hover { background: rgba(255, 255, 255, 0.2); }
                .btn-xs.outline { background: transparent; }
            `}</style>
        </div>
    );
};

export default AIOpsAssistant;
