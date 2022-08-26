import type { NextApiRequest, NextApiResponse } from 'next'
import { env } from '../../../env/server.mjs'

export default function handler (req: NextApiRequest, res: NextApiResponse) {
  const returnTo = encodeURI(env.NEXTAUTH_URL)
  res.redirect(
    `${env.AUTH0_ISSUER}/v2/logout?federated&returnTo=${returnTo}&client_id=${env.AUTH0_CLIENT_ID}`
  )
}
