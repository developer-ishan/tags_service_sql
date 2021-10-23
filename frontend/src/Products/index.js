import React, { useContext, useEffect, useState } from "react";
import { TagContext } from "../Context/TagContext";

export default function Products() {
  const [tags, setTags] = useContext(TagContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:8080/api/filter/products/?tags=${JSON.stringify(
        tags.map((t) => t.id)
      )}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.status === 200) res.json().then((data) => setProducts(data));
        else alert(res.status);

        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [tags]);
  return (
    <div>
      {products.map((product, index) => (
        <div className="m-3 border border-dark" key={product.id}>
          <p>{product.name}</p>
          <p>{product.tagName}</p>
          {/* <div>
            {product.tags.map((t) => (
              <span class="badge badge-pill badge-info">{t.name}</span>
            ))}
          </div> */}
        </div>
      ))}
    </div>
  );
}
