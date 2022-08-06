import request from 'supertest';
import { app } from '../app';
import connection from '../db';

let accessToken = '';

function truncate() {
  const sendQuery = (query: string) => {
    connection.query(query, (err, result) => {
      if (err) {
        console.error(err);
      }

      console.log(query);
      console.log(result);
    });
  };

  sendQuery('SET FOREIGN_KEY_CHECKS=0;');
  sendQuery('truncate users;');
  sendQuery('truncate tweets;');
  sendQuery('truncate users_follow_list;');
  sendQuery('SET FOREIGN_KEY_CHECKS=1;');
}

beforeAll(truncate);
afterAll(truncate);

describe('API 테스트', () => {
  describe('Auth API 테스트', () => {
    test('[POST] /auth/sign-up', async () => {
      const account = {
        email: 'imkdw@kakao.com',
        password: '1234',
        name: '김동우',
        profile: "I'm Backend Developer",
      };

      const response = await request(app).post('/auth/sign-up').send(account);
      expect(response.statusCode).toBe(200);
    });

    test('[POST] /auth/sign-in', async () => {
      const account = {
        email: 'imkdw@kakao.com',
        password: '1234',
      };

      const response = await request(app).post('/auth/sign-in').send(account);
      accessToken = response.body.accessToken;
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Tweet API 테스트', () => {
    test('[POST] /tweet', async () => {
      const data = {
        tweet: 'Test Tweet',
        accessToken: accessToken,
      };

      const response = await request(app).post('/tweet').send(data);
      expect(response.statusCode).toBe(200);
    });
  });

  test('[POST] /timeline/:id', () => {
    expect(1).toBe(1);
  });
});
