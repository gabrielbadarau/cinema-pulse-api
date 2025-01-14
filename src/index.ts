import express from 'express';
import dotenv from 'dotenv';

import movieRoute from './routes/movie.routes';
import tvshowRoute from './routes/tvshow.routes';
import animeRoute from './routes/anime.routes';
import authRoute from './routes/auth.routes';
import { applyJsonMiddleware } from './middlewares/json.middleware';
import { authenticate } from './middlewares/auth.middleware';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

applyJsonMiddleware(app);

app.use('/api/movies', authenticate, movieRoute);
app.use('/api/tvshows', authenticate, tvshowRoute);
app.use('/api/animes', authenticate, animeRoute);
app.use('/api/auth', authRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
