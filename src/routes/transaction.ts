import { FastifyInstance } from "fastify"
import { knex } from "../database.js"
import z from "zod"
import { randomUUID } from "node:crypto"
import { checkSessionIdExists } from '../middlewares/check-session-id-exists.js'

export function transactionRoutes(app: FastifyInstance) {
  
  app.get('/',{
    preHandler: [ checkSessionIdExists ]
  }, async (request, reply) => {
    const sessionId = request.cookies

    const transaction = await knex('transaction')
      .where({ 'session_id': sessionId })
      .select()


    return { transaction }
  })

  app.get('/:id', async (request, reply) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })    

    const { id } = getTransactionParamsSchema.parse(request.params)

    const transaction = await knex('transaction')
      .where({ id })
      .first()  

      return { transaction }
  })

  app.get('/summary',
    {
      preHandler: [ checkSessionIdExists ]
    },
    async (request) => {
      const sessionId = request.cookies.sessionId

    const summary = await knex('transaction')
    .where('session_id', sessionId)
    .sum('amount', { as: 'amount' })
    .first()

    return { summary }
  })

  app.post('/', async (request, reply) => {
    
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })
    }


    await knex('transaction')
      .insert({
        id: randomUUID(),
        title,
        amount: type === 'credit' ? amount : amount * -1,
        session_id: sessionId,
      })

    return reply.status(201).send()
  
  })
}