import supertest from "supertest";
import { app } from "../src/server";

describe('Mini Neptun', () => {
    const user = {name: 'name', username: 'username', password: 'password', role: 'ADMIN', e_mail: 'email' };
  
    let requestHandle: supertest.SuperTest<supertest.Test>;
  
    beforeEach(() => {
      requestHandle = supertest(app);
    });
  
    describe('Authentication', () => {
      it('should register', async () => {
        await requestHandle.post('/auth/register').send(user).expect(200);
      });
  
      it('should fail on same user registration', async () => {
        await requestHandle.post('/auth/register').send(user).expect(409);
      });
  
      it('should login with registered user', async () => {
        await requestHandle.post('/auth/login').send(user).expect(200);
      });
    });
  
    describe('Users Controller', () => {
      let token: string;
  
      let time: Date;
      let createdUser: object;
      beforeAll(() => {
        time = new Date();
        jest.useFakeTimers('modern');
        jest.setSystemTime(time);
        createdUser = {
          id: 1,
          username: 'username',
          name: 'name',
          role: 'ADMIN',
          //sum_credit: 0,
          e_mail: 'email',
          password: 'password',
          subjects: [],
          createdAt: time.toISOString(),
          updatedAt: time.toISOString(),
        };
      });
      afterAll(() => {
        jest.useRealTimers();
      });

      beforeEach(async () => {
        const loginResponse = await requestHandle.post('/auth/login').send(user);
        token = `Bearer ${loginResponse.body.token}`;
      });

      describe('/users', () => {
        it('should return 200 when there are no users', async () => {
          await requestHandle
            .get('/users')
            .set('Authorization', token)
            .expect(200)
            //.expect([]);
        });

        it('should return when there are users', async () => {
          await requestHandle
            .get('/users/1')
            .set('Authorization', token)
            .expect(200)
        });
  
      describe('/users/:id', () => {
        it('should return 200 when the user does exist', async () => {
          await requestHandle
            .get('/users/1')
            .set('Authorization', token)
            .expect(200);
        });
  
        it('should return 404 when the user does not exist', async () => {
          await requestHandle
            .get('/users/10')
            .set('Authorization', token)
            .expect(404);
        });
      });

      describe('/users/:id/subjects', () => {
        it('should return empty array when the subjects does exist', async () => {
          await requestHandle
            .get('/users/1/subjects')
            .set('Authorization', token)
            .expect([]);
        });
  
        it('should return 404 when the user does not exist', async () => {
          await requestHandle
            .get('/users/10/subjects')
            .set('Authorization', token)
            .expect(404);
        });
      });
  /*
      describe('/labels', () => {
        it('should return the newly created label', async () => {
          await requestHandle
            .post('/labels')
            .set('Authorization', token)
            .send({
              text: 'cica',
            })
            .expect(200)
            .expect({
              id: 1,
              text: 'cica',
              issues: [],
            });
        });
  
        it('should return all the labels', async () => {
          await requestHandle
            .get('/labels')
            .set('Authorization', token)
            .expect(200)
            .expect([{
              id: 1,
              text: 'cica',
            }]);
        });
  
        it('should query the labels by text', async () => {
          await requestHandle
            .get('/labels?text=alma')
            .set('Authorization', token)
            .expect(200)
            .expect([]);
        });
  
        it('should add the label to the issue', async () => {
          await requestHandle
            .put('/issues/1')
            .set('Authorization', token)
            .send({
              labels: [1]
            })
            .expect(200);
          await requestHandle
            .get('/issues/1')
            .set('Authorization', token)
            .expect(res => {
              expect(res.body.labels).toEqual([{
                id: 1,
                text: 'cica',
              }])
            });
        });*/
      });

    describe('Results Controller', () => {
      let token: string;
  
      let time: Date;
      let createdResult: object;
      beforeAll(() => {
        time = new Date();
        jest.useFakeTimers('modern');
        jest.setSystemTime(time);
        createdResult = {
          id: 1,
          mark: 3,
          subject: null,
          createdAt: '2021',
          updatedAt: '2021',
        };
      });
      afterAll(() => {
        jest.useRealTimers();
      });

      beforeEach(async () => {
        const loginResponse = await requestHandle.post('/auth/login').send(user);
        token = `Bearer ${loginResponse.body.token}`;
      });
  
      describe('/results/:id', () => {
        it('should return 200 when the result does exist', async () => {
          await requestHandle
            .get('/results/1')
            .set('Authorization', token)
            .expect(200);
        });
  
        it('should return 404 when the result does not exist', async () => {
          await requestHandle
            .get('/results/10')
            .set('Authorization', token)
            .expect(404);
        });

        it('should return 200 when the result does exist', async () => {
          await requestHandle
            .get('/results/1')
            .set('Authorization', token)
            .expect(createdResult);
        });
      });
    });
  });
});