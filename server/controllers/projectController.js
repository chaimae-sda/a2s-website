import pool from '../config/database.js';

// Get all projects with technologies
export const getAllProjects = async (req, res) => {
  try {
    const [projects] = await pool.query('SELECT * FROM projects');

    const projectsWithTechs = await Promise.all(
      projects.map(async (project) => {
        const [technologies] = await pool.query(
          'SELECT technology FROM project_technologies WHERE project_id = ?',
          [project.id]
        );
        return {
          ...project,
          technologies: technologies.map(t => t.technology)
        };
      })
    );

    res.json(projectsWithTechs);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

// Get project by slug
export const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const [projects] = await pool.query('SELECT * FROM projects WHERE slug = ?', [slug]);

    if (projects.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const project = projects[0];
    const [technologies] = await pool.query(
      'SELECT technology FROM project_technologies WHERE project_id = ?',
      [project.id]
    );

    res.json({
      ...project,
      technologies: technologies.map(t => t.technology)
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

// Create project
export const createProject = async (req, res) => {
  try {
    const { slug, title, category, service_id, date, description, fullDescription, image, technologies } = req.body;

    const [result] = await pool.query(
      'INSERT INTO projects (slug, title, category, service_id, date, description, fullDescription, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [slug, title, category, service_id, date, description, fullDescription, image]
    );

    if (technologies && technologies.length > 0) {
      for (const tech of technologies) {
        await pool.query(
          'INSERT INTO project_technologies (project_id, technology) VALUES (?, ?)',
          [result.insertId, tech]
        );
      }
    }

    res.status(201).json({ id: result.insertId, message: 'Project created successfully' });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { slug, title, category, service_id, date, description, fullDescription, image, technologies } = req.body;

    await pool.query(
      'UPDATE projects SET slug = ?, title = ?, category = ?, service_id = ?, date = ?, description = ?, fullDescription = ?, image = ? WHERE id = ?',
      [slug, title, category, service_id, date, description, fullDescription, image, id]
    );

    if (technologies) {
      await pool.query('DELETE FROM project_technologies WHERE project_id = ?', [id]);
      for (const tech of technologies) {
        await pool.query(
          'INSERT INTO project_technologies (project_id, technology) VALUES (?, ?)',
          [id, tech]
        );
      }
    }

    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM projects WHERE id = ?', [id]);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
};
