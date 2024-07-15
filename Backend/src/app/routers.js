const { Router } = require("express");

const { tryCatchWrapper } = require("../helpers/tryCatchWrapper.helper");
const { defaultRoute } = require("../helpers/specialRoute.helper");

const { getPosts } = require("../services/routes/posts.service");

const router = Router();

router.get("/", defaultRoute);
router.get("/posts", tryCatchWrapper(getPosts));

exports.routers = router;
