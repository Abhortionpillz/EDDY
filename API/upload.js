import { put } from '@vercel/blob';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing form' });
      }

      const file = files.file[0];
      const fileData = fs.readFileSync(file.filepath);

      const blob = await put(file.originalFilename, fileData, {
        access: 'public',
      });

      res.status(200).json({ url: blob.url });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
