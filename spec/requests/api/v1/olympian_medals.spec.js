var request = require("supertest")
var app = require("../../../../app")
const express = require("express");
var router = express.Router();

describe('api', () => {
  describe('api v1 olympians medal paths', () => {
    describe('api v1 olympians least medals', () => {
      test('It should respond to a GET request', () => {
      return request(app).get("/api/v1/olympians?medals=least")
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
      });

      test('It should have olympian data in the correct format', () => {
      return request(app).get("/api/v1/olympians?medals=least")
        .then(response => {
          expect(Object.keys(response.body)).toContain("olympians");
          expect(response.body["olympians"].length).toBe(18);
          expect(Object.keys(response.body["olympians"][0])).toContain("name");
          expect(Object.keys(response.body["olympians"][0])).toContain("team");
          expect(Object.keys(response.body["olympians"][0])).toContain("age");
          expect(Object.keys(response.body["olympians"][0])).toContain("sport");
          expect(Object.keys(response.body["olympians"][0])).toContain("total_medals_won");
        });
      });
    });

    describe('api v1 olympians most medals', () => {
      test('It should respond to a GET request', () => {
      return request(app).get("/api/v1/olympians?medals=least")
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
      });

      test('It should have olympian data in the correct format', () => {
      return request(app).get("/api/v1/olympians?medals=least")
        .then(response => {
          expect(Object.keys(response.body)).toContain("olympians");
          expect(response.body["olympians"].length).toBe(18);
          expect(Object.keys(response.body["olympians"][0])).toContain("name");
          expect(Object.keys(response.body["olympians"][0])).toContain("team");
          expect(Object.keys(response.body["olympians"][0])).toContain("age");
          expect(Object.keys(response.body["olympians"][0])).toContain("sport");
          expect(Object.keys(response.body["olympians"][0])).toContain("total_medals_won");
        });
      });
    });

    describe('api v1 olympians medal finder', () => {
      test('It should respond to a GET request', () => {
      return request(app).get("/api/v1/olympians?medals=1")
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
      });

      test('It should have olympian data in the correct format', () => {
      return request(app).get("/api/v1/olympians?medals=1")
        .then(response => {
          expect(Object.keys(response.body)).toContain("olympians");
          expect(response.body["olympians"].length).toBe(16);
          expect(Object.keys(response.body["olympians"][0])).toContain("name");
          expect(Object.keys(response.body["olympians"][0])).toContain("team");
          expect(Object.keys(response.body["olympians"][0])).toContain("age");
          expect(Object.keys(response.body["olympians"][0])).toContain("sport");
          expect(Object.keys(response.body["olympians"][0])).toContain("total_medals_won");
        });
      });
    });

    describe('api v1 olympians medals edge cases', () => {
      test('It should respond to a GET request', () => {
      return request(app).get("/api/v1/olympians?medals=thisisatest")
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
      });

      test('It should have olympian data in the correct format', () => {
      return request(app).get("/api/v1/olympians")
        .then(response => {
          expect(Object.keys(response.body)).toContain("olympians");
          expect(response.body["olympians"].length).toBe(39);
          expect(Object.keys(response.body["olympians"][0])).toContain("name");
          expect(Object.keys(response.body["olympians"][0])).toContain("team");
          expect(Object.keys(response.body["olympians"][0])).toContain("age");
          expect(Object.keys(response.body["olympians"][0])).toContain("sport");
          expect(Object.keys(response.body["olympians"][0])).toContain("total_medals_won");
        });
      });
    });
  });
});
