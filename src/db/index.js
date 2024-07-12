import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase(`sessions.db`);

export const init = () => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token NOT NULL)",
        [],
        () => res(),
        (_, err) => {
          rej(err);
        }
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
