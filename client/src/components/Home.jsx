import React, { useEffect, useState } from "react";
import { Folders } from "./Folders";
import { Todos } from "./Todos";
import axios from "axios";

export const Home = () => {
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

  return (
    <div className="w-full pt-10 mx-20 ">
      <div className="mb-10 flex justify-center">
        <div>
          <p className="font-bold text-5xl font-title ">TODO APP</p>
          <p className="text-gray-500 font-title">by Facupelli</p>
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
            <Todos
              todos={todos}
              setTodos={setTodos}
              folderId={folderId}
            />
          )}
        </div>
      </div>
    </div>
  );
};
