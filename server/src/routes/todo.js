const express = require("express");
const router = express.Router();
const {
  postTodo,
  getTodos,
  getTodosByFolderId,
  putTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.post("/", postTodo);
router.get("/", getTodosByFolderId);
router.put("/", putTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
