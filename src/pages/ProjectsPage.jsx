import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/projects/ProjectCard';
import { services } from '../data/services';
import { allProjects } from '../data/projects';
import '../styles/Projects.css';


export default function ProjectsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [filteredProjects, setFilteredProjects] = useState(allProjects);

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Filter + Search Logic
    useEffect(() => {
        let results = allProjects;
        if (activeFilter !== 'all') {
            results = results.filter(p => p.serviceId === activeFilter);
        }
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            results = results.filter(p =>
                p.title.toLowerCase().includes(term) ||
                p.category.toLowerCase().includes(term)
            );
        }
        setFilteredProjects(results);
    }, [searchTerm, activeFilter]);

    return (
        <div className="projects-page">
            <div className="pt-20 md:pt-24"></div>
            {/* Main Section: Only filtered projects */}
            <section className="projects-container">
                <div className="projects-header-section">
                    <div className="w-full text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Nos Derniers Projets
                        </h1>
                        <p className="text-gray-600 text-lg mb-10">
                            Bienvenue chez Actions, Services et Solutions. Ici, l'élite étudiante de l'INPT transforme la théorie en produits technologiques complets. Explorez nos réalisations récentes.
                        </p>
                    </div>
                </div>

                {/* Service Filter Buttons */}
                <div className="flex flex-wrap gap-3 mb-10">
                    <button
                        onClick={() => setActiveFilter('all')}
                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                            activeFilter === 'all'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-white text-gray-500 border border-gray-200 hover:border-blue-600 hover:text-blue-600'
                        }`}
                    >
                        Tous
                    </button>
                    {services.map(service => (
                        <button
                            key={service.id}
                            onClick={() => setActiveFilter(service.id)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                                activeFilter === service.id
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-white text-gray-500 border border-gray-200 hover:border-blue-600 hover:text-blue-600'
                            }`}
                        >
                            {service.title}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="flex items-center bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm mb-8 max-w-md">
                    <Search size={18} className="text-slate-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Rechercher un projet..."
                        className="bg-transparent outline-none text-sm text-slate-600 w-full border-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Projects Grid: only filtered */}
                <div className="projects-grid">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.slug}
                            {...project}
                            link={`/projects/${project.slug}`}
                            className={`delay-${(index % 3) * 100 + 100}`}
                        />
                    ))}
                    {/* CTA Card */}
                    <div className="start-project-card">
                        <div className="plus-icon-circle">
                            +
                        </div>
                        <h3 className="start-title">Lancez Votre Projet</h3>
                        <p className="start-desc">Vous avez une idée ? Construisons quelque chose d'incroyable ensemble.</p>
                        <Link to="/contact" className="get-in-touch-btn">
                            Contactez-nous
                        </Link>
                    </div>
                </div>
                {filteredProjects.length === 0 && (
                    <p className="text-slate-400 text-center py-12 text-lg">Cette page va être disponible bientôt.</p>
                )}
            </section>
        </div>
    );
}