import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { MovieDb } from 'moviedb-promise';

dotenv.config();

const app = express();
const port = process.env.PORT;
const moviedb = new MovieDb(process.env.TMDB_API_KEY as string)

app.get('/', async (req:Request, res:Response) => {
  res.send('Express + TypeScript Server');

  const movie = await moviedb.searchMovie({ query: 'alien' })
  console.log(movie)
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});