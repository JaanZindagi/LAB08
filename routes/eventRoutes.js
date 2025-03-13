import express from 'express';
import { events } from '../data.js';
import { authenticate } from '../auth.js';

const router = express.Router();

const generateId = () => Math.random().toString(36).substr(2, 9);

router.post('/events', authenticate, (req, res) => {
  const { name, description, date, time, category, reminder } = req.body;
  const event = {
    id: generateId(),
    userId: req.user.id,
    name,
    description,
    date,
    time,
    category,
    reminder,
    notified: false,
  };
  events.push(event);

  res.status(201).json({ message: 'Event created successfully.', event });
});


router.get('/events', authenticate, (req, res) => {
  const userEvents = events.filter((e) => e.userId === req.user.id);
  res.json(userEvents);
});


router.put('/events/:id/reminder', authenticate, (req, res) => {
  const eventId = req.params.id;
  const { reminder } = req.body;

  const event = events.find((e) => e.id === eventId && e.userId === req.user.id);
  if (!event) return res.status(404).json({ message: 'Event not found.' });

  event.reminder = reminder;
  res.json({ message: 'Reminder set successfully.', event });
});


router.get('/events/category/:category', authenticate, (req, res) => {
  const category = req.params.category;
  const userEvents = events.filter(
    (e) => e.userId === req.user.id && e.category === category
  );
  res.json(userEvents);
});

export default router;