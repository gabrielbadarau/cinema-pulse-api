import { movieDBClient } from '../config/movieDBClient';

export const getMovies = async (searchQuery: string) => {
  try {
    return await movieDBClient.searchMovie({ query: searchQuery });
  } catch (error) {
    throw new Error('Error fetching movies');
  }
};

export const getMovieById = async (id: number) => {
  try {
    return await movieDBClient.movieInfo({ id: id });
  } catch (error) {
    throw new Error('Error fetching movie');
  }
};
