import dotenv from 'dotenv';
import { MALClient } from '@animelist/client';

dotenv.config();

export const malClient = new MALClient({
  clientId: process.env.MAL_CLIENT_ID as string,
});
