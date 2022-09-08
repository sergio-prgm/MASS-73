import NextAuth, { type NextAuthOptions } from 'next-auth'

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../../server/db/client'
import { env } from '../../../env/server.mjs'
import Auth0Provider from 'next-auth/providers/auth0'

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session ({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
    async redirect ({ url, baseUrl }) {
      return '/dashboard'
    }
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: env.AUTH0_CLIENT_ID,
      clientSecret: env.AUTH0_CLIENT_SECRET,
      issuer: env.AUTH0_ISSUER
    })
  ]
}

export default NextAuth(authOptions)
