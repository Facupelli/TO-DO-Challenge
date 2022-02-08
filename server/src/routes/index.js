const { Router } = require("express");

const folder = require("./folder");

const router = Router();

router.use("/folder", folder);

module.exports = router;
