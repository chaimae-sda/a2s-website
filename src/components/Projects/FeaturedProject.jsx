import React, { useRef } from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import useOnScreen from '../../hooks/useOnScreen';

// CSS is imported in the parent page for simplicity, or could be here. 
// Standard practice is often to import where used, but since we have one CSS file for "Projects", it's fine.

export default function FeaturedProject({ image = '', title = '', category = '', date = '', description = '', link = '', serviceId = '' }) {
    const ref = useRef(null);
    const isVisible = useOnScreen(ref);

    return (
        <div
            ref={ref}
            className={`featured-project-card group animate-on-scroll ${isVisible ? 'is-visible' : ''}`}
        >
            <div className="featured-grid">
                {/* Image Section */}
                <div className="featured-image-wrapper">
                    <img
                        src={image}
                        alt={title}
                        className="featured-image"
                    />
                    <div className="featured-category-badge">
                        {serviceId ? (
                            <Link to={`/services/${serviceId}`} className="hover:underline">
                                {category}
                            </Link>
                        ) : category}
                    </div>
                </div>

                {/* Content Section */}
                <div className="featured-content">
                    <div className="featured-meta">
                        <span className="meta-item">
                            <Calendar size={14} className="meta-icon" />
                            {date}
                        </span>
                        <span className="meta-item">
                            <Clock size={14} className="meta-icon" />
                            Lecture 3 min
                        </span>
                    </div>

                    <h3 className="featured-title">
                        {title}
                    </h3>

                    <p className="featured-desc">
                        {description}
                    </p>

                    <div className="featured-footer">
                        <div className="author-block">
                            <div className="author-avatar bg-white flex items-center justify-center overflow-hidden border border-slate-100">
                                <img src="/assets/Logo A2S.png" alt="Author" className="object-contain w-full h-full p-0.5" />
                            </div>
                            <span className="author-name">Équipe A2S</span>
                        </div>

                        <a href={link || "#"} className="arrow-btn">
                            <ArrowRight size={20} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="featured-divider"></div>
        </div>
    );
}