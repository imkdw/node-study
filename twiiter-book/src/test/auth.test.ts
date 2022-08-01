import { app } from '../app';
import { testConnection } from './test_db';
import request from 'supertest';

describe('Auth API 테스트', () => {
  describe('회원가입 API 테스트', () => {
    afterAll(() => {
      /** DB 내부 모든 데이터를 지우는 쿼리 */
      testConnection.query('SET FOREIGN_KEY_CHECKS=0', (err, result) => {
        if (err) {
          console.log(err);
        }
      });

      testConnection.query('TRUNCATE users', (err, result) => {
        if (err) {
          console.log(err);
        }
      });

      testConnection.query('SET FOREIGN_KEY_CHECKS=1', (err, result) => {
        if (err) {
          console.log(err);
        }
      });
    });

    const account = {
      name: '김동우',
      email: 'imkdw@kakao.com',
      password: '1234',
      profile: "Hello! I'm Backend Developer",
    };

    test('[POST] /auth/sign-up', async () => {
      const testApp = app;
      const response = await request(testApp).post('/auth/sign-up').send(account);

      expect(response.statusCode).toBe(200);
    });
  });
});
