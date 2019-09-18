const express = require('express')
const router = express.Router()
const Sport = require('../../../models').Sport

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
    } else {x
      res.setHeader("Content-Type", "application/json");
      res.status(404).send(JSON.stringify({error: "No event entries located."}));
    }
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify(error));
  })
})

module.exports = router;
