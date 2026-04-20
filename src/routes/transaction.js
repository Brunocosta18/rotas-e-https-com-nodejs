var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { knex } from "../database.js";
import z from "zod";
import { randomUUID } from "node:crypto";
import { checkSessionIdExists } from '../middlewares/check-session-id-exists.js';
export function transactionRoutes(app) {
    app.get('/', {
        preHandler: [checkSessionIdExists]
    }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
        const sessionId = request.cookies;
        const transaction = yield knex('transaction')
            .where({ 'session_id': sessionId })
            .select();
        return { transaction };
    }));
    app.get('/:id', (request, reply) => __awaiter(this, void 0, void 0, function* () {
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid(),
        });
        const { id } = getTransactionParamsSchema.parse(request.params);
        const transaction = yield knex('transaction')
            .where({ id })
            .first();
        return { transaction };
    }));
    app.get('/summary', {
        preHandler: [checkSessionIdExists]
    }, (request) => __awaiter(this, void 0, void 0, function* () {
        const sessionId = request.cookies.sessionId;
        const summary = yield knex('transaction')
            .where('session_id', sessionId)
            .sum('amount', { as: 'amount' })
            .first();
        return { summary };
    }));
    app.post('/', (request, reply) => __awaiter(this, void 0, void 0, function* () {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        });
        const { title, amount, type } = createTransactionBodySchema.parse(request.body);
        let sessionId = request.cookies.sessionId;
        if (!sessionId) {
            sessionId = randomUUID();
            reply.cookie('sessionId', sessionId, {
                maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
                path: '/',
            });
        }
        yield knex('transaction')
            .insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
            session_id: sessionId,
        });
        return reply.status(201).send();
    }));
}
//# sourceMappingURL=transaction.js.map