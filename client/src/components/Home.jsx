import React, { useEffect, useState } from "react";
import { Folders } from "./Folders";
import { Todos } from "./Todos";
import axios from "axios";

export const Home = () => {
  const [folders, setFolders] = useState([]);
  const [folderId, setFolderId] = useState(null);
  console.log(folderId)

  const [showTodos, setShowTodos] = useState(false);
  const [todos, setTodos] = useState([]);

  console.log(todos);

  useEffect(() => {
    axios.get("/folder").then((res) => setFolders(res.data));
  }, []);

  const handleShowTodos = (id) => {
    setShowTodos(!showTodos);
    axios.get(`/todo?id=${id}`).then((res) => setTodos(res.data[0].todoFolder));
    setFolderId(id);
  };

  return (
    <div className="grid grid-cols-2 gap-6 m-10 w-full ">
      <div className="col-span-1 p-4 bg-main rounded">
        <Folders
          folders={folders}
          setFolders={setFolders}
          setShowTodos={setShowTodos}
          showTodos={showTodos}
          setTodos={setTodos}
          handleShowTodos={handleShowTodos}
        />
      </div>
      <div className="col-span-1 p-4 bg-mainLight rounded">
        {showTodos && <Todos todos={todos} folderId={folderId} />}
      </div>
    </div>
  );
};
