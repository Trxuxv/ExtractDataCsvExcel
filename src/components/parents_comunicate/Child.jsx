import React, { useState } from "react";
// import { Button } from 'semantic-ui-react';

export default function Child({ childToParent, arr }) {
  const [data, setData] = useState({});

  const handleChange = (event) => {
    var key = event.target.title;
    var value = event.target.value;

    var a = new Object();

    a = data;

    a[key] = value;

    if (data[key] !== key) {
      a[key] = value;
    }

    console.log(a)
    setData(a);
  };

  return (
    <div>
      {arr.map((x, i) => (
        <div className="w-full p-2 flex items-center justify-between">
          <label>{x}</label>
          <input
            id={i}
            title={x}
            key={i}
            type="text"
            className="text-black  px-4 py-2"
            onChange={handleChange}
            value={data[x]}
          />
        </div>
      ))}
      <button
        className=" px-4 py-2 bg-cyan-800"
        onClick={() => {
          childToParent(data);
        }}
      >
        Adicionar valor na tablea
      </button>
    </div>
  );
}
