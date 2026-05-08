import axios from 'axios';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Hook pour récupérer tous les projets
export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/projects`);
        setProjects(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};

// Hook pour récupérer un projet par slug
export const useProjectBySlug = (slug) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchProject = async () => {
      try {
        const response = await axios.get(`${API_URL}/projects/${slug}`);
        setProject(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  return { project, loading, error };
};

// Hook pour récupérer l'équipe
export const useTeam = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`${API_URL}/team`);
        setTeam(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return { team, loading, error };
};

// Hook pour récupérer les services
export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_URL}/services`);
        setServices(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};

// Hook pour récupérer un service
export const useServiceById = (id) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchService = async () => {
      try {
        const response = await axios.get(`${API_URL}/services/${id}`);
        setService(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  return { service, loading, error };
};

// Hook pour récupérer les événements
export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/events`);
        setEvents(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};

// Fonction pour créer un projet
export const createProject = async (projectData) => {
  try {
    const response = await axios.post(`${API_URL}/projects`, projectData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fonction pour mettre à jour un projet
export const updateProject = async (id, projectData) => {
  try {
    const response = await axios.put(`${API_URL}/projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fonction pour supprimer un projet
export const deleteProject = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/projects/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fonctions similaires pour team, services, events...
export const createTeamMember = async (memberData) => {
  try {
    const response = await axios.post(`${API_URL}/team`, memberData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTeamMember = async (id, memberData) => {
  try {
    const response = await axios.put(`${API_URL}/team/${id}`, memberData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTeamMember = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/team/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
