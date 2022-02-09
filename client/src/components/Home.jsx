import React, { useEffect, useState } from "react";
import { Folders } from "./Folders";
import { Todos } from "./Todos";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export const Home = ({ darkMode, setDarkMode }) => {
  const [folders, setFolders] = useState([]);
  const [folderId, setFolderId] = useState(null);

  const [showTodos, setShowTodos] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("/folder").then((res) => setFolders(res.data));
  }, []);

  const handleShowTodos = (id) => {
    setShowTodos(true);
    axios.get(`/todo?id=${id}`).then((res) => setTodos(res.data[0].todoFolder));
    setFolderId(id);
  };

  const handleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="w-full pt-10 mx-20 ">
      <div onClick={handleDarkMode} className="flex justify-end cursor-pointer ">
        {darkMode ? (
          <FontAwesomeIcon icon={faSun} size='xl' className="text-main hover:text-secondary"/>
        ) : (
          <FontAwesomeIcon icon={faMoon} size='xl' className="text-secondary hover:text-main"/>
        )}
      </div>
      <div className="mb-10 flex justify-center">
        <div>
          <p className={`font-bold text-5xl font-title ${darkMode? 'text-mainLight':''}`}>TODO APP</p>
          <p className="text-secondaryLight font-title">by Facupelli</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 w-full font-body">
        <div className="col-span-1 p-4 bg-main rounded">
          <Folders
            folders={folders}
            setFolders={setFolders}
            handleShowTodos={handleShowTodos}
            folderId={folderId}
            setShowTodos={setShowTodos}
          />
        </div>
        <div className="col-span-1 p-4 bg-secondaryLight rounded">
          {showTodos && (
            <Todos todos={todos} setTodos={setTodos} folderId={folderId} />
          )}
        </div>
      </div>
    </div>
  );
};
