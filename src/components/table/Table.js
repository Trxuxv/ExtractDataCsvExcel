import React from 'react';

const row = (r, i, headers, handleRemove, startEditing, editIdx, handleChange, stopEditing) => {

    const currentlyEditing = editIdx === i

    return (

        <tr key={`tr-${i}`}>
            <td>{i}</td>
            {headers.map((h, k) => (
                <td key={`td-${k}`}>
                    {currentlyEditing ?
                        <input
                            type="text"
                            className="form-control bg-yellow-50"
                            onChange={(e) => handleChange(e, h.prop, i)}
                            name={h.prop}
                            value={r[h.prop]}
                        /> : r[h.prop]}
                </td>
            ))}

            {currentlyEditing ?
                <td><i className="material-icons bg-green-500 rounded-full p-2 flex items-center text-white w-8 h-8"
                    onClick={() => stopEditing(i)}>V</i>
                </td> :

                <td><i className="material-icons bg-cyan-500 px-4 py-2 shadow-md text-gray-50 rounded"
                    onClick={() => startEditing(i)}>edit</i>
                </td>}

            <td><i className="material-icons bg-red-500 px-4 py-2 shadow-md text-gray-50 rounded"
                onClick={() => handleRemove(i)}>delete</i>
            </td>
        </tr>
    )
}



const Table = ({ data, headers, handleRemove, startEditing, editIdx, handleChange, stopEditing }) => (
    < div >
        <div className="card">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        {headers.map((h, i) =>
                            <th key={`th-${i}`} scope="col">{h.name}</th>
                        )}
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((r, i) =>
                        row(r, i, headers,
                            handleRemove,
                            startEditing,
                            editIdx,
                            handleChange,
                            stopEditing))}
                </tbody>
            </table>
        </div>
    </div >
)


export default Table


