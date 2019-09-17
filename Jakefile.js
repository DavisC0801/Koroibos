desc('Reads 2016 olympian data from ./data');
task('readCSV', [], function () {
  const parse = require('csv-parse')
  const fs = require('fs')
  const inputFile = './data/olympic_data_2016.csv'
  const gameModel = require('./models').Game
  const olympianModel = require('./models').Olympian
  const sportModel = require('./models').Sport
  const olympianSportModel = require('./models').Olympian_Sport
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
      let game = await gameModel.findOrCreate({where: {
        name: dataObj["Games"],
      }})
      .then(([game, created]) => {
        return game
      })
      let olympian = await olympianModel.findOrCreate({where: {
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
      let sport = await sportModel.findOrCreate({where: {
        name: dataObj["Sport"],
        GameId: game.id
      }})
      .then(([sport, created]) => {
        return sport
      })
      await olympianSportModel.create({
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
