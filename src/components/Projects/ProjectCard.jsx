import React, { useRef } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import useOnScreen from '../../hooks/useOnScreen';

export default function ProjectCard({ image = '', title = '', category = '', date = '', description = '', link = '', serviceId = '', className = '' }) {
    const ref = useRef(null);
    const isVisible = useOnScreen(ref);

    const cardContent = (
        <>
            {/* Card Image */}
            <div className="card-image-wrapper">
                <img
                    src={image}
                    alt={title}
                    className="card-image"
                />
                    <div className="card-badge" style={{ background: 'linear-gradient(to right, #1e54c6, #1642a8)', color: 'white' }}>
                        {serviceId ? (
                            <Link to={`/services/${serviceId}`} className="hover:underline" onClick={e => e.stopPropagation()}>
                                {category}
                            </Link>
                        ) : category}
                </div>
            </div>

            {/* Card Content */}
            <div className="card-content">
                <div className="card-date">
                    <Calendar size={12} className="mr-1" />
                    {date}
                </div>

                <h3 className="card-title">
                    {title}
                </h3>

                <p className="card-desc">
                    {description}
                </p>

                <div className="card-footer">
                    <span className="read-case-study">
                        Plus d'informations
                    </span>
                    <span className="card-arrow">
                        <ArrowRight size={18} />
                    </span>
                </div>
            </div>
        </>
    );

    return (
        <Link
            to={link || '#'}
            ref={ref}
            className={`project-card group animate-on-scroll ${isVisible ? 'is-visible' : ''} ${className}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
            {cardContent}
        </Link>
    );
}