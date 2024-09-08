import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { MovieDb } from 'moviedb-promise';
import { MALClient } from "@animelist/client";



dotenv.config();

const app = express();
const port = process.env.PORT;
const moviedb = new MovieDb(process.env.TMDB_API_KEY as string)
const mal = new MALClient({clientId:process.env.MAL_CLIENT_ID as string});

app.get('/', async (req:Request, res:Response) => {
  res.send('Express + TypeScript Server');

  const movie = await moviedb.searchMovie({ query: 'alien' })


  // const result = await mal.getAnimeList({q:'naruto'})
  // console.log(result.data[0])
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});