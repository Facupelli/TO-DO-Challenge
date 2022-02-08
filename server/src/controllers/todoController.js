const { Todo } = require("../db");

const postTodo = async (req, res, next) => {
  try {
    const todo = {
      name: req.body.name,
      description: req.body.description,
      folderId: req.body.folderId,
      done: false,
    };

    const todoNameExist = await Todo.findOne({
      where: { name: todo.name },
    });

    if (todoNameExist) {
      res.status(400).json({ message: "todo name already exists" });
    } else {
      await Todo.create(todo);
      res.json({ data: "created" });
    }
  } catch (e) {
    next(e);
  }
};

const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.findAll({
    //   include: { model: User, attributes: ["username"] },
    });

    res.json(todos);
  } catch (e) {
    next(e);
  }
};

module.exports = { postTodo, getTodos };