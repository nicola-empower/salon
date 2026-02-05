import React, { useState } from 'react';

interface GalleryImage {
    src: string;
    category: string;
    id: string;
}

interface Props {
    images: GalleryImage[];
}

const PortfolioGallery: React.FC<Props> = ({ images }) => {
    const [filter, setFilter] = useState('all');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const categories = ['all', 'hair', 'nails', 'spa'];

    const filteredImages = filter === 'all'
        ? images
        : images.filter(img => img.category === filter);

    return (
        <div className="portfolio-gallery">
            {/* Filters */}
            <div className="filters">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn ${filter === cat ? 'active' : ''}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="gallery-grid fade-in">
                {filteredImages.map((img) => (
                    <div
                        key={img.id}
                        className="gallery-item"
                        onClick={() => setSelectedImage(img.src)}
                    >
                        <img src={img.src} alt={`${img.category} portfolio`} loading="lazy" />
                        <div className="overlay">
                            <span>View</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="lightbox" onClick={() => setSelectedImage(null)}>
                    <div className="lightbox-content">
                        <img src={selectedImage} alt="Full size" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PortfolioGallery;
