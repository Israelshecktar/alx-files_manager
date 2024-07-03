import express from 'express';
import routes from './routes/index';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Add this line to parse JSON bodies
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
