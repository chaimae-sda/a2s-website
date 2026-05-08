import pool from '../config/database.js';

// Get all upcoming events
export const getAllEvents = async (req, res) => {
  try {
    const [events] = await pool.query('SELECT * FROM upcoming_events ORDER BY date DESC');
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Get event by id
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const [events] = await pool.query('SELECT * FROM upcoming_events WHERE id = ?', [id]);

    if (events.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(events[0]);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// Create event
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, image, status } = req.body;

    const [result] = await pool.query(
      'INSERT INTO upcoming_events (title, description, date, time, location, image, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, date, time, location, image, status || 'upcoming']
    );

    res.status(201).json({ id: result.insertId, message: 'Event created successfully' });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, time, location, image, status } = req.body;

    await pool.query(
      'UPDATE upcoming_events SET title = ?, description = ?, date = ?, time = ?, location = ?, image = ?, status = ? WHERE id = ?',
      [title, description, date, time, location, image, status, id]
    );

    res.json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM upcoming_events WHERE id = ?', [id]);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
};
