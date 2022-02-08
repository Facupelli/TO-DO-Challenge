const express = require("express");
const router = express.Router();
const { postTodo, getTodos, getTodosByFolderId, putTodo } = require("../controllers/todoController");

router.post("/", postTodo);
router.get("/", getTodosByFolderId);
router.put('/', putTodo)


module.exports = router;
