// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql';
import { google } from 'googleapis'
import  fs  from 'fs'
import path from 'path';

type Data = {
    fileMetadata: string
  }
const CLIENT_ID = '330352992676-68hts0djql79gp1qar6u01vbo8p10od9.apps.googleusercontent.com';
const CLIENT_SCRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04Nl9MpGvK6vsCgYIARAAGAQSNwF-L9IrFK1dte-yY_RgqIy8VuH6XE8AzjB3qomeXSX0tor8SdAzl8KjyvugZ4H_Dgl7JcGDYYw'

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SCRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const driveService = google.drive({
    version: 'v3',
    auth: oauth2Client
})

export default async function handler(
    fileMetadata:any,
    res: NextApiResponse
) {
    const filePath = path.join(__dirname, 'testMP42.mp4')

    const response = await driveService.files.create({
        requestBody: {
            name: 'testUpload.mp4',
            mimeType: 'video/mp4',
        },
        media: {
            mimeType: 'video/mp4',
            body: fs.createReadStream(filePath)
        },
        fields: "id",
      });
    console.log(response.data)
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ response })
}
