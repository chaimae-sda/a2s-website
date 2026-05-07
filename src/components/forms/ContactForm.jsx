import React, { useState } from 'react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzAbVhk-tAc6k2w4QWmh_BQxVMZYDe1gTygvX88eCSVw2JI-KtP16lVDowGXQiL9Nzm/exec';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          formulaire: 'contact',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMsg(error.message || 'Une erreur est survenue.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <h3 className="text-3xl font-bold text-gray-900 mb-6">Contactez-nous</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
          <input 
            type="text" 
            id="name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+212 6XXXXXXXX"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
          <textarea 
            id="message" 
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
          ></textarea>
        </div>
        <button 
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Envoi en cours...' : 'Envoyer'}
        </button>
        {status === 'success' && (
          <p className="text-green-600 text-sm font-medium text-center">
            Votre message a été envoyé avec succès !
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-sm font-medium text-center">
            Erreur : {errorMsg}
          </p>
        )}
      </form>
    </div>
  );
}