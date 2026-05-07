import React from 'react';
import { Link } from 'react-router-dom';
// N'oublie pas d'ajouter MapPin et Mail dans les imports !
import { Linkedin, Facebook, Instagram, MapPin, Mail } from 'lucide-react'; 
import { COMPANY_NAME, COMPANY_ADDRESS, CONTACT_EMAIL, GOOGLE_MAPS_URL } from '../../constants';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-[5vh] px-[5%]">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* On divise le footer en DEUX moitiés sur grand écran */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          
          {/* =========================================
              PREMIÈRE MOITIÉ : Logo, Texte & API Map 
             ========================================= */}
          <div className="space-y-6">
            
            {/* Le Logo réparé et aligné avec le nom */}
            <div className="flex items-center space-x-3">
              <img src="/assets/Logo A2S.png" alt="Logo A2S" className="w-16 h-16 object-contain" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {COMPANY_NAME}
              </h3>
            </div>
            
            <p className="text-gray-400 leading-relaxed max-w-md">
              L'excellence au service de l'innovation. Une équipe d'étudiants de l'INPT dédiée à vos projets.
            </p>


          </div>

          {/* =========================================
              DEUXIÈME MOITIÉ : Liens & Contacts 
             ========================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
            
            {/* Navigation */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-400">Navigation</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="/#accueil" className="hover:text-white transition-colors">Accueil</a></li>
                <li><a href="/#apropos" className="hover:text-white transition-colors">À Propos</a></li>
                <li><a href="/#services" className="hover:text-white transition-colors">Services</a></li>
                <li><Link to="/events" className="hover:text-white transition-colors">Événements</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Infos de Contact & Réseaux */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-400">Contact</h4>
              
              <div className="space-y-4 text-gray-400">
                <div className="flex items-start gap-3">
                  <MapPin className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                  <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">{COMPANY_ADDRESS}</a>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm hover:text-white transition-colors">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              {/* Réseaux Sociaux re-stylisés */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold mb-4 text-gray-500 uppercase tracking-wider">Suivez-nous</h4>
                <div className="flex space-x-3">
                  <a href="https://www.linkedin.com/company/a2s-junior-entreprise/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 hover:text-white transition-all">
                    <Linkedin size={18} />
                  </a>
                  <a href="https://www.facebook.com/a2sje" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 hover:text-white transition-all">
                    <Facebook size={18} />
                  </a>
                  <a href="https://www.instagram.com/a2s_junior_entreprise" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 hover:text-white transition-all">
                    <Instagram size={18} />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p className="text-sm">
            © {new Date().getFullYear()} {COMPANY_NAME}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}