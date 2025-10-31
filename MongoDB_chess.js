// CHESS RESULTS

/*
I. Schema Description:

Players:
{
  "nickname": "DavidM",
  "full_name": "David Martin",
  "birth": ISODate("2005-06-17"),
  "rating": 1000,
  "clubs": [
    {"name": "Chess Fans", "address": "Calle Rosa 5", "foundation_date": ISODate("2024-05-09")},
    {"name": "Besties", "address": "Calle Tulipán 3", "foundation_date": ISODate("2022-03-19")}
  ]
}

Clubs:
{
  "name": "Chess Fans",
  "address": "Calle Rosa 5",
  "active_members": [
    {"nickname": "DavidM", "full_name": "David Martin", "rating": 1000},
    {"nickname": "AinhoaR", "full_name": "Ainhoa Rodriguez", "rating": 1500}
  ],
  "foundation_date": ISODate("2024-05-09")
}

Tournaments:
{
  "name": "New hobby",
  "starting_date": ISODate("2024-10-12"),
  "rounds": 3,
  "type": "Teams",
  "organizer_club": {
    "name": "Chess Fans",
    "address": "Calle Rosa 5",
    "foundation_date": ISODate("2024-05-09")
  },
  "participants": [
    { "name": "Friends", "players": [{"nickname": "MarioL"}, {"nickname": "AinhoaR"}, {"nickname": "DavidM"}] },
    { "name": "Chess_lovers", "players": [{"nickname": "SandraW"}, {"nickname": "JoseLo"}, {"nickname": "MonicaH"}] }
  ]
}

Teams:
{
  "name": "Friends",
  "players": [
    {"nickname": "MarioL", "full_name": "Mario López", "rating": 700},
    {"nickname": "AinhoaR", "full_name": "Ainhoa Rodriguez", "rating": 1500},
    {"nickname": "DavidM", "full_name": "David Martin", "rating": 1000}
  ],
  "tournament": {"name": "New hobby"}
}

Rounds:
{
  "tournament": {
    "name": "New hobby",
    "starting_date": ISODate("2024-10-12"),
    "rounds": 3,
    "type": "Teams",
    "organizer_club": {
      "name": "Chess Fans",
      "address": "Calle Rosa 5",
      "foundation_date": ISODate("2024-05-09")
    },
    "round_number": 1,
    "date": ISODate("2024-10-12"),
    "matches": [
      {
        "games": [
          {
            "white_pieces": {"nickname": "JoseLo", "full_name": "Jose Luis Lopez", "rating": 2500},
            "black_pieces": {"nickname": "AinhoaR", "full_name": "Ainhoa Rodriguez", "rating": 1500},
            "result": 0
          },
          {
            "white_pieces": {"nickname": "MarioL", "full_name": "Mario López", "rating": 700},
            "black_pieces": {"nickname": "MonicaH", "full_name": "Monica Hernández", "rating": 2500},
            "result": 1
          }
        ],
        "teams": [
          {"name": "Friends"},
          {"name": "Chess_lovers"}
        ]
      }
    ]
  }
}

Matches:
{
  "tournament": {
    "name": "New hobby",
    "starting_date": ISODate("2024-10-12"),
    "rounds": 3,
    "type": "Teams",
    "organizer_club": {
      "name": "Chess Fans",
      "address": "Calle Rosa 5",
      "foundation_date": ISODate("2024-05-09")
    },
    "round_number": 1,
    "date": ISODate("2024-10-12"),
    "matches": [
      {
        "games": [
          {
            "white_pieces": {"nickname": "JoseLo", "full_name": "Jose Luis Lopez", "rating": 2500},
            "black_pieces": {"nickname": "AinhoaR", "full_name": "Ainhoa Rodriguez", "rating": 1500},
            "result": 0
          },
          {
            "white_pieces": {"nickname": "MarioL", "full_name": "Mario López", "rating": 700},
            "black_pieces": {"nickname": "MonicaH", "full_name": "Monica Hernández", "rating": 2500},
            "result": 1
          }
        ],
        "teams": [
          {"name": "Friends"},
          {"name": "Chess_lovers"}
        ]
      }
    ]
  }
}

Games:
{
  "date": ISODate("2024-10-08T12:21:50Z"),
  "white_pieces": {
    "nickname": "JoseLo",
    "full_name": "Jose Luis Lopez",
    "rating": 2500
  },
  "black_pieces": {
    "nickname": "AinhoaR",
    "full_name": "Ainhoa Rodriguez",
    "rating": 1500
  },
  "result": "1-0",
  "comments": [
    {
      "player": { "nickname": "JoseLo" },
      "date": ISODate("2024-10-10T18:30:00Z"),
      "title": "Great Match!",
      "content": "Great match! It was a tough one, but I enjoyed it."
    }
  ]
}

Comments:
{
  "player": {
    "nickname": "JoseLo"
  },
  "date": ISODate("2024-10-10T18:30:00Z"),
  "title": "Great Match!",
  "content": "Great match! It was a tough one, but I enjoyed it.",
  "game": {
    "date": ISODate("2024-10-08T12:21:50Z"),
    "white_pieces": {
      "nickname": "JoseLo",
      "full_name": "Jose Luis Lopez",
      "rating": 2500
    },
    "black_pieces": {
      "nickname": "AinhoaR",
      "full_name": "Ainhoa Rodriguez",
      "rating": 1500
    },
    "result": "0-1"
  }
}
*/

/*
Embedding and Justifications:
Since players are associated with different clubs, storing club names in the player document is efficient, for example in queries where we want to know the clubs in which a player is.
Since players participate in tournaments, storing players' nicknames in the participants array of tournaments makes it easy to query participants of a tournament.
Since teams are groups of players, players are stored in the teams document.
Since matches can have multiple games, we should store games in matches, to query the games that have been played easily.
Since comments are made by a specific player in a specific game, we should store this as well, in order to query comments by someone, or at some game.
Since we may need to search for all the comments made in a game, we may store comments into games as well.
Since teams participate in specific tournaments: we store a reference to the tournament in the team document to identify which tournament a team belongs to.
Since rounds are part of a tournament, we include this reference as well.
Since matches belong to a tournament, it makes it more efficient to query to which tournament a match belongs to.
*/

// II. Insert Statements:
use('chess_db');

db.players.createIndex({ "nickname": 1 }, { unique: true }); // uniqueness of the index

db.players.insertOne({
  "nickname": "DavidM",
  "full_name": "David Martin",
  "birth": ISODate("2005-06-17"),
  "rating": 1000,
  "clubs": [
    {"name": "Chess Fans", "address": "Calle Rosa 5", "foundation_date": ISODate("2024-05-09")},
    {"name": "Besties", "address": "Calle Tulipán 3", "foundation_date": ISODate("2022-03-19")}
  ]
});

db.clubs.insertOne({
  "name": "Chess Fans",
  "address": "Calle Rosa 5",
  "active_members": [
    {"nickname": "DavidM", "full_name": "David Martin", "rating": 1000},
    {"nickname": "AinhoaR", "full_name": "Ainhoa Rodriguez", "rating": 1500}
  ],
  "foundation_date": ISODate("2024-05-09")
});

db.tournaments.insertOne({
  "name": "New hobby",
  "starting_date": ISODate("2024-10-12"),
  "rounds": 3,
  "type": "Teams",
  "organizer_club": {
    "name": "Chess Fans",
    "address": "Calle Rosa 5",
    "foundation_date": ISODate("2024-05-09")
  },
  "participants": [
    { "name": "Friends", "players": [{"nickname": "MarioL"}, {"nickname": "AinhoaR"}, {"nickname": "DavidM"}] },
    { "name": "Chess_lovers", "players": [{"nickname": "SandraW"}, {"nickname": "JoseLo"}, {"nickname": "MonicaH"}] }
  ]
}
);

db.teams.insertOne({
  "name": "Friends",
  "players": [
    {"nickname": "MarioL", "full_name": "Mario López", "rating": 700},
    {"nickname": "AinhoaR", "full_name": "Ainhoa Rodriguez", "rating": 1500},
    {"nickname": "DavidM", "full_name": "David Martin", "rating": 1000}
  ],
  "tournament": {"name": "New hobby"}
}
);

db.rounds.insertOne({
  "tournament": {
    "name": "New hobby",
    "starting_date": ISODate("2024-10-12"),
    "rounds": 3,
    "type": "Teams",
    "organizer_club": {
      "name": "Chess Fans",
      "address": "Calle Rosa 5",
      "foundation_date": ISODate("2024-05-09")
    },
    "round_number": 1,
    "date": ISODate("2024-10-12"),
    "matches": [
      {
        "games": [
          {
            "white_pieces": {"nickname": "JoseLo", "full_name": "Jose Luis Lopez", "rating": 2500},
            "black_pieces": {"nickname": "AinhoaR", "full_name": "Ainhoa Rodriguez", "rating": 1500},
            "result": "1-0"
          },
          {
            "white_pieces": {"nickname": "MarioL", "full_name": "Mario López", "rating": 700},
            "black_pieces": {"nickname": "MonicaH", "full_name": "Monica Hernández", "rating": 2500},
            "result": "0-1"
          }
        ],
        "teams": [
          {"name": "Friends"},
          {"name": "Chess_lovers"}
        ]
      }
    ]
  }
});

db.matches.insertOne({
  "tournament": {
    "name": "New hobby",
    "starting_date": ISODate("2024-10-12"),
    "rounds": 3,
    "type": "Teams",
    "organizer_club": {
      "name": "Chess Fans",
      "address": "Calle Rosa 5",
      "foundation_date": ISODate("2024-05-09")
    },
    "round_number": 1,
    "date": ISODate("2024-10-12"),
    "matches": [
      {
        "games": [
          {
            "white_pieces": {"nickname": "JoseLo", "full_name": "Jose Luis Lopez", "rating": 2500},
            "black_pieces": {"nickname": "AinhoaR", "full_name": "Ainhoa Rodriguez", "rating": 1500},
            "result": "1-0"
          },
          {
            "white_pieces": {"nickname": "MarioL", "full_name": "Mario López", "rating": 700},
            "black_pieces": {"nickname": "MonicaH", "full_name": "Monica Hernández", "rating": 2500},
            "result": "0-1"
          }
        ],
        "teams": [
          {"name": "Friends"},
          {"name": "Chess_lovers"}
        ]
      }
    ]
  }
});

db.games.insertOne({
  "date": ISODate("2024-10-08T12:21:50Z"),
  "white_pieces": {
    "nickname": "JoseLo",
    "full_name": "Jose Luis Lopez",
    "rating": 2500
  },
  "black_pieces": {
    "nickname": "AinhoaR",
    "full_name": "Ainhoa Rodriguez",
    "rating": 1500
  },
  "result": "1-0",
  "comments": [
    {
      "player": { "nickname": "JoseLo" },
      "date": ISODate("2024-10-10T18:30:00Z"),
      "title": "Great Match!",
      "content": "Great match! It was a tough one, but I enjoyed it."
    }
  ]
}
);

db.comments.insertOne({
  "player": {
    "nickname": "JoseLo"
  },
  "date": ISODate("2024-10-10T18:30:00Z"),
  "title": "Great Match!",
  "content": "Great match! It was a tough one, but I enjoyed it.",
  "game": {
    "date": ISODate("2024-10-08T12:21:50Z"),
    "white_pieces": {
      "nickname": "JoseLo",
      "full_name": "Jose Luis Lopez",
      "rating": 2500
    },
    "black_pieces": {
      "nickname": "AinhoaR",
      "full_name": "Ainhoa Rodriguez",
      "rating": 1500
    },
    "result": "0-1"
  }
});

db.players.insertMany([
  {
    "nickname": "CarlosG",
    "full_name": "Carlos González",
    "birth": ISODate("1997-03-05"),
    "rating": 1300,
    "clubs": [
      { "name": "Chess Knights", "address": "Calle Granate 8", "foundation_date": ISODate("2020-11-15") },
      { "name": "Royal Queens", "address": "Calle Azul 10", "foundation_date": ISODate("2019-07-22") }
    ]
  },
  {
    "nickname": "SofiaM",
    "full_name": "Sofía Morales",
    "birth": ISODate("2002-06-22"),
    "rating": 1600,
    "clubs": [
      { "name": "Chess Kings", "address": "Calle Violeta 12", "foundation_date": ISODate("2018-09-10") },
      { "name": "Chess Fans", "address": "Calle Rosa 5", "foundation_date": ISODate("2024-05-09") }
    ]
  },
  {
    "nickname": "LuisP",
    "full_name": "Luis Pérez",
    "birth": ISODate("1995-01-10"),
    "rating": 1800,
    "clubs": [
      { "name": "Besties", "address": "Calle Tulipán 3", "foundation_date": ISODate("2022-03-19") },
      { "name": "Chess Knights", "address": "Calle Granate 8", "foundation_date": ISODate("2020-11-15") }
    ]
  },
  {
    "nickname": "IsabelC",
    "full_name": "Isabel Castillo",
    "birth": ISODate("1990-12-14"),
    "rating": 2200,
    "clubs": [
      { "name": "Chess Kings", "address": "Calle Violeta 12", "foundation_date": ISODate("2018-09-10") }
    ]
  },
  {
    "nickname": "VictorR",
    "full_name": "Víctor Rodríguez",
    "birth": ISODate("1988-04-30"),
    "rating": 2100,
    "clubs": [
      { "name": "Chess Lovers", "address": "Calle Granada 9", "foundation_date": ISODate("2021-06-12") },
      { "name": "Royal Queens", "address": "Calle Azul 10", "foundation_date": ISODate("2019-07-22") }
    ]
  },
  {
    "nickname": "MonicaH",
    "full_name": "Mónica Hernández",
    "birth": ISODate("2000-05-15"),
    "rating": 1500,
    "clubs": [
      { "name": "Chess Lovers", "address": "Calle Granada 9", "foundation_date": ISODate("2021-06-12") },
      { "name": "Besties", "address": "Calle Tulipán 3", "foundation_date": ISODate("2022-03-19") }
    ]
  },
  {
    "nickname": "SandraW",
    "full_name": "Sandra Wilson",
    "birth": ISODate("1993-11-20"),
    "rating": 1400,
    "clubs": [
      { "name": "Chess Fans", "address": "Calle Rosa 5", "foundation_date": ISODate("2024-05-09") },
      { "name": "Chess Lovers", "address": "Calle Granada 9", "foundation_date": ISODate("2021-06-12") }
    ]
  },
  {
    "nickname": "JoseLo",
    "full_name": "Jose Luis Lopez",
    "birth": ISODate("2004-01-10"),
    "rating": 2500,
    "clubs": [
      { "name": "Royal Queens", "address": "Calle Azul 10", "foundation_date": ISODate("2019-07-22") }
    ]
  },
  {
    "nickname": "AinhoaR",
    "full_name": "Ainhoa Rodríguez",
    "birth": ISODate("1996-09-11"),
    "rating": 1500,
    "clubs": [
      { "name": "Chess Fans", "address": "Calle Rosa 5", "foundation_date": ISODate("2024-05-09") },
      { "name": "Besties", "address": "Calle Tulipán 3", "foundation_date": ISODate("2022-03-19") }
    ]
  }
]);

db.tournaments.insertMany([
  {
    "name": "Autumn Tournament",
    "starting_date": ISODate("2024-10-01"),
    "rounds": 3,
    "type": "Individual",
    "organizer_club": {
      "name": "Chess Knights",
      "address": "Calle Granate 8",
      "foundation_date": ISODate("2020-11-15")
    },
    "participants": [
      { "nickname": "CarlosG", "full_name": "Carlos González", "rating": 1300 },
      { "nickname": "SofiaM", "full_name": "Sofía Morales", "rating": 1600 },
      { "nickname": "LuisP", "full_name": "Luis Pérez", "rating": 1800 },
      { "nickname": "IsabelC", "full_name": "Isabel Castillo", "rating": 2200 }
    ]
  },
  {
    "name": "Team Battle Championship",
    "starting_date": ISODate("2024-12-01"),
    "rounds": 4,
    "type": "Teams",
    "organizer_club": {
      "name": "Chess Lovers",
      "address": "Calle Granada 9",
      "foundation_date": ISODate("2021-06-12")
    },
    "participants": [
      { "name": "Team A", "players": [{ "nickname": "CarlosG" }, { "nickname": "SofiaM" }, { "nickname": "LuisP" }] },
      { "name": "Team B", "players": [{ "nickname": "VictorR" }, { "nickname": "MonicaH" }, { "nickname": "SandraW" }] },
      { "name": "Team C", "players": [{ "nickname": "JoseLo" }, { "nickname": "DavidM" }, { "nickname": "AinhoaR" }] }
    ]
  },
  {
    "name": "International Challenge",
    "starting_date": ISODate("2024-09-15"),
    "rounds": 4,
    "type": "Individual",
    "organizer_club": {
      "name": "Besties",
      "address": "Calle Tulipán 3",
      "foundation_date": ISODate("2022-03-19")
    },
    "participants": [
      { "nickname": "DavidM", "full_name": "David Martin", "rating": 1000 },
      { "nickname": "AinhoaR", "full_name": "Ainhoa Rodríguez", "rating": 1500 },
      { "nickname": "LuisP", "full_name": "Luis Pérez", "rating": 1800 }
    ]
  },
  {
    "name": "Spring Masters",
    "starting_date": ISODate("2024-05-05"),
    "rounds": 3,
    "type": "Individual",
    "organizer_club": {
      "name": "Royal Queens",
      "address": "Calle Azul 10",
      "foundation_date": ISODate("2019-07-22")
    },
    "participants": [
      { "nickname": "SofiaM", "full_name": "Sofía Morales", "rating": 1600 },
      { "nickname": "CarlosG", "full_name": "Carlos González", "rating": 1300 },
      { "nickname": "VictorR", "full_name": "Víctor Rodríguez", "rating": 2100 }
    ]
  },
  {
    "name": "Summer Knockout",
    "starting_date": ISODate("2024-06-10"),
    "rounds": 2,
    "type": "Individual",
    "organizer_club": {
      "name": "Chess Fans",
      "address": "Calle Rosa 5",
      "foundation_date": ISODate("2024-05-09")
    },
    "participants": [
      { "nickname": "MonicaH", "full_name": "Mónica Hernández", "rating": 1500 },
      { "nickname": "SandraW", "full_name": "Sandra Wilson", "rating": 1400 },
      { "nickname": "DavidM", "full_name": "David Martin", "rating": 1000 }
    ]
  }
]);

db.games.insertMany([
  {
    "date": ISODate("2024-10-10T14:00:00Z"),
    "white_pieces": { "nickname": "JoseLo", "full_name": "Jose Luis Lopez", "rating": 2500 },
    "black_pieces": { "nickname": "CarlosG", "full_name": "Carlos González", "rating": 1300 },
    "result": "1-0",
    "comments": [
      {
        "player": { "nickname": "JoseLo" },
        "date": ISODate("2024-10-10T14:15:00Z"),
        "title": "Good game!",
        "content": "It was a tough match, but I managed to win. Thanks for the challenge, Carlos!"
      },
      {
        "player": { "nickname": "CarlosG" },
        "date": ISODate("2024-10-10T14:20:00Z"),
        "title": "Well played",
        "content": "I made a few mistakes, but it was a fun game. I'll be more prepared next time!"
      }
    ]
  },
  {
    "date": ISODate("2024-10-10T14:30:00Z"),
    "white_pieces": { "nickname": "VictorR", "full_name": "Víctor Rodríguez", "rating": 2100 },
    "black_pieces": { "nickname": "SofiaM", "full_name": "Sofía Morales", "rating": 1600 },
    "result": "1-0",
    "comments": [
      {
        "player": { "nickname": "VictorR" },
        "date": ISODate("2024-10-10T14:45:00Z"),
        "title": "Tough match",
        "content": "It was a close one! I thought I had it, but Sofia was relentless. Looking forward to our next game."
      }
    ]
  },
  {
    "date": ISODate("2024-10-12T16:00:00Z"),
    "white_pieces": { "nickname": "LuisP", "full_name": "Luis Pérez", "rating": 1800 },
    "black_pieces": { "nickname": "AinhoaR", "full_name": "Ainhoa Rodríguez", "rating": 1500 },
    "result": "0-1",
    "comments": []
  },
  {
    "date": ISODate("2024-10-12T16:30:00Z"),
    "white_pieces": { "nickname": "MonicaH", "full_name": "Mónica Hernández", "rating": 1500 },
    "black_pieces": { "nickname": "DavidM", "full_name": "David Martin", "rating": 1000 },
    "result": "1-0",
    "comments": [
      {
        "player": { "nickname": "MonicaH" },
        "date": ISODate("2024-10-12T16:40:00Z"),
        "title": "Interesting game",
        "content": "I had the advantage early on, but I lost focus towards the end. David, you played really well!"
      }
    ]
  },
  {
    "date": ISODate("2024-10-15T18:00:00Z"),
    "white_pieces": { "nickname": "IsabelC", "full_name": "Isabel Castillo", "rating": 2200 },
    "black_pieces": { "nickname": "SandraW", "full_name": "Sandra Wilson", "rating": 1400 },
    "result": "0-1",
    "comments": []
  },
  {
    "date": ISODate("2024-10-15T18:30:00Z"),
    "white_pieces": { "nickname": "JoseLo", "full_name": "Jose Luis Lopez", "rating": 2500 },
    "black_pieces": { "nickname": "VictorR", "full_name": "Víctor Rodríguez", "rating": 2100 },
    "result": "1-0",
    "comments": [
      {
        "player": { "nickname": "JoseLo" },
        "date": ISODate("2024-10-15T18:45:00Z"),
        "title": "Tough opponent",
        "content": "Victor, you really pushed me to my limits in this one. I'll make sure to improve my opening strategy."
      },
      {
        "player": { "nickname": "VictorR" },
        "date": ISODate("2024-10-15T18:50:00Z"),
        "title": "Close match!",
        "content": "I had a few chances, but Lucia played really solidly. Well deserved win!"
      }
    ]
  }
]);

db.comments.insertMany([
  {
    "player": { "nickname": "JoseLo" },
    "date": ISODate("2024-10-10T14:15:00Z"),
    "title": "Good game!",
    "content": "It was a tough match, but I managed to win. Thanks for the challenge, Carlos!",
    "game": {
      "date": ISODate("2024-10-10T14:00:00Z"),
      "white_pieces": { "nickname": "JoseLo", "full_name": "Jose Luis Lopez", "rating": 2500 },
      "black_pieces": { "nickname": "CarlosG", "full_name": "Carlos González", "rating": 1300 },
      "result": "1-0"
    }
  },
  {
    "player": { "nickname": "CarlosG" },
    "date": ISODate("2024-10-10T14:20:00Z"),
    "title": "Well played",
    "content": "I made a few mistakes, but it was a fun game. I'll be more prepared next time!",
    "game": {
      "date": ISODate("2024-10-10T14:00:00Z"),
      "white_pieces": { "nickname": "JoseLo", "full_name": "Jose Luis Lopez", "rating": 2500 },
      "black_pieces": { "nickname": "CarlosG", "full_name": "Carlos González", "rating": 1300 },
      "result": "1-0"
    }
  },
  {
    "player": { "nickname": "VictorR" },
    "date": ISODate("2024-10-10T14:45:00Z"),
    "title": "Tough match",
    "content": "It was a close one! I thought I had it, but Sofia was relentless. Looking forward to our next game.",
    "game": {
      "date": ISODate("2024-10-10T14:30:00Z"),
      "white_pieces": { "nickname": "VictorR", "full_name": "Víctor Rodríguez", "rating": 2100 },
      "black_pieces": { "nickname": "SofiaM", "full_name": "Sofía Morales", "rating": 1600 },
      "result": "1-0"
    }
  },
  {
    "player": { "nickname": "MonicaH" },
    "date": ISODate("2024-10-12T16:40:00Z"),
    "title": "Interesting game",
    "content": "I had the advantage early on, but I lost focus towards the end. David, you played really well!",
    "game": {
      "date": ISODate("2024-10-12T16:30:00Z"),
      "white_pieces": { "nickname": "MonicaH", "full_name": "Mónica Hernández", "rating": 1500 },
      "black_pieces": { "nickname": "DavidM", "full_name": "David Martin", "rating": 1000 },
      "result": "1-0"
    }
  },
  {
    "player": { "nickname": "JoseLo" },
    "date": ISODate("2024-10-15T18:45:00Z"),
    "title": "Tough opponent",
    "content": "Victor, you really pushed me to my limits in this one. I'll make sure to improve my opening strategy.",
    "game": {
      "date": ISODate("2024-10-15T18:30:00Z"),
      "white_pieces": { "nickname": "JoseLo", "full_name": "Jose Luis Lopez", "rating": 2500 },
      "black_pieces": { "nickname": "VictorR", "full_name": "Víctor Rodríguez", "rating": 2100 },
      "result": "1-0"
    }
  },
  {
    "player": { "nickname": "VictorR" },
    "date": ISODate("2024-10-15T18:50:00Z"),
    "title": "Close match!",
    "content": "I had a few chances, but Lucia played really solidly. Well deserved win!",
    "game": {
      "date": ISODate("2024-10-15T18:30:00Z"),
      "white_pieces": { "nickname": "JoseLo", "full_name": "Jose Luis Lopez", "rating": 2500 },
      "black_pieces": { "nickname": "VictorR", "full_name": "Víctor Rodríguez", "rating": 2100 },
      "result": "1-0"
    }
  }
]);


// III. Queries Statements:

// 3. MongoDB query to find all tournaments organized by a specific club.

db.tournaments.find({"organizer_club.name": "Chess Fans"});
db.tournaments.find({"organizer_club.name": "Royal Queens"});
db.tournaments.find({"organizer_club.name": "Chess Kings"}); // 0 tournaments



// 4. MongoDB update operation to add a new comment to an existing game.

db.games.updateOne(
  {
    "white_pieces.nickname": "JoseLo",
    "black_pieces.nickname": "CarlosG",
    "date": ISODate("2024-10-10T14:00:00Z")
  },
  {
    $push: {
      "comments": {
        "player": { "nickname": "CarlosG" },
        "date": ISODate("2024-10-10T14:25:00Z"),
        "title": "New commenttt",
        "content": "Siuuuuu"
      }
    }
  }
);

db.games.find({"comments.content": "Siuuuuu"});


// 5. MongoDB query to find all games played by a specic player's full name, i.e. "Jose Luis Lopez".

db.games.find({
  $or: [
    { "white_pieces.full_name": "Jose Luis Lopez" },
    { "black_pieces.full_name": "Jose Luis Lopez" }
  ]
});


// 6. MongoDB aggregation to count the number of tournaments each player has played. Consider both individual and team tournaments.

db.tournaments.aggregate([
  {
    $unwind: "$participants"
  },
  {
    $project: {
      playerNicknames: {
        $cond: {
          if: { $isArray: "$participants.players" },
          then: "$participants.players.nickname",
          else: ["$participants.nickname"]
        }
      }
    }
  },
  {
    $unwind: "$playerNicknames"
  },
  {
    $group: {
      _id: "$playerNicknames",
      tournamentCount: { $sum: 1 }
    }
  }
]);

