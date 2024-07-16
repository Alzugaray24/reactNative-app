import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase(`sessions.db`);

export const init = () => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL)",
        [],
        () => res(),
        (_, err) => rej(err)
      );

      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS favorites (id TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL, image TEXT NOT NULL, localId TEXT NOT NULL)",
        [],
        () => res(),
        (_, err) => rej(err)
      );
    });
  });
  return promise;
};

export const addLocalIdColumnToFavorites = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `PRAGMA table_info(favorites);`,
        [],
        (_, { rows }) => {
          const columns = rows._array.map((column) => column.name);
          if (!columns.includes("localId")) {
            tx.executeSql(
              "ALTER TABLE favorites ADD COLUMN localId TEXT NOT NULL;",
              [],
              () => resolve(),
              (_, error) => reject(error)
            );
          } else {
            resolve();
          }
        },
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

export const deleteDatabase = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE IF EXISTS favorites;",
        [],
        () => resolve("Database deleted successfully"),
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

export const insertSession = ({ email, localId, token }) => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO sessions (email, localId, token) VALUES (?,?,?);",
        [email, localId, token],
        (_, result) => res(result),
        (_, err) => rej(err)
      );
    });
  });

  return promise;
};

export const querySessions = () => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM sessions;",
        [],
        (_, { rows }) => res(rows._array),
        (_, err) => rej(err)
      );
    });
  });

  return promise;
};

export const insertFavorite = ({ localId, title, image, id }) => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO favorites (localId, title, image, id) VALUES (?, ?, ?, ?);",
        [localId, title, image, id],
        (_, result) => res(result),
        (_, err) => rej(err)
      );
    });
  });
  return promise;
};

export const queryFavorites = (localId) => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM favorites WHERE localId = ?;",
        [localId],
        (_, { rows }) => res(rows._array),
        (_, err) => rej(err)
      );
    });
  });

  return promise;
};

export const deleteAllFavorites = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM favorites;",
        [],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

export const deleteFavorite = ({ id }) => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM favorites WHERE id = ?;",
        [id],
        (_, result) => res(result),
        (_, err) => rej(err)
      );
    });
  });
  return promise;
};

export const getDatabaseInfo = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "PRAGMA table_info(favorites);",
        [],
        (_, result) => {
          const rows = result.rows;
          const columns = [];
          for (let i = 0; i < rows.length; i++) {
            columns.push(rows.item(i));
          }
          resolve(columns);
        },
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

export const logoutSession = (localId) => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM sessions WHERE localId = ?;",
        [localId],
        (_, result) => res(result),
        (_, err) => rej(err)
      );
    });
  });

  return promise;
};
