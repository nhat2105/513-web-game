const express = require("express");
const authRoute = require("./authRoutes")

const router = express.Router();

router.use(authRoute);

module.exports = router;