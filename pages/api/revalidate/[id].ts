// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated : boolean
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('Revalidating detail page...')
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
