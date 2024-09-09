import { Request, Response } from 'express';

import { getMovies } from '../services/movie.service';

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await getMovies();

    return res.json({ data: movies });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch movies' });
  }
};
