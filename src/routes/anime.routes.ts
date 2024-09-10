import { Router } from 'express';

import { getAllAnimes, getAnime } from '../controllers/anime.controller';

const router = Router();

router.get('/', getAllAnimes);
router.get('/:id', getAnime);

export default router;
