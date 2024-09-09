import { movieDBClient } from '../config/movieDBClient';

export const getMovies = async () => {
  try {
    return await movieDBClient.searchMovie({ query: 'alien' });
  } catch (error) {
    throw new Error('Error fetching movies');
  }
};
