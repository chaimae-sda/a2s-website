import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { User, BookOpen, Code, Heart, Clock, Award } from 'lucide-react';

// Replace with your Google Apps Script deployment URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz3sFgjs_oXI7DtjPbl4gOGG9otReXk-wZrjPC4JHmj1BHMEhCYPETraZ9EHP99jjur6w/exec';

const initialFormData = {
  formulaire: 'join_us',
  nom: '',
  email: '',
  telephone: '',
  dateNaissance: '',
  genre: '',
  filiere: '',
  semestre: '',
  experienceLevel: '',
  competences: [],
  langues: [],
  tempsDisponible: '',
  motivation: '',
  projetsPrecedents: '',
  notes: '',
};

const competencesOptions = [
  'HTML/CSS',
  'JavaScript',
  'React',
  'Python',
  'Java',
  'C/C++',
  'Bases de Données',
  'DevOps',
  'Mobile (iOS/Android)',
  'UI/UX Design',
  'Gestion de Projet'
];

const languesOptions = ['Français', 'Anglais', 'Arabe', 'Amazigh', 'Autre'];

export default function JoinUs() {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((s) => s !== value)
        : [...prev[type], value],
    }));
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setAcceptTerms(false);
    setStatus('idle');
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      setStatus('error');
      setErrorMsg('Veuillez accepter les termes et conditions.');
      return;
    }
    
    setStatus('sending');
    setErrorMsg('');

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(formData),
      });
      
      setStatus('success');
      setFormData(initialFormData);
      setAcceptTerms(false);
    } catch (error) {
      setStatus('error');
      setErrorMsg(error.message || 'Une erreur est survenue lors de l\'envoi du formulaire.');
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingTop: '6rem', paddingBottom: '4rem' }}>
      {/* Header Section */}
      <div style={{ background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)', color: 'white', padding: '3rem 1rem' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Rejoins A2S</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.95 }}>
            Rejoins une équipe d'excellence composée d'étudiants passionnés de l'INPT. Transforme tes compétences en impact réel.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="container" style={{ maxWidth: '900px', marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
        <div style={{
          background: 'white',
          borderRadius: '1.5rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          padding: '3rem',
          marginBottom: '2rem'
        }}>
          <form onSubmit={handleSubmit}>

            {/* ===== SECTION 1: INFORMATIONS PERSONNELLES ===== */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <User size={24} style={{ color: '#1e40af' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e3a8a', margin: 0 }}>Informations Personnelles</h2>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>
                    Nom Complet *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.2s',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1e40af'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre.email@inpt.ac.ma"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.2s',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1e40af'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    placeholder="+212 6XXXXXXXX"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.2s',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1e40af'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>
                    Date de Naissance *
                  </label>
                  <input
                    type="date"
                    name="dateNaissance"
                    value={formData.dateNaissance}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.2s',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1e40af'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>
                    Genre *
                  </label>
                  <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1e40af'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  >
                    <option value="">Sélectionner</option>
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>


              </div>
            </div>

            <hr style={{ borderColor: '#e2e8f0', margin: '2rem 0' }} />

            {/* ===== SECTION 2: INFORMATIONS ACADÉMIQUES ===== */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <BookOpen size={24} style={{ color: '#1e40af' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e3a8a', margin: 0 }}>Informations Académiques</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>
                    Filière *
                  </label>
                  <select
                    name="filiere"
                    value={formData.filiere}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1e40af'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  >
                    <option value="">Sélectionner</option>
                    <option value="Confiance Numérique">Ingénieur Confiance Numérique</option>
                    <option value="Cloud et IoT">Ingénieur Cloud et IoT</option>
                    <option value="Smart ICT">Ingénieur Smart Information and Communication Technology</option>
                    <option value="Services Numériques">Ingénieur Développement des Services Numériques</option>
                    <option value="Innovation et AMOA">Ingénieur Innovation et AMOA</option>
                    <option value="Data Engineer">Data Engineer</option>
                    <option value="Systèmes Services Numériques">Ingénieur des Systèmes Services Numériques</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>
                    Année *
                  </label>
                  <select
                    name="semestre"
                    value={formData.semestre}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1e40af'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  >
                    <option value="">Sélectionner</option>
                    <option value="INE1">INE1</option>
                    <option value="INE2">INE2</option>
                    <option value="INE3">INE3</option>
                    <option value="Master">Master 1ère année</option>
                    <option value="Master">Master 2ème année</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>
                    Niveau d'Expérience *
                  </label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1e40af'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  >
                    <option value="">Sélectionner</option>
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Avancé">Avancé</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: '#e2e8f0', margin: '2rem 0' }} />

            {/* ===== SECTION 3: COMPÉTENCES ===== */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Code size={24} style={{ color: '#1e40af' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e3a8a', margin: 0 }}>Compétences Techniques</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                {competencesOptions.map((skill) => (
                  <label
                    key={skill}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      backgroundColor: formData.competences.includes(skill) ? '#eff6ff' : 'white',
                      borderColor: formData.competences.includes(skill) ? '#1e40af' : '#e2e8f0'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.competences.includes(skill)}
                      onChange={() => handleCheckbox('competences', skill)}
                      style={{ cursor: 'pointer', width: '18px', height: '18px', accentColor: '#1e40af' }}
                    />
                    <span style={{ fontSize: '0.95rem', fontWeight: '500', color: '#334155' }}>{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr style={{ borderColor: '#e2e8f0', margin: '2rem 0' }} />

            {/* ===== SECTION 4: AUTRES INFORMATIONS ===== */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Heart size={24} style={{ color: '#1e40af' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e3a8a', margin: 0 }}>Autres Informations</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>
                    Langues Parlées *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {languesOptions.map((langue) => (
                      <label key={langue} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={formData.langues.includes(langue)}
                          onChange={() => handleCheckbox('langues', langue)}
                          style={{ cursor: 'pointer', accentColor: '#1e40af' }}
                        />
                        <span style={{ fontSize: '0.9rem', color: '#334155' }}>{langue}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>
                    Temps Disponible par Semaine *
                  </label>
                  <select
                    name="tempsDisponible"
                    value={formData.tempsDisponible}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1e40af'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  >
                    <option value="">Sélectionner</option>
                    <option value="5-10h">5-10 heures</option>
                    <option value="10-15h">10-15 heures</option>
                    <option value="15-20h">15-20 heures</option>
                    <option value="20h+">20+ heures</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>
                  Qu'est-ce qui t'attire chez A2S ?
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  placeholder="Partage ta motivation et tes aspirations..."
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1e40af'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>
                  Projets Précédents (optionnel)
                </label>
                <textarea
                  name="projetsPrecedents"
                  value={formData.projetsPrecedents}
                  onChange={handleChange}
                  placeholder="Décris tes projets antérieurs ou ton portfolio..."
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1e40af'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>
                  Notes Supplémentaires (optionnel)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Ajoute toute information complémentaire..."
                  rows="2"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    transition: 'all 0.2s',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1e40af'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
            </div>

            <hr style={{ borderColor: '#e2e8f0', margin: '2rem 0' }} />

            {/* ===== STATUS MESSAGES ===== */}
            {status === 'success' && (
              <div style={{
                backgroundColor: '#d1fae5',
                border: '2px solid #6ee7b7',
                color: '#065f46',
                padding: '1rem 1.5rem',
                borderRadius: '0.75rem',
                marginBottom: '1.5rem',
                fontWeight: '500'
              }}>
                ✓ Votre inscription a été envoyée avec succès ! Bienvenue dans l'aventure A2S.
              </div>
            )}
            {status === 'error' && (
              <div style={{
                backgroundColor: '#fee2e2',
                border: '2px solid #fca5a5',
                color: '#7f1d1d',
                padding: '1rem 1.5rem',
                borderRadius: '0.75rem',
                marginBottom: '1.5rem',
                fontWeight: '500'
              }}>
                ✗ Erreur : {errorMsg}
              </div>
            )}

            {/* ===== TERMS AND BUTTONS ===== */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  style={{ marginTop: '0.25rem', cursor: 'pointer', accentColor: '#1e40af', width: '18px', height: '18px' }}
                />
                <span style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.5' }}>
                  J'accepte les{' '}
                  <a href="#" style={{ color: '#1e40af', fontWeight: '600', textDecoration: 'none' }}>
                    termes et conditions
                  </a>{' '}
                  et les politiques de confidentialité d'A2S. *
                </span>
              </label>
            </div>

            {/* BUTTONS */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  padding: '0.75rem 2rem',
                  border: '2px solid #cbd5e1',
                  backgroundColor: 'white',
                  color: '#475569',
                  fontSize: '1rem',
                  fontWeight: '600',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontSize: '0.9rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f1f5f9';
                  e.target.style.borderColor = '#94a3b8';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.borderColor = '#cbd5e1';
                }}
              >
                Réinitialiser
              </button>

              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  padding: '0.75rem 2.5rem',
                  background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '0.75rem',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontSize: '0.9rem',
                  opacity: status === 'sending' ? 0.7 : 1,
                  boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (status !== 'sending') {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(30, 64, 175, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(30, 64, 175, 0.3)';
                }}
              >
                {status === 'sending' ? 'Envoi en cours...' : 'Rejoindre A2S'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}