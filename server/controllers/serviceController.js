import pool from '../config/database.js';

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const [services] = await pool.query('SELECT * FROM services');

    const servicesWithOfferings = await Promise.all(
      services.map(async (service) => {
        const [offerings] = await pool.query(
          'SELECT offering FROM service_offerings WHERE service_id = ? ORDER BY `order`',
          [service.id]
        );
        return {
          ...service,
          offerings: offerings.map(o => o.offering)
        };
      })
    );

    res.json(servicesWithOfferings);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};

// Get service by id
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const [services] = await pool.query('SELECT * FROM services WHERE id = ?', [id]);

    if (services.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const service = services[0];
    const [offerings] = await pool.query(
      'SELECT offering FROM service_offerings WHERE service_id = ? ORDER BY `order`',
      [id]
    );

    res.json({
      ...service,
      offerings: offerings.map(o => o.offering)
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
};

// Create service
export const createService = async (req, res) => {
  try {
    const { id, title, image, description, about, whyUs, offerings } = req.body;

    await pool.query(
      'INSERT INTO services (id, title, image, description, about, whyUs) VALUES (?, ?, ?, ?, ?, ?)',
      [id, title, image, description, about, whyUs]
    );

    if (offerings && offerings.length > 0) {
      for (let i = 0; i < offerings.length; i++) {
        await pool.query(
          'INSERT INTO service_offerings (service_id, offering, `order`) VALUES (?, ?, ?)',
          [id, offerings[i], i]
        );
      }
    }

    res.status(201).json({ message: 'Service created successfully' });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, description, about, whyUs, offerings } = req.body;

    await pool.query(
      'UPDATE services SET title = ?, image = ?, description = ?, about = ?, whyUs = ? WHERE id = ?',
      [title, image, description, about, whyUs, id]
    );

    if (offerings) {
      await pool.query('DELETE FROM service_offerings WHERE service_id = ?', [id]);
      for (let i = 0; i < offerings.length; i++) {
        await pool.query(
          'INSERT INTO service_offerings (service_id, offering, `order`) VALUES (?, ?, ?)',
          [id, offerings[i], i]
        );
      }
    }

    res.json({ message: 'Service updated successfully' });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM services WHERE id = ?', [id]);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
};
