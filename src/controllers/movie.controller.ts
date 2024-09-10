import { Request, Response } from 'express';

import { getMovies, getMovieById } from '../services/movie.service';

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.search as string;

    // Check if search query is empty or missing
    if (!searchQuery || searchQuery.trim() === '') {
      return res
        .status(400)
        .json({ error: 'Search query is required and cannot be empty' });
    }

    const data = await getMovies(searchQuery);

    return res.json({ data: data.results });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch movies' });
  }
};

export const getMovie = async (req: Request, res: Response) => {
  const id = req.params.id;
  const numericId = Number(id);

  // Validate ID parameter
  if (isNaN(numericId) || numericId <= 0) {
    return res
      .status(400)
      .json({ error: 'Valid numeric movie ID is required' });
  }

  try {
    const data = await getMovieById(numericId);

    return res.json({ data });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch movie' });
  }
};
