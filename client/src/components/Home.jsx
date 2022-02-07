import React from "react";
import { Folders } from "./Folders";
import { Todos } from "./Todos";

export const Home = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="col-span-1">
        <Folders />
      </div>
      <div className="col-span-1">
        <Todos />
      </div>
    </div>
  );
};
