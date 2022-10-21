const sqlite3 = require("sqlite3").verbose();

function openLibraryDatabase(path) {

  const database = new sqlite3.Database(path);

  // ensure that foreign keys are respected.
  database.run(`
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
  `);

  // Do this before the main process is stopped.  We want to make sure that we
  // close the database file in case the server is stopped. The lines below will
  // setup a callback to be invoked just before the process is stopped.
  // This ensures that if someone uses 'kill' or Ctrl+C on our process we will
  // not leave the database in a corrupted state.
  process.on("exit", () => {
    console.log("closing database");
    database.close(() => {
      console.log("database closed");
    });
  });

  return database;
}

function createMusicTables(database) {
  database.run(`
    CREATE TABLE IF NOT EXISTS User
      ( User_Id      INTEGER
      , Name         TEXT
      , Email        TEXT
      , Photo        TEXT
      , PRIMARY KEY (User_Id)
      );
  `);

  database.run(`
    CREATE TABLE IF NOT EXISTS Library_Song
      ( Library_Song_Id   INTEGER
      , User_Id           INTEGER
      , Song_Id           INTEGER
      , PRIMARY KEY (Library_Song_Id)
      , FOREIGN KEY (User_Id) REFERENCES User (User_Id)
      , FOREIGN KEY (Song_Id) REFERENCES Song (Song_Id)
      );
  `);

  database.run(`
    CREATE TABLE IF NOT EXISTS Library_Playlist
      ( Library_Playlist_Id   INTEGER
      , User_Id               INTEGER
      , Playlist_Id           INTEGER
      , PRIMARY KEY (Library_Playlist_Id)
      , FOREIGN KEY (User_Id) REFERENCES User (User_Id)
      , FOREIGN KEY (Playlist_Id) REFERENCES Playlist (Playlist_Id)
      );
  `);

  database.run(`
    CREATE TABLE IF NOT EXISTS Playlist_Song
      ( Playlist_Song_Id     INTEGER
      , Song_Id              INTEGER
      , Playlist_Id          INTEGER
      , PRIMARY KEY (Playlist_Song_Id)
      , FOREIGN KEY (Song_Id) REFERENCES Song (Song_Id)
      , FOREIGN KEY (Playlist_Id) REFERENCES Song (Playlist_Id)
      );
  `);

  database.run(`
    CREATE TABLE IF NOT EXISTS Playlist
      ( Playlist_Id      INTEGER
      , Name             TEXT
      , Created_Date     INTEGER
      , User_Id          INTEGER
      , Password         TEXT
      , PRIMARY KEY (Playlist_Id)
      , FOREIGN KEY (User_Id) REFERENCES User (User_Id)
      );
  `);

  database.run(`
    CREATE TABLE IF NOT EXISTS Album
      ( Album_Id     INTEGER
      , Name         TEXT
      , PRIMARY KEY (Album_Id)
      );
  `);

  database.run(`
    CREATE TABLE IF NOT EXISTS Artist
      ( Artist_Id      INTEGER
      , Name           TEXT
      , Photo          TEXT
      , PRIMARY KEY (Artist_Id)
      );
  `);

  database.run(`
    CREATE TABLE IF NOT EXISTS Song
      ( Song_Id      INTEGER
      , Name         TEXT
      , Artist_Id    INTEGER
      , Album_Id     INTEGER
      , PRIMARY KEY (Song_Id)
      , FOREIGN KEY (Album_Id) REFERENCES Album (Album_Id)
      );
  `);

  database.run(`
    CREATE TABLE IF NOT EXISTS Song_Artist
      ( Song_Artist_Id     INTEGER
      , Song_Id            INTEGER
      , Artist_Id          INTEGER
      , PRIMARY KEY (Song_Artist_Id)
      , FOREIGN KEY (Song_Id) REFERENCES Song (Song_Id)
      , FOREIGN KEY (Artist_Id) REFERENCES Artist (Artist_Id)
      );
  `);

  database.run(`
    CREATE TABLE IF NOT EXISTS Album_Artist
      ( Album_Artist_Id     INTEGER
      , Artist_Id            INTEGER
      , Album_Id          INTEGER
      , PRIMARY KEY (Album_Artist_Id)
      , FOREIGN KEY (Artist_Id) REFERENCES Artist (Artist_Id)
      , FOREIGN KEY (Album_Id) REFERENCES Album (Album_Id)
      );
  `);
}

function insertValues(database) {

  database.run(`

    INSERT INTO Album
    (Name)
    VALUES
      ("I'm Alergic to Dogs!"),
      ("In Utero"),
      ("Nevermind"),
      ("The Colour And The Shape"),
      ("Echoes, Silence, Patience & Grace");

  `);

  database.run(`
    
    INSERT INTO Artist
      (Name)
      VALUES
        ("Remi Wolf"),
        ("Nirvana"),
        ("Foo Fighters");
  `);

  database.run(`

    INSERT INTO Song
      (Name, Album_Id, Artist_Id)
      VALUES
          ("Woo!", 1, 1);
  `);

  database.run(`
    INSERT INTO Song
      (Name, Album_Id, Artist_Id)
      VALUES
          ("Heart-Shaped Box", 2, 2);
  `);

  database.run(`
    INSERT INTO Song
      (Name, Album_Id, Artist_Id)
      VALUES
          ("Smells Like Teen Spirit", 3, 2);
  `);

  database.run(`
    INSERT INTO Song
      (Name, Album_Id, Artist_Id)
      VALUES       
          ("Come As You Are", 3, 2);
  `);

  database.run(`
    INSERT INTO Song
      (Name, Album_Id, Artist_Id)
      VALUES       
          ("Lithium", 3, 2);
  `);

  database.run(`
    INSERT INTO Song
      (Name, Album_Id, Artist_Id)
      VALUES       
          ("Everlong", 4, 3);
  `);

  database.run(`
    INSERT INTO Song
      (Name, Album_Id, Artist_Id)
      VALUES       
          ("My Hero", 4, 3);
  `);

  database.run(`
    INSERT INTO Song
      (Name, Album_Id, Artist_Id)
      VALUES       
          ("THe Pretender", 5, 3);
    
  `);
}

function createTestDb(path) {

  const db = openLibraryDatabase(path);
  createMusicTables(db);
  insertValues(db);

  console.log(`test data base created at ${path}`);
}

module.exports = {
  openLibraryDatabase : openLibraryDatabase,
  createMusicTables : createMusicTables,
  insertValues : insertValues,
  createTestDb : createTestDb
};
