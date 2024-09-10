import { Router } from 'express';

import { getAllMovies, getMovie } from '../controllers/movie.controller';

const router = Router();

router.get('/', getAllMovies);
router.get('/:id', getMovie);

export default router;
