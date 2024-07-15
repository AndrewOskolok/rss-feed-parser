exports.defaultRoute = async (req, res) => {
  res.status(200).send("Server available");
};

exports.restrictedRoute = async (req, res) => {
  res.status(403).send("Access denied");
};

exports.nonExistentRoute = async (req, res) => {
  const { method, originalUrl } = req;
  console.log(`${method} ${originalUrl} - Route doesn't exist`);
  res.status(404).send("Route doesn't exist");
};
