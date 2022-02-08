import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";


export const Todos = ({ todos, folderId }) => {
  const [showAddTodo, setShowAddTodo] = useState(true);
  const [showInput, setShowInput] = useState(false);

   //HANDLE ADD FOLDER ---------------------------

   const handleShowInput = () => {
    setShowInput(true);
    setShowAddTodo(false);
  };

  const handleCancelAddFolder = () => {
    setShowAddTodo(true);
    setShowInput(false);
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
        }
      const response = await axios.post("/todo", todo);
      reset();
      handleCancelAddFolder();
    //   axios.get("/folder").then((res) => setFolders(res.data));
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
            className="flex items-center gap-2 font-semibold mb-4 cursor-pointer hover:text-mainDark"
          >
            <p>ADD TODO</p>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        )}
        {showInput && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="todo..."
                required
                {...register("todo_name")}
                className="p-2 rounded"
              />
              <button
                type="submit"
                className=" font-semibold bg-mainDark px-2 rounded text-white"
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
          todos.map((el) => (
            <div key={el.id} className="bg-main  rounded mt-2 p-2 flex items-center" >
              <p>{el.name}</p>
              <input type="checkbox" className="ml-auto"/>
            </div>
          ))}
      </div>
    </div>
  );
};
