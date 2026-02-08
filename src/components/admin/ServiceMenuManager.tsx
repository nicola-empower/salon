import React, { useState } from 'react';
import { TREATMENTS } from '../../data/mockData';
import type { Treatment } from '../../data/mockData';
import { toast } from 'sonner';

const ServiceMenuManager = () => {
    const [services, setServices] = useState<Treatment[]>(TREATMENTS);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Treatment>>({});
    const [isAdding, setIsAdding] = useState(false);

    // Get unique categories
    const categories = Array.from(new Set(services.map(s => s.category)));

    const handleEditClick = (service: Treatment) => {
        setIsEditing(service.id);
        setEditForm({ ...service });
    };

    const handleSaveEdit = () => {
        if (!editForm.name || !editForm.price) return;

        setServices(prev => prev.map(s =>
            s.id === isEditing ? { ...s, ...editForm } as Treatment : s
        ));
        setIsEditing(null);
        toast.success('Service updated successfully');
    };

    const handleAddNew = () => {
        const name = editForm.name;
        const price = editForm.price;
        const category = editForm.category;

        if (!name || !price || !category) {
            toast.error('Please fill in Name, Price and Category');
            return;
        }

        const newService: Treatment = {
            id: `new-${Date.now()}`,
            name: name,
            category: category as any,
            price: Number(price),
            duration: Number(editForm.duration) || 60,
            description: editForm.description || '',
            requiresMedical: editForm.requiresMedical
        };

        setServices([...services, newService]);
        setIsAdding(false);
        setEditForm({});
        toast.success('New service added to menu');
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to remove this service?')) {
            setServices(prev => prev.filter(s => s.id !== id));
            toast.success('Service removed');
        }
    };

    return (
        <div className="service-manager fade-in">
            <div className="flex-between mb-4">
                <div>
                    <h2>Service Menu</h2>
                    <p className="text-muted">Manage treatments, prices, and durations.</p>
                </div>
                <button className="btn-primary" onClick={() => { setIsAdding(true); setEditForm({}); }}>
                    + Add New Service
                </button>
            </div>

            {isAdding && (
                <div className="edit-modal">
                    <h3>Add New Service</h3>
                    <div className="grid-2 gap-4">
                        <input
                            placeholder="Service Name"
                            className="input"
                            value={editForm.name || ''}
                            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                        />
                        <select
                            className="input"
                            value={editForm.category || ''}
                            onChange={e => setEditForm({ ...editForm, category: e.target.value as any })}
                        >
                            <option value="">Select Category...</option>
                            {/* Static list of categories from mockData definition + any dynamic ones */}
                            <option value="Aesthetics">Aesthetics</option>
                            <option value="Skincare">Skincare</option>
                            <option value="Body & Wellness">Body & Wellness</option>
                            <option value="Nails">Nails</option>
                            <option value="Lashes & Brows">Lashes & Brows</option>
                            <option value="Waxing">Waxing</option>
                            <option value="Hair">Hair</option>
                            <option value="Makeup">Makeup</option>
                        </select>
                        <div className="flex gap-2 items-center">
                            <span>£</span>
                            <input
                                type="number"
                                placeholder="Price"
                                className="input"
                                value={editForm.price || ''}
                                onChange={e => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                            />
                        </div>
                        <div className="flex gap-2 items-center">
                            <input
                                type="number"
                                placeholder="Duration (min)"
                                className="input"
                                value={editForm.duration || ''}
                                onChange={e => setEditForm({ ...editForm, duration: parseInt(e.target.value) })}
                            />
                            <span>mins</span>
                        </div>
                    </div>
                    <textarea
                        placeholder="Description"
                        className="input mt-2 w-full"
                        value={editForm.description || ''}
                        onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                    />
                    <div className="flex gap-2 mt-4">
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={editForm.requiresMedical || false}
                                onChange={e => setEditForm({ ...editForm, requiresMedical: e.target.checked })}
                            />
                            Requires Medical Qualification
                        </label>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button className="btn-primary" onClick={handleAddNew}>Save Service</button>
                        <button className="btn-outline" onClick={() => setIsAdding(false)}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="categories-list">
                {categories.map(cat => (
                    <div key={cat} className="category-section">
                        <h3 className="category-title">{cat}</h3>
                        <div className="services-grid">
                            {services.filter(s => s.category === cat).map(service => (
                                <div key={service.id} className="service-card">
                                    {isEditing === service.id ? (
                                        <div className="edit-mode">
                                            <input
                                                value={editForm.name}
                                                className="input mb-2 w-full"
                                                onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                            />
                                            <div className="flex gap-2 mb-2">
                                                <div className="flex items-center bg-black/30 rounded px-2">
                                                    <span className="text-gray-500 text-sm">£</span>
                                                    <input
                                                        type="number"
                                                        value={editForm.price}
                                                        className="bg-transparent border-none text-white w-16 text-sm"
                                                        onChange={e => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                                                    />
                                                </div>
                                                <div className="flex items-center bg-black/30 rounded px-2">
                                                    <input
                                                        type="number"
                                                        value={editForm.duration}
                                                        className="bg-transparent border-none text-white w-12 text-sm"
                                                        onChange={e => setEditForm({ ...editForm, duration: parseInt(e.target.value) })}
                                                    />
                                                    <span className="text-gray-500 text-xs">min</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="btn-xs-primary" onClick={handleSaveEdit}>Save</button>
                                                <button className="btn-xs-outline" onClick={() => setIsEditing(null)}>Cancel</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="view-mode group">
                                            <div className="flex justify-between items-start">
                                                <span className="font-bold text-white">{service.name}</span>
                                                <span className="price text-accent">£{service.price}</span>
                                            </div>
                                            <div className="flex justify-between items-end mt-2">
                                                <small className="text-muted text-xs">{service.duration} mins</small>
                                                <div className="actions opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                                    <button className="btn-icon text-xs transform hover:scale-110" onClick={() => handleEditClick(service)}>✏️</button>
                                                    <button className="btn-icon text-xs text-red-400 transform hover:scale-110" onClick={() => handleDelete(service.id)}>🗑️</button>
                                                </div>
                                            </div>
                                            {service.requiresMedical && (
                                                <span className="badge-medical mt-1">Medical</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .service-manager {
                    padding-bottom: 2rem;
                }
                .text-muted { color: rgba(255,255,255,0.6); }
                .text-accent { color: var(--color-accent); }
                
                .edit-modal {
                    background: var(--color-surface);
                    border: 1px solid var(--color-accent);
                    padding: 1.5rem;
                    border-radius: 8px;
                    margin-bottom: 2rem;
                    animation: slideDown 0.3s ease-out;
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .category-section {
                    margin-bottom: 2rem;
                }
                .category-title {
                    color: var(--color-accent);
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    padding-bottom: 0.5rem;
                    margin-bottom: 1rem;
                    font-size: 1.1rem;
                    font-weight: 300;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }
                
                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 1rem;
                }
                
                .service-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    padding: 1rem;
                    border-radius: 8px;
                    position: relative;
                    transition: all 0.2s;
                }
                .service-card:hover {
                    background: rgba(255,255,255,0.06);
                    border-color: rgba(255,255,255,0.1);
                    transform: translateY(-2px);
                }
                
                .badge-medical {
                    font-size: 0.6rem;
                    background: rgba(239, 68, 68, 0.2);
                    color: #fca5a5;
                    padding: 2px 6px;
                    border-radius: 3px;
                    display: inline-block;
                    border: 1px solid rgba(239, 68, 68, 0.3);
                }
                
                .btn-icon {
                    background: none;
                    border: none;
                    cursor: pointer;
                    opacity: 0.7;
                    transition: opacity 0.2s;
                }
                .btn-icon:hover { opacity: 1; }
                
                .btn-xs-primary {
                    background: var(--color-accent);
                    color: black;
                    border: none;
                    padding: 0.2rem 0.6rem;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    cursor: pointer;
                    font-weight: 600;
                }
                .btn-xs-outline {
                    background: transparent;
                    color: white;
                    border: 1px solid rgba(255,255,255,0.3);
                    padding: 0.2rem 0.6rem;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    cursor: pointer;
                }
                
                .input {
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.2);
                    color: white;
                    padding: 0.5rem;
                    border-radius: 4px;
                    width: 100%;
                    font-size: 0.9rem;
                }
                .input:focus {
                    outline: none;
                    border-color: var(--color-accent);
                }

                .grid-2 { display: grid; grid-template-columns: 1fr 1fr; }
                .gap-4 { gap: 1rem; }
                .gap-2 { gap: 0.5rem; }
                .flex { display: flex; }
                .items-center { align-items: center; }
                .flex-between { display: flex; justify-content: space-between; align-items: center; }
                .mt-2 { margin-top: 0.5rem; }
                .mt-4 { margin-top: 1rem; }
                .mb-2 { margin-bottom: 0.5rem; }
                .mb-4 { margin-bottom: 1rem; }
                .mb-6 { margin-bottom: 1.5rem; }
                .w-full { width: 100%; }
                .text-sm { font-size: 0.875rem; }
                .text-xs { font-size: 0.75rem; }
            `}</style>
        </div>
    );
};

export default ServiceMenuManager;
