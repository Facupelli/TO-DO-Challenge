import React, { useEffect, useState } from "react";
import { Folders } from "./Folders";
import { Todos } from "./Todos";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faTableList } from "@fortawesome/free-solid-svg-icons";

export const Home = ({ darkMode, setDarkMode }) => {
  const [folders, setFolders] = useState([]);
  const [folderId, setFolderId] = useState(null);

  const [showTodos, setShowTodos] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("/folder").then((res) => setFolders(res.data));
  }, []);

  const handleShowTodos = (id) => {
    if (folderId === id) {
      setShowTodos(!showTodos);
      setFolderId(null)
    } else {
      setShowTodos(true);
      axios
        .get(`/todo?id=${id}`)
        .then((res) => setTodos(res.data[0].todoFolder));
      setFolderId(id);
    }
  };

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="w-full pt-6 md:pt-10 mx-6 md:mx-12 lg:mx-20 ">
      <div className="flex justify-end  ">
        {darkMode ? (
          <FontAwesomeIcon
            icon={faSun}
            onClick={handleDarkMode}
            size="xl"
            className="text-main transition ease-in-out duration-200 hover:text-secondary cursor-pointer"
          />
        ) : (
          <FontAwesomeIcon
            icon={faMoon}
            onClick={handleDarkMode}
            size="xl"
            className="transition ease-in-out duration-150 text-secondary hover:text-main cursor-pointer"
          />
        )}
      </div>
      <div className="mb-10 flex justify-center">
        <div>
          <div className="flex items-baseline gap-4">
            <p
              className={`font-bold text-5xl font-title drop-shadow ${
                darkMode ? "text-mainLight" : ""
              }`}
            >
              TODO APP
            </p>
            <FontAwesomeIcon
              icon={faTableList}
              onClick={handleDarkMode}
              size="2x"
              className={`drop-shadow ${darkMode ? "text-mainLight" : ""}`}
            />
          </div>
          <p className="text-secondaryLight font-title">by Facupelli</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 w-full font-body">
        <div className="col-span-2 md:col-span-1 p-4 bg-main rounded">
          <Folders
            folders={folders}
            setFolders={setFolders}
            handleShowTodos={handleShowTodos}
            folderId={folderId}
            setShowTodos={setShowTodos}
          />
        </div>
        <div className="col-span-2 md:col-span-1 p-4 bg-secondaryLight rounded">
          {showTodos && (
            <Todos todos={todos} setTodos={setTodos} folderId={folderId} />
          )}
        </div>
      </div>
    </div>
  );
};
