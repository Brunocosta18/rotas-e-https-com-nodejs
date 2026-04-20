import { expect, test, beforeAll, afterAll, describe, beforeEach, it } from "vitest";
import { execSync } from 'node:child_process';
import request from 'supertest';
import { app } from '../src/app.js';

describe('transactions routes', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    // Comando compatível com Node 20+
    execSync('node --import tsx ./node_modules/knex/bin/cli.js migrate:rollback --all');
    execSync('node --import tsx ./node_modules/knex/bin/cli.js migrate:latest');
  });

  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transaction')
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'credit'
      })
      .expect(201); // Agora o teste valida o status real
  });

  it('should be able to list all transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transaction')
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'credit'
      });

    const cookies = createTransactionResponse.get('Set-Cookie') ?? [];

    const listTransactionResponse = await request(app.server)
      .get('/transaction')
      .set('Cookie', cookies)
      .expect(200);

    // Correção: acessando o corpo da resposta e a chave transactions
    expect(listTransactionResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New Transaction',
        amount: 5000,
      })
    ]);
  });

  it('should be able to get a specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transaction')
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'credit'
      });

    const cookies = createTransactionResponse.get('Set-Cookie') ?? [];

    const listTransactionResponse = await request(app.server)
      .get('/transaction')
      .set('Cookie', cookies)
      .expect(200);

    const transactionId = listTransactionResponse.body.transactions[0].id;

    const getTransactionResponse = await request(app.server)
      .get(`/transaction/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200);

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New Transaction',
        amount: 5000,
      })
    );
  });

  it('should be able to get the summary', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transaction')
      .send({
        title: 'Credit Transaction',
        amount: 5000,
        type: 'credit'
      });

    const cookies = createTransactionResponse.get('Set-Cookie') ?? [];

    await request(app.server)
      .post('/transaction')
      .set('Cookie', cookies)
      .send({
        title: 'Debit Transaction',
        amount: 2000,
        type: 'debit'
      });

    const summaryResponse = await request(app.server)
      .get('/transaction/summary') // ADICIONADO /transaction devido ao prefixo
      .set('Cookie', cookies)
      .expect(200);

    expect(summaryResponse.body.summary).toEqual({
      amount: 3000,
    });
  });
});