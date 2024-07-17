import * as SQLite from "expo-sqlite";

const favoritesDb = SQLite.openDatabase(`favorites.db`);

export const initFavoritesDb = () => {
  const promise = new Promise((res, rej) => {
    favoritesDb.transaction((tx) => {
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

export const insertFavorite = ({ localId, title, image, id }) => {
  const promise = new Promise((res, rej) => {
    favoritesDb.transaction((tx) => {
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

export const getAllFavorites = () => {
  return new Promise((resolve, reject) => {
    favoritesDb.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM favorites;",
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const queryFavorites = (localId) => {
  const promise = new Promise((res, rej) => {
    favoritesDb.transaction((tx) => {
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
    favoritesDb.transaction((tx) => {
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
    favoritesDb.transaction((tx) => {
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
    favoritesDb.transaction((tx) => {
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

export const logoutFavorites = (localId) => {
  const promise = new Promise((res, rej) => {
    favoritesDb.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM favorites WHERE localId = ?;",
        [localId],
        (_, result) => res(result),
        (_, err) => rej(err)
      );
    });
  });
};
