import dotenv from 'dotenv';
import { MovieDb } from 'moviedb-promise';

dotenv.config();

export const movieDBClient = new MovieDb(process.env.TMDB_API_KEY as string);
