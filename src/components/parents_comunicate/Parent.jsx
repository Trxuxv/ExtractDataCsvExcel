// import './App.css';
import { useState } from "react";
import Child from "./Child";

function Parent() {
  const [data, setData] = useState([{}]);

  const cols = ["Name", "age", "color", "Parts"];

  const childToParent = (childdata) => {
    setData([childdata]);

    if (data.length > 0) {
      setData(...data, childdata);
    }
  };

  return (
    <div className="App bg-yellow-500 w-5/6 mx-auto h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center w-1/2 bg-yellow-700 h-full text-white">
        <table>
          <thead>
            <tr>
              {cols.map((x, i) => (
                <th className="border" key={i}>{x}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {cols.map((y) => (
                <td>{y}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col justify-center items-center w-1/2 bg-yellow-900 h-full text-white">
        <Child childToParent={childToParent} arr={cols} />
      </div>
    </div>
  );
}

export default Parent;
