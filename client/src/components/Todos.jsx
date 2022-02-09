import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTimes,
  faSquareCheck,
  faSquare,
  faTrash,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

export const Todos = ({ todos, folderId, setTodos }) => {
  const [showAddTodo, setShowAddTodo] = useState(true);
  const [showInput, setShowInput] = useState(false);

  //HANLDE CHECKBOX -----------------------------
  const sendPut = async (id, position) => {
    await axios.put("/todo");
    console.log("LLEGUE");
    await axios
      .get(`/todo?id=${folderId}`)
      .then((res) => setTodos(res.data[0].todoFolder));
  };

  const handleChange = async (id, done) => {
    const complete = !done;
    const data = {
      todoId: id,
      done: complete,
    };

    await axios.put("/todo", data);
    await axios
      .get(`/todo?id=${folderId}`)
      .then((res) => setTodos(res.data[0].todoFolder));
  };

  //HANDLE ADD TODO ---------------------------

  const handleShowInput = () => {
    setShowInput(true);
    setShowAddTodo(false);
  };

  const handleCancelAddFolder = () => {
    setShowAddTodo(true);
    setShowInput(false);
  };

  //----------------------------------------------

  const handleDeleteTodo = async (id) => {
    await axios.delete(`/todo/${id}`);
    await axios
      .get(`/todo?id=${folderId}`)
      .then((res) => setTodos(res.data[0].todoFolder));
  };

  //REACT HOOK FORM  ------------------------------------------

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const todo = {
        todo_name: data.todo_name,
        folderId,
      };
      const response = await axios.post("/todo", todo);
      reset();
      handleCancelAddFolder();
      axios
        .get(`/todo?id=${folderId}`)
        .then((res) => setTodos(res.data[0].todoFolder));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>
        {showAddTodo && (
          <div
            onClick={handleShowInput}
            className="flex items-center gap-2 font-bold mb-4 transition ease-in-out duration-200 cursor-pointer hover:text-mainDark"
          >
            <p className="text-2xl">ADD TODO</p>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        )}
        {showInput && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2 mb-4">
              <input
                autoFocus
                type="text"
                placeholder="todo..."
                required
                {...register("todo_name")}
                className="appearance-none p-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="submit"
                className=" font-semibold bg-mainDark transition ease-in-out duration-200 hover:bg-secondary px-2 rounded text-white"
              >
                ADD
              </button>
              <FontAwesomeIcon
                onClick={handleCancelAddFolder}
                icon={faTimes}
                size="xl"
                className="ml-2 cursor-pointer self-center"
              />
            </div>
          </form>
        )}
      </div>
      <div>
        {todos &&
          todos.length > 0 &&
          todos.map((el, index) => (
            <div
              key={el.id}
              className="bg-main  rounded mt-2 p-2 flex items-center"
            >
              <p
                className={`${
                  el.done === true ? "line-through" : ""
                } mr-auto text-xl `}
              >
                {el.name}
              </p>
              <button onClick={() => handleDeleteTodo(el.id)}>
                <FontAwesomeIcon
                  onClick={handleCancelAddFolder}
                  icon={faEllipsisH}
                  size="lg"
                  className="text-secondary hover:text-red-500 mr-6"
                />
              </button>
              <button onClick={() => handleChange(el.id, el.done)}>
                {el.done === true ? (
                  <FontAwesomeIcon
                    onClick={handleCancelAddFolder}
                    icon={faSquareCheck}
                    size="lg"
                    className="text-secondary "
                  />
                ) : (
                  <FontAwesomeIcon
                    onClick={handleCancelAddFolder}
                    icon={faSquare}
                    size="lg"
                    className="text-secondary transition ease-in-out duration-200 hover:text-secondaryLight"
                  />
                )}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
