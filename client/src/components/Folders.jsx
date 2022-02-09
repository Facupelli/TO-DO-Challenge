import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faFolderOpen,
  faCaretUp,
  faCaretRight,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import axios from "axios";

export const Folders = ({
  folders,
  setFolders,
  handleShowTodos,
  folderId,
  setShowTodos,
}) => {
  const [showAddFolder, setShowAddFolder] = useState(true);
  const [showInput, setShowInput] = useState(false);

  const container = useRef(document.createElement("div"));

  const handleClickOptions = async (id) => {
    await axios.delete(`/folder/${id}`);
    axios.get("/folder").then((res) => setFolders(res.data));
    setShowTodos(false);
  };

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
    <div>
      <div>
        {showAddFolder && (
          <div
            onClick={handleShowInput}
            className="flex items-center gap-2 font-bold  mb-4 cursor-pointer hover:text-mainDark"
          >
            <p className="text-2xl">ADD FOLDER</p>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        )}
        {showInput && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2 mb-4">
              <input
                autoFocus
                type="text"
                placeholder="folder name..."
                required
                {...register("folder_name")}
                className="p-2 rounded"
              />
              <button
                type="submit"
                className=" font-semibold bg-mainDark hover:bg-secondary px-2 rounded text-white"
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
        {folders &&
          folders.length > 0 &&
          folders.map((el) => (
            <div
              key={el.id}
              className={`flex items-center gap-4 bg-secondary text-white font-semibold mt-2 p-4 rounded-md ${
                folderId === el.id ? "shadow-inner bg-mainLight" : ""
              }`}
            >
              <div
                className="flex gap-4 items-center cursor-pointer w-full"
                onClick={() => handleShowTodos(el.id)}
              >
                {folderId === el.id ? (
                  <FontAwesomeIcon icon={faFolderOpen} size="lg" className="text-secondary"/>
                ) : (
                  <FontAwesomeIcon icon={faFolder} size="lg" />
                )}

                <p className={`text-xl ${folderId === el.id ? 'text-secondary' : ''}`}>{el.name}</p>
              </div>
              <div
                ref={container}
                className="ml-auto relative cursor-pointer hover:text-red-500"
              >
                <FontAwesomeIcon
                  onClick={() => handleClickOptions(el.id)}
                  icon={faEllipsisH}
                  size="lg"
                  className={folderId === el.id ? 'text-secondary': ''}
                />
              </div>
              {folderId === el.id ? (
                <FontAwesomeIcon icon={faCaretRight} size="lg" className="text-secondary" />
              ) : (
                <FontAwesomeIcon icon={faCaretUp} size="lg" className="" />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
