# Koroibos Express
An API for olympics data analytics using Node.Js and Express.

## Deployed Build
* A deployed version of this application can be found [here](https://koroibos-express.herokuapp.com).
* The project board for this application is located [here](https://github.com/DavisC0801/Koroibos/projects/1).

## Local Build

To install this project locally, follow these directions.

### Requirements
* PostgreSQL
* NPM Version `6.11.3`
* Express Version: `4.16.1`

### Setup

* Download this project into a working directory.

* Install the requirements using npm:
> npm install

  This will install the required pacakges for the project.

* Create and migrate the local database using sequelize:
> npx sequelize db:create
> npx sequelize db:migrate

* A Jake task has been written to input sample olympian data into the database. To use this data, run the following command:
> npx jake readCSV

* As an Express app, you are able to start the server using the following command:
> npm start

## Endpoints

The following endpoints are exposed on this API:

* /api/v1/olympians
* /api/v1/olympians?age=youngest
* /api/v1/olympians?age=oldest
* /api/v1/olympians?medals=most
* /api/v1/olympians?medals=least
* /api/v1/olympians?medals=<#>
* /api/v1/olympian_stats
* /api/v1/events
* /api/v1/events/:id/medalists

#### /api/v1/olympians
This endpoint takes a get request. It returns a list of all Olympian athletes in the database, and an error message if no athletes are present in the database.

An example response is as follows:
```
{
  "olympians":
  [
    {
      "name":"Brian Richard Baker",
      "team":"United States",
      "age":31,
      "sport":"Tennis",
      "total_medals_won":"0"
    },
    {
      "name":"Inna Vasilyevna Deriglazova",
      "team":"Russia",
      "age":26,
      "sport":"Fencing",
      "total_medals_won":"1"
    },
    {...}
  ]
}
```

#### /api/v1/olympians?age=youngest
This endpoint takes a get request. It returns the youngest of all Olympian athletes in the database, and an error message if no athletes are present in the database.

An example response is as follows:
```
{
  "olympians":
    [
      {
        "name":"Ana Iulia Dascl",
        "team":"Romania","age":13,
        "sport":"Swimming",
        "total_medals_won":"0"
      }
    ]
  }
}
```


#### /api/v1/olympians?age=oldest
This endpoint takes a get request. It returns the oldest of all Olympian athletes in the database, and an error message if no athletes are present in the database.

An example response is as follows:
```
{
  "olympians":
    [
      {
        "name":"Julie Brougham",
        "team":"New Zealand",
        "age":62,
        "sport":"Equestrianism",
        "total_medals_won":"0"
      }
    ]
  }
}
```

#### /api/v1/olympians?medals=most
This endpoint takes a get request. It returns the all Olympian athletes in the database, sorted by total number of medals won, and an error message if no athletes are present in the database. At least a single medal must be won to be included in this list.

An example response is as follows:
```
{
  "olympians":
    [
      {
        "name":"Simone Arianne Biles",
        "team":"United States",
        "age":19,
        "sport":"Gymnastics",
        "total_medals_won":"5"
      },
      {
        "name":"Nathan Ghar-Jun Adrian",
        "team":"United States",
        "age":27,
        "sport":"Swimming",
        "total_medals_won":"4"
      },
      {...}
    ]
  }
}
```

#### /api/v1/olympians?medals=least
This endpoint takes a get request. It returns the all Olympian athletes in the database, sorted by total number of medals won, and an error message if no athletes are present in the database. At least a single medal must be won to be included in this list.

An example response is as follows:
```
{
  "olympians":
    [
      {
        "name":"Ashton James Eaton",
        "team":"United States",
        "age":28,
        "sport":"Athletics",
        "total_medals_won":"1"
      },
      {
        "name":"lodie Pascaline Clouvel",
        "team":"France",
        "age":27,
        "sport":"Modern Pentathlon",
        "total_medals_won":"1"
      },
      {...}
    ]
  }
}
```

#### /api/v1/olympians?medals=<#>
This endpoint takes a get request. It returns the Olympian athletes in the database that have won the number of medals indicated in the query parameter, and an error message if no athletes are present in the database.

An example response for 5 as the query parameter is as follows:
```
{
  "olympians":
    [
      {
        "name":"Simone Arianne Biles",
        "team":"United States",
        "age":19,
        "sport":"Gymnastics",
        "total_medals_won":"5"
      },
    ]
  }
}
```

#### /api/v1/olympian_stats
This endpoint takes a get request. It returns statistics for all Olympian athletes in the database, showing a total count of athletes, average age of all athletes, and weight by athlete sex. An error message if no athletes are present in the database

An example response is as follows:
```
{
  "olympian_stats":
    {
      "total_competing_olympians":"2862",
      "average_weight":
        {
          "unit":"kg",
          "male_olympians":"79.4",
          "female_olympians":"62.7"
        },
      "average_age":"26.4"
    }
  }
}
```

#### /api/v1/events
This endpoint takes a get request. It returns all events in the database, grouped by each sport. No duplicate events will appear in this endpoint, and an error message if no events are present in the database.

An example response is as follows:
```
{
  "events":
    [
      {
        "sport": "Archery",
        "events": [
          "Archery Men's Individual",
          "Archery Men's Team",
          "Archery Women's Individual",
          "Archery Women's Team"
        ]
      },
      {
        "sport": "Athletics",
        "events": [
          "Athletics Men's 1,500 metres",
          "Athletics Men's 10,000 metres",
          "Athletics Men's 100 metres",
          "Athletics Men's 110 metres Hurdles",
          "Athletics Men's 20 kilometres Walk",
          ...
        ]
      },
      {...}
    ]
}
```

#### /api/v1/events/:id/medalists
This endpoint takes a get request. It returns all medalists for a particular event, dictated by the ID passed in the URL parameter, showing each athlete's name, team, age and medal won.

An example response for 119 as the ID parameter is as follows:
```
{
  "event":"Badminton Mixed Doubles",
  "medalists":
    [
      {
        "name":"Tontowi Ahmad",
        "team":"Indonesia-1",
        "age":29,
        "medal":"Gold"
      },
      {
        "name":"Chan Peng Soon",
        "team":"Malaysia",
        "age":28,
        "medal":"Silver"
      }
    ]
}
```
