import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import { events } from './data.js';

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.use('/api', userRoutes);
app.use('/api', eventRoutes);


setInterval(() => {
  const now = new Date();
  events.forEach((event) => {
    const eventTime = new Date(`${event.date}T${event.time}`);
    const timeDiff = eventTime - now;

    if (timeDiff > 0 && timeDiff <= 60000 && !event.notified) {
      console.log(`Reminder: ${event.name} is scheduled at ${event.time}`);
      event.notified = true;
    }
  });
}, 60000); 


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});