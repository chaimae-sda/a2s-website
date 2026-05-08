import pool from '../config/database.js';

// Get all team members
export const getAllTeamMembers = async (req, res) => {
  try {
    const [members] = await pool.query('SELECT * FROM team_members ORDER BY id');
    res.json(members);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
};

// Get team member by id
export const getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const [members] = await pool.query('SELECT * FROM team_members WHERE id = ?', [id]);

    if (members.length === 0) {
      return res.status(404).json({ error: 'Team member not found' });
    }

    res.json(members[0]);
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({ error: 'Failed to fetch team member' });
  }
};

// Create team member
export const createTeamMember = async (req, res) => {
  try {
    const { name, role, image, linkedin } = req.body;

    const [result] = await pool.query(
      'INSERT INTO team_members (name, role, image, linkedin) VALUES (?, ?, ?, ?)',
      [name, role, image, linkedin]
    );

    res.status(201).json({ id: result.insertId, message: 'Team member created successfully' });
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({ error: 'Failed to create team member' });
  }
};

// Update team member
export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, image, linkedin } = req.body;

    await pool.query(
      'UPDATE team_members SET name = ?, role = ?, image = ?, linkedin = ? WHERE id = ?',
      [name, role, image, linkedin, id]
    );

    res.json({ message: 'Team member updated successfully' });
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({ error: 'Failed to update team member' });
  }
};

// Delete team member
export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM team_members WHERE id = ?', [id]);
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
};
