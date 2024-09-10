import { malClient } from '../config/malClient';

export const getAnimes = async (searchQuery: string) => {
  try {
    return await malClient.getAnimeList({ q: searchQuery });
  } catch (error) {
    throw new Error('Error fetching animes');
  }
};

export const getAnimeById = async (id: number) => {
  try {
    return await malClient.getAnimeDetails(id);
  } catch (error) {
    throw new Error('Error fetching anime');
  }
};
