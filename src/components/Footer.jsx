import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_NAME, COMPANY_ADDRESS } from '../constants';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Info Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {COMPANY_NAME}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              L'excellence au service de l'innovation. Une équipe d'étudiants de l'INPT dédiée à vos projets.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Navigation</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/#accueil" className="hover:text-white transition-colors">Accueil</a></li>
              <li><a href="/#apropos" className="hover:text-white transition-colors">À Propos</a></li>
              <li><a href="/#services" className="hover:text-white transition-colors">Services</a></li>
              <li><Link to="/events" className="hover:text-white transition-colors">Événements</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Contact</h4>
            <p className="text-gray-400 italic">{COMPANY_ADDRESS}</p>
            <p className="text-gray-400 mt-2"> <a href="mailto:contact@a2s.ma" className="text-blue-400 hover:text-blue-300 transition-colors">contact@a2s.ma</a></p>

          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-white-500">
          <p className="text-sm">
            © {new Date().getFullYear()} {COMPANY_NAME}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}