// lib/mongodb.ts
import { MongoClient, Db } from 'mongodb'; // Import Db type as well

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

// Declare a global variable for MongoClient in development to prevent multiple connections
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the client is not recreated on every HMR update
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient object. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

// Optional: You might also want a helper function to get the database instance
export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  // Replace 'MUSBAHDEV_user' with your actual database name in MongoDB
  return client.db('MICRODOCS_DB');
}

