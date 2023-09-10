const request = require('supertest');
const app = require('./index');

test('should return an index.html page with a "hello world" string in the h1 element', () => {

    return request(app).get('/').then((response) => {

        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toEqual(expect.stringContaining('html'));
        expect(response.text).toEqual(expect.stringContaining('HELLO WORLD'));

    });
});

test('should return all pets from the database', () => {

    return request(app).get('/api/v1/pets').then((response) => {

        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({ name: 'Rover' })]));

    });
});

test('should return a single pet from the database', () => {

    return request(app).get('/api/v1/pets/1').then((response) => {

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({ id: 1 }));
        expect(response.body).toEqual(expect.objectContaining({ name: 'Fido' }));
        expect(response.body).toEqual(expect.objectContaining({ owner: 'John' }));
        expect(response.body.appointments.length).toBe(1);
        expect(response.body.appointments[0]).toEqual(expect.objectContaining({ date: '01/01/2020' }));

    });
});