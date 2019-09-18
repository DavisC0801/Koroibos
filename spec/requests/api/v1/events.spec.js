var request = require("supertest")
var app = require("../../../../app")
const express = require("express");
var router = express.Router();

describe('api', () => {
  describe('api v1 olympians events path', () => {
    test('It should respond to a GET request', () => {
    return request(app).get("/api/v1/events")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
    });

    test('It should have olympian data in the correct format', () => {
    return request(app).get("/api/v1/events")
      .then(response => {
        expect(Object.keys(response.body)).toContain("events");
        expect(response.body["events"].length).toBe(20);
        expect(response.body["events"][0]["sport"]).toBe("Athletics");
        expect(response.body["events"][0]["events"].length).toBe(9);
        expect(response.body["events"][0]["events"]).toContain("Athletics Men's 10,000 metres");
        expect(response.body["events"][0]["events"]).toContain("Athletics Women's Shot Put");
      });
    });
  });
});
