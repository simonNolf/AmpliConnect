import http from "http";
import {AddressInfo} from "net";
import {server} from "../../src/server";
var request = require('supertest');

let httpServer :http.Server;
let httpServerAddress:String | AddressInfo;

beforeAll((done) => {
  httpServer = server
  httpServerAddress = server.address()
  done();
});

/**
 *  Cleanup WS & HTTP servers
 */
afterAll((done) => {
  httpServer.close();
  done();
});

describe('test d\'intégration GET', function () {

  describe('test des routes', function () {

    for(let i = 0;i<5;i++){
      it('should return a 200 status code', async () => {
        const response = await request(server).get('/audio/play');
        expect(response.statusCode).toBe(200);
      });

      it('should return a 200 status code', async () => {
        const response = await request(server).get('/audio/backward');
        expect(response.statusCode).toBe(200);
      });

      it('should return a 200 status code', async () => {
        const response = await request(server).get('/audio/pause');
        expect(response.statusCode).toBe(200);
      });

      it('should return a 200 status code', async () => {
        const response = await request(server).get('/audio/forward');
        expect(response.statusCode).toBe(200);
      });


      it('should return a 200 status code', async () => {
        const response = await request(server).get('/api');
        expect(response.statusCode).toBe(200);
      });
    }
  })

  describe('test post general settings data POST',  ()=> {
    for(let i = 0;i<5;i++){
      it('should return a 200 status code', async () => {
        await request(server)
            .post('/sendGeneralSettings')
            .send(
                {
                  "appName": "Nostra Hmidus Application",
                  "volume": 100
                }
            )
            .expect(201).then((response: any)=>{
              expect(response.body).toEqual(
                  expect.objectContaining(
                      {
                        "appName": "Nostra Hmidus Application",
                        "volume": 100
                      }
                  )
              )
            });

      });
    }})

  describe('test get general settings data GET',  ()=> {
    for(let i = 0;i<5;i++){
      it('should return a 200 status code', async () => {
        const response = await request(server).get('/GeneralSettings');
        expect(response.statusCode).toBe(200);
      });

      it('should return a 200 status code', async () => {
        const response = await request(server).get('/GeneralSettings');
        console.log(response.body)
        expect(response.body).toStrictEqual(
            {
              "appName": "Nostra Hmidus Application",
              "volume": 100
            }
        )
      });
    }})


})
