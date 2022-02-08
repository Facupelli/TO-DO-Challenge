const express = require("express");
const router = express.Router();
const { postTodo, getTodos, getTodosByFolderId } = require("../controllers/todoController");

router.post("/", postTodo);
router.get("/", getTodosByFolderId);


module.exports = router;
