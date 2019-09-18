var request = require("supertest")
var app = require("../../../../app")
const express = require("express");
var router = express.Router();

describe('api', () => {
  describe('api v1 olympians stats path', () => {
    test('It should respond to a GET request', () => {
    return request(app).get("/api/v1/olympian_stats")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
    });

    test('It should have olympian data in the correct format', () => {
    return request(app).get("/api/v1/olympian_stats")
      .then(response => {
        expect(Object.keys(response.body)).toContain("olympian_stats");
        expect(Object.keys(response.body["olympian_stats"])).toContain("total_competing_olympians");
        expect(Object.keys(response.body["olympian_stats"])).toContain("average_weight");
        expect(Object.keys(response.body["olympian_stats"]["average_weight"])).toContain("unit");
        expect(Object.keys(response.body["olympian_stats"]["average_weight"])).toContain("male_olympians");
        expect(Object.keys(response.body["olympian_stats"]["average_weight"])).toContain("female_olympians");
        expect(Object.keys(response.body["olympian_stats"])).toContain("average_age");
      });
    });
  });
});
