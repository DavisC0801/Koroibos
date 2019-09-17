const express = require('express');
const router = express.Router();
const Olympian = require('../../../models').Olympian

router.get("/", function(req, res){

  Olympian.sequelize.query('SELECT "Olympians"."name", "Olympians"."team", "Olympians"."age", "Sports"."name" AS "sport", COUNT("Olympian_Sports"."medal") AS "total_medals_won" FROM "Olympians" INNER JOIN "Olympian_Sports" ON "Olympians"."id" = "Olympian_Sports"."OlympianId" INNER JOIN "Sports" on "Sports"."id" = "Olympian_Sports"."SportId" GROUP BY "Sports"."name", "Olympians"."name", "Olympians"."team", "Olympians"."age";',{ raw: true })
  .then(olympians => {
    if (olympians.length > 0) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify({"olympians": olympians}));
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(404).send(JSON.stringify({error: "No olympian athlete entries located."}));
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify(error));
  });
})

module.exports = router;
