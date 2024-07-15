const { getPostsDb } = require("./db/postsDb.service");

exports.getPosts = async (req, res, next) => {
  const { page, pageSize } = req.query;

  getPostsDb(page, pageSize, (err, results) => {
    if (err) {
      console.log("Error: ", err);
      return;
    }

    res.status(200).send(results);
  });
};
