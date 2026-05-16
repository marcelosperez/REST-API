const express = require('express');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

let courses = [
  { id: 1, title: 'Node.js Basics', description: 'Learn the core Node.js runtime and modules.' },
  { id: 2, title: 'Express Fundamentals', description: 'Build web servers and REST APIs with Express.' },
];

let nextId = 3;

server.get('/courses', (req, res) => {
  return res.json(courses);
});

server.get('/courses/:id', (req, res) => {
  const id = Number(req.params.id);
  const course = courses.find((item) => item.id === id);

  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  return res.json(course);
});

server.post('/courses', (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: 'Both title and description are required',
    });
  }

  const newCourse = {
    id: nextId,
    title,
    description,
  };

  courses.push(newCourse);
  nextId += 1;

  return res.status(201).json(newCourse);
});

server.put('/courses/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title, description } = req.body;
  const courseIndex = courses.findIndex((item) => item.id === id);

  if (courseIndex === -1) {
    return res.status(404).json({ message: 'Course not found' });
  }

  if (!title || !description) {
    return res.status(400).json({
      message: 'Both title and description are required',
    });
  }

  const updatedCourse = {
    id,
    title,
    description,
  };

  courses[courseIndex] = updatedCourse;

  return res.json(updatedCourse);
});

server.delete('/courses/:id', (req, res) => {
  const id = Number(req.params.id);
  const courseIndex = courses.findIndex((item) => item.id === id);

  if (courseIndex === -1) {
    return res.status(404).json({ message: 'Course not found' });
  }

  const deletedCourse = courses[courseIndex];
  courses.splice(courseIndex, 1);

  return res.json({
    message: 'Course deleted successfully',
    course: deletedCourse,
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
