import React, { useContext, useEffect, useState } from "react";
import { TagContext } from "../Context/TagContext";

export default function AutoInput() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [gusses, setGusses] = useState([]);
  const [tags, setTags] = useContext(TagContext);
  const [focus, setfocus] = useState(false);
  useEffect(() => {
    fetch(
      `http://localhost:8080/api/tag/search/?s=${input}&f=${JSON.stringify(
        tags.map((t) => t.name)
      )}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.status === 200) res.json().then((data) => setGusses(data));
        else alert(res.status);

        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [tags]);
  return (
    <div>
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setLoading(true);
          fetch(
            `http://localhost:8080/api/tag/search/?s=${
              e.target.value
            }&f=${JSON.stringify(tags.map((t) => t.name))}`,
            {
              method: "get",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((res) => {
              if (res.status === 200)
                res.json().then((data) => setGusses(data));
              else alert(res.status);

              setLoading(false);
            })
            .catch((err) => console.log(err));
        }}
        onFocus={() => setfocus(true)}
        onBlur={() => setfocus(false)}
      />
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          gusses.map((tag, index) => (
            <div
              className="btn btn-primary"
              key={tag.id}
              onClick={(e) => {
                setTags([...tags, tag]);
                setGusses([
                  ...gusses.slice(0, index),
                  ...gusses.slice(index + 1),
                ]);
              }}
            >
              {tag.name}
            </div>
          ))
        )}

        <div>
          {tags.map((tag, index) => (
            <div
              className="btn btn-danger"
              onClick={(e) => {
                setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
              }}
            >
              {tag.name} X
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
