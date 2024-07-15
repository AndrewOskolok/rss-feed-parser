const { addPostDb, getPostByUuidDb } = require("../routes/db/postsDb.service");

exports.handleParsedPosts = async (posts) => {
  const reversedPosts = posts.reverse();
  let int = 0;

  await Promise.all(
    reversedPosts.map((post) => {
      setTimeout(() => {
        getPostByUuidDb(post.guid, (err, exists) => {
          if (err) {
            console.log("Error: ", err);
            return;
          }

          if (!exists) {
            addPostDb(post, (err, _results) => {
              if (err) {
                console.log("Error: ", err);
                return;
              }
            });
          }
        });
      }, 200 * int);
      int += 1;
    })
  );
};
