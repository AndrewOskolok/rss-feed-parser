const moment = require("moment");
const { dbConnection } = require("../../../helpers/db.helper");

exports.addPostDb = (postData, callback) => {
  const connection = dbConnection();
  const query = `
  INSERT INTO posts (guid, title, pubDate, link, categories, creator, content) 
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;

  connection.query(
    query,
    [
      postData.guid,
      postData.title,
      moment(postData.pubDate).format("YYYY-MM-DD HH:mm:ss"),
      postData.link,
      postData.categories,
      postData.creator,
      postData.content,
    ],
    (err, results) => {
      if (err) {
        connection.end();
        callback(err, null);
        return;
      }

      connection.end((err) => {
        if (err) {
          callback(err, null);
          return;
        }

        callback(null, results);
      });
    }
  );
};

exports.getPostsDb = (page = 0, pageSize = 10, callback) => {
  const connection = dbConnection();
  const offset = page * pageSize;
  const dataQuery =
    "SELECT * FROM posts ORDER BY pubDate DESC LIMIT ? OFFSET ?";
  const countQuery = "SELECT COUNT(*) AS totalRows FROM posts";

  connection.query(countQuery, (err, countResults) => {
    if (err) {
      callback(err);
      connection.end();
      return;
    }

    const totalRows = countResults[0].totalRows;

    connection.query(dataQuery, [pageSize, offset], (err, dataResults) => {
      if (err) {
        callback(err);
        connection.end();
        return;
      }

      connection.end((err) => {
        if (err) {
          callback(err);
          return;
        }
        callback(null, { totalRows, rows: dataResults });
      });
    });
  });
};

exports.getPostByUuidDb = (guid, callback) => {
  const connection = dbConnection();
  const query = "SELECT COUNT(*) AS count FROM posts WHERE guid = ?";

  connection.query(query, [guid], (err, results) => {
    if (err) {
      connection.end();
      callback(err, null);
      return;
    }

    const exists = results[0].count > 0;
    connection.end((err) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, exists);
    });
  });
};
