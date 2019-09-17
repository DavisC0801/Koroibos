const express = require('express')
const router = express.Router()
const Olympian = require('../../../models').Olympian

router.get("/", function(req, res){
  let query = Olympian.sequelize.query('SELECT "Olympians"."name", "Olympians"."team", "Olympians"."age", "Sports"."name" AS "sport", COUNT("Olympian_Sports"."medal") AS "total_medals_won" FROM "Olympians" INNER JOIN "Olympian_Sports" ON "Olympians"."id" = "Olympian_Sports"."OlympianId" INNER JOIN "Sports" on "Sports"."id" = "Olympian_Sports"."SportId" GROUP BY "Sports"."name", "Olympians"."name", "Olympians"."team", "Olympians"."age";',{ raw: true })
  if (req.query.age) {
    if (req.query.age === "youngest") {
      query = Olympian.sequelize.query('SELECT "Olympians"."name", "Olympians"."team", "Olympians"."age", "Sports"."name" AS "sport", COUNT("Olympian_Sports"."medal") AS "total_medals_won" FROM "Olympians" INNER JOIN "Olympian_Sports" ON "Olympians"."id" = "Olympian_Sports"."OlympianId" INNER JOIN "Sports" on "Sports"."id" = "Olympian_Sports"."SportId" GROUP BY "Sports"."name", "Olympians"."name", "Olympians"."team", "Olympians"."age" ORDER BY "Olympians"."age" ASC LIMIT 1;',{ raw: true })
    } else if (req.query.age === "oldest") {
      query = Olympian.sequelize.query('SELECT "Olympians"."name", "Olympians"."team", "Olympians"."age", "Sports"."name" AS "sport", COUNT("Olympian_Sports"."medal") AS "total_medals_won" FROM "Olympians" INNER JOIN "Olympian_Sports" ON "Olympians"."id" = "Olympian_Sports"."OlympianId" INNER JOIN "Sports" on "Sports"."id" = "Olympian_Sports"."SportId" GROUP BY "Sports"."name", "Olympians"."name", "Olympians"."team", "Olympians"."age" ORDER BY "Olympians"."age" DESC LIMIT 1;',{ raw: true })
    } else {
      query = Olympian.sequelize.query('SELECT "Olympians"."name", "Olympians"."team", "Olympians"."age", "Sports"."name" AS "sport", COUNT("Olympian_Sports"."medal") AS "total_medals_won" FROM "Olympians" INNER JOIN "Olympian_Sports" ON "Olympians"."id" = "Olympian_Sports"."OlympianId" INNER JOIN "Sports" on "Sports"."id" = "Olympian_Sports"."SportId" GROUP BY "Sports"."name", "Olympians"."name", "Olympians"."team", "Olympians"."age";',{ raw: true })
    }
  }
  if (req.query.medals) {
    if (req.query.medals === "most") {
      query = Olympian.sequelize.query('SELECT "Olympians"."name", "Olympians"."team", "Olympians"."age", "Sports"."name", COUNT("Olympian_Sports"."medal") AS "medals" FROM "Olympians" INNER JOIN "Olympian_Sports" ON "Olympians"."id" = "Olympian_Sports"."OlympianId" INNER JOIN "Sports" on "Sports"."id" = "Olympian_Sports"."SportId" GROUP BY "Sports"."name", "Olympians"."name", "Olympians"."team", "Olympians"."age" HAVING COUNT("Olympian_Sports"."medal") > 0 ORDER BY "medals" DESC;',{ raw: true })
    } else if (req.query.medals === "fewest") {
      query = Olympian.sequelize.query('SELECT "Olympians"."name", "Olympians"."team", "Olympians"."age", "Sports"."name", COUNT("Olympian_Sports"."medal") AS "medals" FROM "Olympians" INNER JOIN "Olympian_Sports" ON "Olympians"."id" = "Olympian_Sports"."OlympianId" INNER JOIN "Sports" on "Sports"."id" = "Olympian_Sports"."SportId" GROUP BY "Sports"."name", "Olympians"."name", "Olympians"."team", "Olympians"."age" HAVING COUNT("Olympian_Sports"."medal") > 0 ORDER BY "medals" ASC;',{ raw: true })
    } else if (Number.isInteger(parseInt(req.query.medals))) {
      query = Olympian.sequelize.query(`SELECT "Olympians"."name", "Olympians"."team", "Olympians"."age", "Sports"."name", COUNT("Olympian_Sports"."medal") AS "medals" FROM "Olympians" INNER JOIN "Olympian_Sports" ON "Olympians"."id" = "Olympian_Sports"."OlympianId" INNER JOIN "Sports" on "Sports"."id" = "Olympian_Sports"."SportId" GROUP BY "Sports"."name", "Olympians"."name", "Olympians"."team", "Olympians"."age" HAVING COUNT("Olympian_Sports"."medal") = ${req.query.medals} ORDER BY "medals" ASC;`,{ raw: true })
    } else {
      query = Olympian.sequelize.query('SELECT "Olympians"."name", "Olympians"."team", "Olympians"."age", "Sports"."name" AS "sport", COUNT("Olympian_Sports"."medal") AS "total_medals_won" FROM "Olympians" INNER JOIN "Olympian_Sports" ON "Olympians"."id" = "Olympian_Sports"."OlympianId" INNER JOIN "Sports" on "Sports"."id" = "Olympian_Sports"."SportId" GROUP BY "Sports"."name", "Olympians"."name", "Olympians"."team", "Olympians"."age";',{ raw: true })
    }
  }
  query.then(olympians => {
    if (olympians[0].length > 0) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify({"olympians": olympians[0]}));
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
