import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faCaretUp } from "@fortawesome/free-solid-svg-icons";

export const Folders = ({ folders }) => {
  return (
    <div>
      {folders &&
        folders.length > 0 &&
        folders.map((el) => (
          <div
            key={el.id}
            className="flex items-center gap-4 bg-secondary2 text-white font-semibold mt-2 p-4 rounded-md cursor-pointer"
          >
            <FontAwesomeIcon icon={faFolder} size="lg" />
            <p>{el.name}</p>
            <FontAwesomeIcon icon={faCaretUp} size="lg" className="ml-auto" />
          </div>
        ))}
    </div>
  );
};
