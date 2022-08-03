import request from 'supertest';
import { app } from '../app';

describe('테스트 API 테스트', () => {
  test('[GET] /test', async () => {
    const response = await request(app).get('/test');
    expect(response.statusCode).toBe(200);
  });
});

describe('Auth API 테스트', () => {
  test('[POST] /auth/sign-up', async () => {
    const account = {
      email: 'imkdw@kakao.com',
      password: 1234,
      name: '김동우',
      profile: "I'm Backend Developer",
    };

    const response = await request(app).post('/auth/sign-up').send(account);
    expect(response.statusCode).toBe(200);
  });
});
