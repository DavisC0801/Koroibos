const express = require('express')
const router = express.Router()
const Olympian = require('../../../models').Olympian

router.get("/", function(req, res){
  Olympian.sequelize.query(`SELECT COUNT("Olympians"."id") AS "total_competing_olympians", AVG("Olympians"."age") AS "average_age", (SELECT AVG("Olympians"."weight") AS "male_olympians" FROM "Olympians" WHERE "sex"='M'), (SELECT AVG("Olympians"."weight") AS "female_olympians" FROM  "Olympians" WHERE "sex"='F') FROM "Olympians";`,{ raw: true })
  .then(olympians => {
    if (olympians[0].length > 0){
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(
        {"olympian_stats":
          {
            "total_competing_olympians": olympians[0][0]["total_competing_olympians"],
            "average_weight": {
              "unit": "kg",
              "male_olympians": Number.parseFloat(olympians[0][0]["male_olympians"]).toFixed(1),
              "female_olympians": Number.parseFloat(olympians[0][0]["female_olympians"]).toFixed(1)
            },
            "average_age": Number.parseFloat(olympians[0][0]["average_age"]).toFixed(1)
          }
        }));
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(404).send(JSON.stringify({error: "No olympian athlete entries located."}));
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify(error));
  })
})

module.exports = router;
