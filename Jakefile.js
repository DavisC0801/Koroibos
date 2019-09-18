desc('Reads 2016 olympian data from ./data');
task('readCSV', [], function () {
  const parse = require('csv-parse')
  const fs = require('fs')
  const inputFile = './data/olympic_data_2016.csv'
  const Game = require('./models').Game
  const Olympian = require('./models').Olympian
  const Sport = require('./models').Sport
  const Olympian_Sport = require('./models').Olympian_Sport
  const parser = parse({
    columns: true
  })
  parser.on('readable', async () => {
    let data
    while (data = parser.read()) {
      const dataObj = data
      let medalWon = dataObj["Medal"]
      if (dataObj["Medal"] === "NA") {
        dataObj["Medal"] = null
      }
      if (dataObj["Height"] === "NA") {
        dataObj["Height"] = null
      }
      if (dataObj["Weight"] === "NA") {
        dataObj["Weight"] = null
      }
      let game = await Game.findOrCreate({where: {
        name: dataObj["Games"],
      }})
      .then(([game, created]) => {
        return game
      })
      let olympian = await Olympian.findOrCreate({where: {
        name: dataObj["Name"],
        age: dataObj["Age"],
        sex: dataObj["Sex"],
        height: dataObj["Height"],
        weight: dataObj["Weight"],
        team: dataObj["Team"]
      }})
      .then(([olympian, created]) => {
        return olympian
      })
      let sport = await Sport.findOrCreate({where: {
        name: dataObj["Sport"],
        GameId: game.id
      }})
      .then(([sport, created]) => {
        return sport
      })
      await Olympian_Sport.create({
        event: dataObj["Event"],
        medal: dataObj["Medal"],
        SportId: sport.id,
        OlympianId: olympian.id,
      })
    }
  })
  parser.on('error', function(err){
    console.error(err.message)
  })
  fs.createReadStream(inputFile).pipe(parser);
  complete();
}, true);

desc('Reads 2016 fixture data from ./spec');
task('loadTestData', [], function () {
  const parse = require('csv-parse')
  const fs = require('fs')
  const inputFile = './spec/olympic_fixture_2016.csv'
  const Game = require('./models').Game
  const Olympian = require('./models').Olympian
  const Sport = require('./models').Sport
  const Olympian_Sport = require('./models').Olympian_Sport
  const parser = parse({
    columns: true
  })
  parser.on('readable', async () => {
    let data
    while (data = parser.read()) {
      const dataObj = data
      let medalWon = dataObj["Medal"]
      if (dataObj["Medal"] === "NA") {
        dataObj["Medal"] = null
      }
      if (dataObj["Height"] === "NA") {
        dataObj["Height"] = null
      }
      if (dataObj["Weight"] === "NA") {
        dataObj["Weight"] = null
      }
      let game = await Game.findOrCreate({where: {
        name: dataObj["Games"],
      }})
      .then(([game, created]) => {
        return game
      })
      let olympian = await Olympian.findOrCreate({where: {
        name: dataObj["Name"],
        age: dataObj["Age"],
        sex: dataObj["Sex"],
        height: dataObj["Height"],
        weight: dataObj["Weight"],
        team: dataObj["Team"]
      }})
      .then(([olympian, created]) => {
        return olympian
      })
      let sport = await Sport.findOrCreate({where: {
        name: dataObj["Sport"],
        GameId: game.id
      }})
      .then(([sport, created]) => {
        return sport
      })
      await Olympian_Sport.create({
        event: dataObj["Event"],
        medal: dataObj["Medal"],
        SportId: sport.id,
        OlympianId: olympian.id,
      })
    }
  })
  parser.on('error', function(err){
    console.error(err.message)
  })
  fs.createReadStream(inputFile).pipe(parser);
  complete();
});
