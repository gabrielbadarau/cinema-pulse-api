import { Router } from 'express';

import { getAllMovies } from '../controllers/movie.controller';

const router = Router();

router.get('/', getAllMovies);

export default router;
