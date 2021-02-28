const app = require('../app.js');
const request = require('supertest');
const tester = request(app);

describe('Routes', () => {

    test('It should respond the GET method at root request', (done) => {
        request(app)
            .get('/')
            .expect(401)
            .end((err, res) => {
                if (err) throw err;
                done()
            })
    });



    test('It should fail if the get request is invalid.', (done) => {
        request(app)
            .get('/api/notes')
            .expect(401)
            .end((err, res) => {
                if (err) throw err;
                done()
            })
    })

    test('It should fail if the get request is invalid.', (done) => {
        request(app)
            .post('/api/notes')
            .expect(401)
            .end((err, res) => {
                if (err) throw err;
                done()
            })
    })

    test('It should fail if the get request is invalid.', (done) => {
        request(app)
            .put('/api/notes/1')
            .expect(401)
            .end((err, res) => {
                if (err) throw err;
                done()
            })
    })

    test('It should fail if the get request is invalid.', (done) => {
        request(app)
            .delete('/api/notes/1')
            .expect(401)
            .end((err, res) => {
                if (err) throw err;
                done()
            })
    })





});