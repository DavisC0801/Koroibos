var request = require("supertest")
var app = require("../../../../app")
const express = require("express");
var router = express.Router();

describe('api', () => {
  describe('api v1 olympians medalists path', () => {
    test('It should respond to a GET request', () => {
    return request(app).get("/api/v1/events/1/medalists")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
    });

    test('It should have olympian data in the correct format', () => {
    return request(app).get("/api/v1/events/1/medalists")
      .then(response => {
        expect(Object.keys(response.body)).toContain("event");
        expect(Object.keys(response.body)).toContain("medalists");
        expect(response.body["medalists"].length).toBe(1);
        expect(Object.keys(response.body["medalists"][0])).toContain("name");
        expect(Object.keys(response.body["medalists"][0])).toContain("team");
        expect(Object.keys(response.body["medalists"][0])).toContain("age");
        expect(Object.keys(response.body["medalists"][0])).toContain("medal");
      });
    });
  });

  describe('api v1 olympians medalists edge cases', () => {
    test('It should respond to a GET request', () => {
    return request(app).get("/api/v1/events/100/medalists")
      .then(response => {
        expect(response.statusCode).toBe(404);
      });
    });

    test('It should have an error if invalid id is passed', () => {
    return request(app).get("/api/v1/events/100/medalists")
      .then(response => {
        expect(Object.keys(response.body)).toContain("error");
        expect(response.body["error"]).toBe("No event entry located.");
      });
    });
  });
});
