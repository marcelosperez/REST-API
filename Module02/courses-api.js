const express = require('express');
const mysql = require('mysql2/promise');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const dbConfig = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '0909',
};

const databaseName = 'rest_api_db';

async function ensureDatabase() {
  const adminPool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  try {
    await adminPool.query(
      `CREATE DATABASE IF NOT EXISTS ${databaseName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
  } finally {
    await adminPool.end();
  }
}

async function ensureSchema(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS courses (
      id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      PRIMARY KEY (id)
    )
  `);
}

async function createAppPool() {
  return mysql.createPool({
    ...dbConfig,
    database: databaseName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

let pool;

server.get('/courses', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, title, description FROM courses ORDER BY id'
    );

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch courses',
      error: error.message,
    });
  }
});

server.get('/courses/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid course id' });
    }

    const [rows] = await pool.query(
      'SELECT id, title, description FROM courses WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch course',
      error: error.message,
    });
  }
});

server.post('/courses', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: 'Both title and description are required',
      });
    }

    const [result] = await pool.query(
      'INSERT INTO courses (title, description) VALUES (?, ?)',
      [title, description]
    );

    return res.status(201).json({
      id: result.insertId,
      title,
      description,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to create course',
      error: error.message,
    });
  }
});

server.put('/courses/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, description } = req.body;

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid course id' });
    }

    if (!title || !description) {
      return res.status(400).json({
        message: 'Both title and description are required',
      });
    }

    const [result] = await pool.query(
      'UPDATE courses SET title = ?, description = ? WHERE id = ?',
      [title, description, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    return res.json({
      id,
      title,
      description,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to update course',
      error: error.message,
    });
  }
});

server.delete('/courses/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid course id' });
    }

    const [existingRows] = await pool.query(
      'SELECT id, title, description FROM courses WHERE id = ?',
      [id]
    );

    if (existingRows.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await pool.query('DELETE FROM courses WHERE id = ?', [id]);

    return res.json({
      message: 'Course deleted successfully',
      course: existingRows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to delete course',
      error: error.message,
    });
  }
});

async function startServer() {
  try {
    await ensureDatabase();
    pool = await createAppPool();
    await ensureSchema(pool);

    server.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
