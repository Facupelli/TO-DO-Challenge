const { Todo, Folder } = require("../db");

const postTodo = async (req, res, next) => {
  try {
    const todo = {
      name: req.body.todo_name,
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

const putTodo = async (req, res, next) => {
  try {
    const { todoId, done } = req.body;

    if (todoId) {
      const todo = await Todo.findByPk(todoId);
      if (todo) {
        if (done) {
          todo.done = done;
          await todo.save();
          res.json({ message: "Successfully edited todo" });
        }
      }
    } else {
      res.status(400).json({ message: "Todo id is required" });
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

const getTodosByFolderId = async (req, res, next) => {
  try {
    const folderId = req.query.id;

    const todos = await Folder.findAll({
      where: {
        id: folderId,
      },
      include: { model: Todo, as: "todoFolder" },
    });
    todos
      ? res.status(200).json(todos)
      : res.status(500).json({ message: "cannot get" });
  } catch (e) {
    next(e);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const todoId = req.body.todoId;

    if (todoId) {
      const todo = await Todo.findByPk(todoId);
      if (todo) {
        await Todo.destroy({
          where: {id: todoId}
        })
        res.json({ message: "todo deleted" });
      }
    } else {
      res.status(400).json({ message: "Todo id is required" });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { postTodo, getTodos, getTodosByFolderId, putTodo, deleteTodo };
