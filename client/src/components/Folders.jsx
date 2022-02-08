import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faCaretUp,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

export const Folders = ({ folders }) => {

  const container = useRef(document.createElement("div"));

  const handleClickOptions = () => {
  };

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
            <div ref={container} className="ml-auto relative">
              <FontAwesomeIcon
                onClick={handleClickOptions}
                icon={faEllipsisH}
                size="lg"
              />
            </div>

            <FontAwesomeIcon icon={faCaretUp} size="lg" className="" />
          </div>
        ))}
    </div>
  );
};
