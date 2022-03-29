import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';

type Data = {
  name: string;
};

const ocr = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // Check if req is POST request
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  // req data

  // console.log(...Object.keys(binaryString));
  // console.log(...Object.values(binaryString));
  // const binaryData = Object.keys(binaryString).join();

  const { data } = await axios.post(
    'http://api.marketsurf.io:6000/ocr',
    req.body,
  );

  console.log(data);

  res.status(200).send(data);
  // try {
  //   const fileData = await fs.readFile(url);

  //   const { data } = await axios.post('http://localhost:5000/ocr', {
  //     file: fileData,
  //   });
  //   res.status(200).json(data);
  // } catch (error) {
  //   res.status(500).json({ error });
  // }
  // res.status(200).json({ name: 'John Doe' });
};

export default ocr;
