// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createPool, Pool} from 'mysql';
import { google } from 'googleapis'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const oauthGoogle = new google.auth.OAuth2
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ 'name': 'test' })
}
