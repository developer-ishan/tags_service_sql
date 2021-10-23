import React, { createContext, useState } from "react";

export const TagContext = createContext();

export const TagProvider = (props) => {
  const [tags, setTags] = useState([]);
  return (
    <TagContext.Provider value={[tags, setTags]}>
      {props.children}
    </TagContext.Provider>
  );
};
