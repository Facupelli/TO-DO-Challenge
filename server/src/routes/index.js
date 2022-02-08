const { Router } = require("express");

const folder = require("./folder");
const todo = require('./todo')

const router = Router();

router.use("/folder", folder);
router.use("/todo", todo)

module.exports = router;
