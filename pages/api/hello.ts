// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Db, MongoClient } from 'mongodb';

const MONGODB_URI: any = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  res.status(200).json(await getPosts(req, res))
}


// check the MongoDB URI
if (!MONGODB_URI) {
  throw new Error('Define the MONGODB_URI environmental variable');
}

// check the MongoDB DB
if (!MONGODB_DB) {
  throw new Error('Define the MONGODB_DB environmental variable');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // set the connection options
  const opts: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Connect to cluster
  let client = new MongoClient(MONGODB_URI, opts);
  await client.connect();
  let db = client.db(MONGODB_DB);

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}

export async function getPosts(req: any, res: any) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the posts
    let posts = await db
      .collection('users')
      .find({})
      .sort({ published: -1 })
      .toArray();

    const yourCollection = db.collection("users");
    const yourData = await yourCollection.find().toArray();

    // return the posts
    return res.json({
      message: JSON.parse(JSON.stringify(yourData)),
      success: true,
    });
  } catch (error: any) {
    // return the error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}