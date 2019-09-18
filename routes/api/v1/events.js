const express = require('express')
const router = express.Router()
const Sport = require('../../../models').Sport
const Olympian_Sport = require('../../../models').Olympian_Sport

router.get("/", function(req, res){
  let eventObj = {"events":[]}
  Sport.sequelize.query('SELECT DISTINCT "Sports"."name" AS "sport", "Olympian_Sports"."event" AS "events" FROM "Sports" INNER JOIN "Olympian_Sports" ON "Sports"."id" = "Olympian_Sports"."SportId" ORDER BY "Sports"."name";',{ raw: true })
  .then(sports => {
    if (sports[0].length > 0){
      let sportNameTracker = sports[0][0]["sport"]
      let nameAccumulator = []
      sports[0].forEach(sport => {
        if (sport["sport"] === sportNameTracker) {
          nameAccumulator.push(sport["events"])
        } else {
          eventObj["events"].push({"sport":sportNameTracker, "events":nameAccumulator})
          sportNameTracker = sport["sport"]
          nameAccumulator = [sport["events"]]
        }
      })
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(eventObj));
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(404).send(JSON.stringify({error: "No event entries located."}));
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify(error));
  })
})

router.get("/:id/medalists", function(req, res){
  Olympian_Sport.findOne({where: {id: req.params.id}})
  .then(sport => {
    if (sport){
      let sportName = sport["dataValues"]["event"].replace(/'/g, "''")
      Olympian_Sport.sequelize.query(`SELECT "Olympian_Sports"."event", "Olympian_Sports"."medal", "Olympians"."name", "Olympians"."team", "Olympians"."age" FROM "Olympian_Sports" INNER JOIN "Olympians" ON "Olympians"."id" = "Olympian_Sports"."OlympianId" WHERE "Olympian_Sports"."event" = '${sportName}' AND "Olympian_Sports"."medal" IS NOT NULL`,{ raw: true })
      .then(events => {
        if (events[0][0]) {
          let eventObj = {"event":sport["dataValues"]["event"], "medalists":[]}
          events[0].forEach(eventMedalist => {
            eventObj["medalists"].push({"name":eventMedalist["name"],"team":eventMedalist["team"],"age":eventMedalist["age"],"medal":eventMedalist["medal"]})
          })
          res.setHeader("Content-Type", "application/json");
          res.status(200).send(JSON.stringify(eventObj));
        } else {
          res.setHeader("Content-Type", "application/json");
          res.status(404).send(JSON.stringify({error: "No medalists located."}));
        }
      })
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(404).send(JSON.stringify({error: "No event entry located."}));
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify(error));
  })
})

module.exports = router;
