import { prisma } from '../db/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createRouter } from './context'

export const exerciseRouter = createRouter()
  .query('all', {
    async resolve ({ ctx }) {
      const userId = ctx.session?.user?.id
      const exercises = await prisma.exercise
        .findMany({
          where: { userId }
        })
      return exercises.map(exercise => {
        if (exercise.updatedAt.toLocaleString() === exercise.createdAt.toLocaleString()) {
          exercise.updatedAt = new Date(0)
          return exercise
        } else return exercise
      })
    }
  })
  .query('byId', {
    input: z.object({ id: z.string() }),
    async resolve ({ input }) {
      const { id } = input
      const exercise = await prisma.exercise.findUnique({
        where: { id }
      })
      if (!exercise) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No exercise with Id ${id}`
        })
      }
      return exercise
    }
  })
  .mutation('createExercise', {
    input: z.object({
      name: z.string(),
      tonic: z.string(),
      description: z.string()
    }),
    async resolve ({ input, ctx }) {
      const userId = ctx.session?.user?.id
      if (!userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Must be logged in to perform this operation'
        })
      }
      const res = await prisma.exercise.create({
        data: {
          ...input,
          userId
        }
        // , select: To select
      })
      return res
    }
  })
