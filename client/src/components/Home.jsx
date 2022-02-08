import React, { useEffect, useState } from "react";
import { Folders } from "./Folders";
import { Todos } from "./Todos";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

export const Home = () => {
  const [folders, setFolders] = useState([]);

  const [showAddFolder, setShowAddFolder] = useState(true);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    axios.get("/folder").then((res) => setFolders(res.data));
  }, []);

  //HANDLE ADD FOLDER ---------------------------

  const handleShowInput = () => {
    setShowInput(true);
    setShowAddFolder(false);
  };

  const handleCancelAddFolder = () => {
    setShowAddFolder(true);
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
      const response = await axios.post("/folder", data);
      reset();
      handleCancelAddFolder();
      axios.get("/folder").then((res) => setFolders(res.data));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6 m-10 w-full bg-main">
      <div className="col-span-1 p-4">
        {showAddFolder && (
          <div
            onClick={handleShowInput}
            className="flex items-center gap-2 font-semibold mb-4 cursor-pointer hover:text-mainDark"
          >
            <p>ADD FOLDER</p>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        )}
        {showInput && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="folder name..."
                required
                {...register("folder_name")}
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

        <Folders folders={folders} />
      </div>
      <div className="col-span-1">
        <Todos />
      </div>
    </div>
  );
};
