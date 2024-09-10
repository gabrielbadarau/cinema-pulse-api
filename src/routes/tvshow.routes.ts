import { Router } from 'express';

import { getAllTVShows, getTVShow } from '../controllers/tvshow.controller';

const router = Router();

router.get('/', getAllTVShows);
router.get('/:id', getTVShow);

export default router;
