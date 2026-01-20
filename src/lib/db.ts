import { env } from '$env/dynamic/private';
import { MongoClient } from 'mongodb';

const client = new MongoClient(env.MONGODB_CONNECTION_STRING);
export const db = client.db();

export async function connect() {
  await client.connect();
}

// disconnect from the database
// export async function disconnect() {
//   await client.close();
// }
