import { Request, Response } from 'express';

import { getTVShows, getTVShowById } from '../services/tvshow.service';

export const getAllTVShows = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.search as string;

    // Check if search query is empty or missing
    if (!searchQuery || searchQuery.trim() === '') {
      return res
        .status(400)
        .json({ error: 'Search query is required and cannot be empty' });
    }

    const movies = await getTVShows(searchQuery);

    return res.json({ data: movies });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch TV Shows' });
  }
};

export const getTVShow = async (req: Request, res: Response) => {
  const id = req.params.id;
  const numericId = Number(id);

  // Validate ID parameter
  if (isNaN(numericId) || numericId <= 0) {
    return res
      .status(400)
      .json({ error: 'Valid numeric TV Show ID is required' });
  }

  try {
    const movie = await getTVShowById(numericId);
    if (!movie) {
      return res.status(404).json({ error: 'TV Show not found' });
    }
    return res.json({ data: movie });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch TV Show' });
  }
};
