import { movieDBClient } from '../config/movieDBClient';

export const getTVShows = async (searchQuery: string) => {
  try {
    return await movieDBClient.searchTv({ query: searchQuery });
  } catch (error) {
    throw new Error('Error fetching TV Shows');
  }
};

export const getTVShowById = async (id: number) => {
  try {
    return await movieDBClient.tvInfo({ id: id });
  } catch (error) {
    throw new Error('Error fetching TV Show');
  }
};
