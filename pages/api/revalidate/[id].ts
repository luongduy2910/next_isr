// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated : boolean
}

type Msg = {
  message : string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Msg>
) {
  console.log('Revalidating detail page...');
  if(req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({message : 'Invalid secret'})
  }
  let revalidated = false
  const {query : { id }} = req
  try {
    await res.revalidate(`/notes/${id}`)
    revalidated = true
  } catch (error) {
    console.log(error);
    
  }
  res.json({
    revalidated
  })
  
}
