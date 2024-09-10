import express from 'express';
import dotenv from 'dotenv';

import movieRoute from './routes/movie.routes';
import tvshowRoute from './routes/tvshow.routes';

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use('/api/movies', movieRoute);
app.use('/api/tvshows', tvshowRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
