const express = require("express");
const router = express.Router();
const { postTodo, getTodos } = require("../controllers/todoController");

router.post("/", postTodo);
router.get("/", getTodos);

module.exports = router;
