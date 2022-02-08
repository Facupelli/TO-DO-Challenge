import React, { useEffect, useState } from "react";
import { Folders } from "./Folders";
import { Todos } from "./Todos";
import axios from "axios";

export const Home = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    axios.get("/folder").then((res) => setFolders(res.data));
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6 m-10 w-full bg-main">
      <div className="col-span-1 p-4">
        <Folders folders={folders} setFolders={setFolders} />
      </div>
      <div className="col-span-1">
        <Todos />
      </div>
    </div>
  );
};
